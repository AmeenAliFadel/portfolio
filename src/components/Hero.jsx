// Professional comments in English only: Hero section that contains the header content and the 3D Canvas.
// It shows a DOM overlay loader while the GLTF assets are loading. The loader state is controlled by setLoading.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import ComputersCanvas from './canvas/Computers';
import CanvasLoader from './Loader';
import heroBg from '../assets/herobg.png'
const Hero = () => {
  const [loading, setLoading] = useState(true);

  return (
    <section
      className="relative w-full h-screen mx-auto bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={`${styles.paddingX} absolute inset-0 top-30 max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Ameen</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I engineer interactive web platforms
            <br className="sm:block hidden" />
            with a focus on performance, scalability, and user experience.
          </p>
        </div>
      </div>

      {/* Loader overlay: visible while loading === true */}
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50"
          // you can add pointer-events-auto if you want to block interaction while loading
          style={{ pointerEvents: 'none' }}
        >
          <CanvasLoader />
        </div>
      )}

      {/* Canvas wrapped in Suspense inside ComputersCanvas. onLoaded will be called when assets finish. */}
      <ComputersCanvas onLoaded={setLoading} />
      <div className=' absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center '>
        <a href="#about">
          <div className=' w-8.75 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2 '>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className=' w-3 h-3 rounded-full  bg-secondary mb-1'
            />

          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;