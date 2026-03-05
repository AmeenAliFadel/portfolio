import React, { Suspense, useEffect, useEffectEvent, useState } from 'react';
import { Canvas, events } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, useProgress } from '@react-three/drei';
import sceneUrl from '../../assets/desktop_pc/scene.glb?url'

const Computers = ({ isMobile }) => {
  // Load the model from public/desktop_pc/scene.gltf
  const computer = useGLTF(sceneUrl)
  // Return the model as a primitive inside a mesh group.
  return (
    <group>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={25} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

// LoaderWatcher runs inside the Canvas and listens to Drei's loading manager.
// When active becomes false (no more loading), it calls onLoaded(false) to notify parent.
const LoaderWatcher = ({ onLoaded }) => {
  const { active } = useProgress();

  useEffect(() => {
    if (!active) {
      // loading finished
      onLoaded(false);
    }
  }, [active, onLoaded]);

  return null;
};

const ComputersCanvas = ({ onLoaded = () => { } }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width:500px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }

  }, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      // fixed spelling: preserveDrawingBuffer
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* Suspense fallback is null to avoid rendering HTML nodes inside the Canvas */}
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} />
        <LoaderWatcher onLoaded={onLoaded} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;