import React, { Suspense, useMemo, useRef, useCallback, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Decal, Html, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const BallMesh = ({ posBase = [0, 0, 0], texture, scale = 1, decalScale = 1.0 }) => {
  const meshRef = useRef();
  const { invalidate, camera } = useThree();

  const rafRef = useRef(null);
  const lastPosRef = useRef([0, 0]);
  const velRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastTimeRef = useRef(null);

  const sensitivity = 0.018;
  const damping = 0.96;
  const minVel = 0.0001;

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  }, [camera]);

  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    lastTimeRef.current = performance.now();

    const loop = (now) => {
      const dt = Math.max(1, now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!draggingRef.current) {
        if (meshRef.current) {
          meshRef.current.rotation.y += velRef.current.x * dt * 60;
          meshRef.current.rotation.x = clamp(
            meshRef.current.rotation.x + velRef.current.y * dt * 60,
            -Math.PI / 2,
            Math.PI / 2
          );
        }

        velRef.current.x *= Math.pow(damping, dt * 60);
        velRef.current.y *= Math.pow(damping, dt * 60);

        if (Math.abs(velRef.current.x) < minVel && Math.abs(velRef.current.y) < minVel) {
          velRef.current.x = 0;
          velRef.current.y = 0;
          invalidate();
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
          return;
        }
      }

      invalidate();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [invalidate]);

  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    draggingRef.current = true;
    lastPosRef.current = [e.clientX, e.clientY];
    velRef.current.x = 0;
    velRef.current.y = 0;
    startLoop();
    try { e.target.setPointerCapture(e.pointerId); } catch { }
  }, [startLoop]);

  const onPointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    e.stopPropagation();

    const [lx, ly] = lastPosRef.current;
    const dx = e.clientX - lx;
    const dy = e.clientY - ly;

    if (meshRef.current) {
      meshRef.current.rotation.y += dx * sensitivity;
      meshRef.current.rotation.x = clamp(
        meshRef.current.rotation.x + dy * sensitivity,
        -Math.PI / 2,
        Math.PI / 2
      );
    }

    const now = performance.now();
    const dtMs = Math.max(8, now - (lastTimeRef.current || now));
    lastTimeRef.current = now;

    const vx = (dx / dtMs) * 16.6667 * sensitivity;
    const vy = (dy / dtMs) * 16.6667 * sensitivity;

    velRef.current.x = velRef.current.x * 0.4 + vx * 0.6;
    velRef.current.y = velRef.current.y * 0.4 + vy * 0.6;

    lastPosRef.current = [e.clientX, e.clientY];
    invalidate();
  }, [sensitivity, invalidate]);

  const onPointerUp = useCallback((e) => {
    e.stopPropagation();
    draggingRef.current = false;
    try { e.target.releasePointerCapture(e.pointerId); } catch { }
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <group position={posBase} scale={[scale, scale, scale]}>
      <group
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerOut={(e) => draggingRef.current && onPointerUp(e)}
      >
        <mesh ref={meshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#fff8eb"
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          {texture && (
            <Decal
              position={[0, 0, 1.01]}   
              rotation={[0, 0, 0]}
              map={texture}
              scale={[decalScale, decalScale, decalScale]}
            />
          )}
        </mesh>
      </group>
    </group>
  );
};

const BallsScene = ({ technologies, containerWidth, containerHeight, itemPx, gapPx, ballScale = 1.0 }) => {
  const { viewport, camera, invalidate } = useThree();
  const urls = useMemo(() => technologies.map((t) => t.icon), [technologies]);
  const textures = useTexture(urls);

  const cols = Math.max(1, Math.floor(containerWidth / (itemPx + gapPx)));
  const rows = Math.max(1, Math.ceil(technologies.length / cols));

  const worldPerPixelX = viewport.width / Math.max(1, containerWidth);
  const worldPerPixelY = viewport.height / Math.max(1, containerHeight);

  const spanPxX = (cols - 1) * (itemPx + gapPx) + itemPx;
  const spanPxY = (rows - 1) * (itemPx + gapPx) + itemPx;

  const spanWorldX = spanPxX * worldPerPixelX;
  const spanWorldY = spanPxY * worldPerPixelY;

  const offsetXpx = ((cols - 1) * (itemPx + gapPx)) / 2;
  const offsetYpx = ((rows - 1) * (itemPx + gapPx)) / 2;

  const positions = useMemo(() => {
    if (!containerWidth || !containerHeight) return [];
    return technologies.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const xPx = col * (itemPx + gapPx) - offsetXpx;
      const yPx = row * (itemPx + gapPx) - offsetYpx;
      return [xPx * worldPerPixelX, -yPx * worldPerPixelY, 0];
    });
  }, [technologies, cols, containerWidth, containerHeight, itemPx, gapPx, offsetXpx, offsetYpx, worldPerPixelX, worldPerPixelY]);


  const sphereRadiusWorld = (itemPx / 2) * worldPerPixelX * ballScale;


  const decalScaleLocal = 1.4;

  useEffect(() => {
    if (!camera) return;
    const fovRad = (camera.fov * Math.PI) / 180;
    const halfFov = fovRad / 2;
    const aspect = viewport.width / viewport.height;

    const requiredZForY = (spanWorldY / 2 + 0.1) / Math.tan(halfFov);

    const halfFovH = Math.atan(Math.tan(halfFov) * aspect);
    const requiredZForX = (spanWorldX / 2 + 0.1) / Math.tan(halfFovH);

    const requiredZ = Math.max(requiredZForX, requiredZForY, 6); 
    camera.position.z = requiredZ + 0.5; 
    camera.lookAt(0, 0, 0);
    invalidate();
  }, [spanWorldX, spanWorldY, viewport.width, viewport.height, camera, invalidate]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 1]} intensity={0.8} />
      <group>
        {technologies.map((tech, idx) => (
          <BallMesh
            key={tech.name}
            posBase={positions[idx] || [0, 0, 0]}
            texture={textures[idx]}
            scale={sphereRadiusWorld}
            decalScale={decalScaleLocal}
          />
        ))}
      </group>
    </>
  );
};

const BallsCanvas = ({ technologies, containerWidth, containerHeight, itemPx = 112, gapPx = 40, size = 1.0 }) => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      frameloop="demand"
      camera={{ position: [0, 0, 12], fov: 50 }}
    >
      <Suspense fallback={<Html center><CanvasLoader /></Html>}>
        <BallsScene
          technologies={technologies}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          itemPx={itemPx}
          gapPx={gapPx}
          ballScale={size}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallsCanvas;