import React from 'react'
import Tilt from "react-parallax-tilt";
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className=" xs:w-62.5 w-full  ">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className=' w-full green-pink-gradient p-px rounded-[20px] shadow-card   '
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className=' bg-tertiary rounded-[20px] py-5 px-12 min-h-70 flex justify-evenly items-center flex-col    '>
          <img src={icon} alt={title} className=' w-16 h-16 object-contain ' />
          <h3 className=' text-white text-[20px] font-bold text-center '>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}
const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText} >Inteoduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>

      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className=' mt-4 text-secondary text-base leading-7.5 '>
        Passionate Frontend Developer with a background in Information Engineering,
        specializing in building scalable and high-performance web applications from the ground up.
        I work primarily with React, Next.js, and TypeScript, focusing on clean architecture,
        maintainable code, and seamless user experiences.

        I enjoy transforming complex ideas into intuitive and interactive digital products.
        Whether working independently or within a team, I prioritize performance,
        scalability, and thoughtful design decisions that create real impact.

        Continuously learning and refining my craft, I strive to deliver modern,
        efficient, and user-centered solutions.
      </motion.p>
      <div className=' mt-20 flex justify-center flex-wrap gap-10 '>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}

      </div>
    </>
  )
}

export default SectionWrapper(About,'about')