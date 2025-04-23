import React from 'react'
import { motion } from 'framer-motion'

const AboutUs = () => {
  return (
    <section className="w-full px-6 md:px-24 py-20 bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#ddd6fe]">

      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We are passionate about making travel simpler, more enjoyable, and personalized. Our AI-powered platform is designed to create
          seamless, customized travel experiences that adapt to your preferences and help you explore the world like never before.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col md:flex-row justify-center gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="max-w-xs text-center">
            <h3 className="text-xl font-semibold text-slate-700">Our Mission</h3>
            <p className="text-md text-slate-500 mt-2">
              To help you travel smarter by providing customized recommendations that suit your style, budget, and preferences.
            </p>
          </div>
          <div className="max-w-xs text-center">
            <h3 className="text-xl font-semibold text-slate-700">Our Vision</h3>
            <p className="text-md text-slate-500 mt-2">
              To be the go-to travel companion for adventurers seeking authentic, memorable experiences tailored to them.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h4 className="text-2xl font-semibold text-slate-700">Meet The Team</h4>
          <p className="text-md text-slate-500 mt-2">
            We're a passionate group of innovators, designers, and engineers dedicated to making your travel experience unforgettable.
          </p>

          <div className="flex justify-center flex-wrap gap-12 mt-8">
            <div className="text-center">
              <img src="/images/team-member-1.jpg" alt="Team Member 1" className="w-24 h-24 rounded-full mx-auto object-cover" />
              <h5 className="text-lg font-semibold text-slate-700 mt-2">Jane Doe</h5>
              <p className="text-sm text-slate-500">CEO & Founder</p>
            </div>
            <div className="text-center">
              <img src="/images/team-member-2.jpg" alt="Team Member 2" className="w-24 h-24 rounded-full mx-auto object-cover" />
              <h5 className="text-lg font-semibold text-slate-700 mt-2">John Smith</h5>
              <p className="text-sm text-slate-500">Chief Technology Officer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs
