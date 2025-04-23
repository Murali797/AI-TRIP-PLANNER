import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const imageEntrance = {
  initial: { y: 100, scale: 0.9, opacity: 0 },
  animate: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 10,
      delay: 1.8,
    },
  },
  whileHover: {
    scale: 1.02,
    rotate: [0, 1.5, -1.5, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatType: 'reverse' },
  },
}

const Hero = () => {
  return (
    <section className="relative w-full px-6 md:px-24 py-20 flex flex-col items-center text-center gap-8 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <motion.h1
        variants={float}
        animate="animate"
        className="font-extrabold text-[40px] sm:text-[48px] md:text-[56px] text-center mt-10 leading-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500">
          Plan Smarter with AI:
        </span><br />
        Curated Adventures Designed Just for You
      </motion.h1>

      <motion.p
        variants={float}
        animate="animate"
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-slate-600 max-w-2xl"
      >
        Your AI-powered travel companion — designing personalized, effortless journeys that match your vibe, goals, and budget.
      </motion.p>

      <motion.div
        variants={float}
        animate="animate"
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-16 mt-16"
      >
        <div className="text-center max-w-xs">
          <h3 className="text-xl font-semibold text-slate-700">AI-Driven Itinerary</h3>
          <p className="text-md text-slate-500 mt-2">Get fully customized travel itineraries that align with your preferences, activities, and pace.</p>
        </div>
        <div className="text-center max-w-xs">
          <h3 className="text-xl font-semibold text-slate-700">Budget-Friendly Options</h3>
          <p className="text-md text-slate-500 mt-2">Tailor your trip according to your budget, ensuring an unforgettable experience at any price point.</p>
        </div>
        <div className="text-center max-w-xs">
          <h3 className="text-xl font-semibold text-slate-700">Local Insights</h3>
          <p className="text-md text-slate-500 mt-2">Discover hidden gems with local insights and recommendations for a more authentic travel experience.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12"
      >
        <Link to="/create-trip">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block"
          >
            <span className="absolute -top-2 -right-2 animate-ping rounded-full bg-pink-400 w-3 h-3 opacity-75"></span>
            <Button className="bg-gradient-to-r from-violet-600 to-pink-500 text-white text-md px-6 py-2 rounded-full shadow-md transition-all duration-300 cursor-pointer">
              Get Started — It’s Free
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Preview Image + Learn More CTA */}
      <motion.div
        variants={float}
        animate="animate"
        transition={{ delay: 1.5 }}
        className="mt-10 w-full flex flex-col items-center"
      >
       <h1 className="font-extrabold text-[40px] sm:text-[48px] md:text-[56px] text-center mt-10 leading-tight pb-3 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text">
  AI Trip Planner Dashboard Preview
</h1>

        <motion.img
          src="/demo.png"
          alt="AI Trip Planner Dashboard Preview"
          className="w-full max-w-4xl object-cover rounded-xl shadow-lg"
          variants={imageEntrance}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
        />
        <Link to="/about-us">
          <Button className="mt-10 bg-transparent border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white text-md px-6 py-2 rounded-full shadow-md transition-all duration-300 cursor-pointer">
            Learn More About Us
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}

export default Hero
