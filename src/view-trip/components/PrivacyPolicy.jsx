import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-6 md:px-24 py-20 bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#ddd6fe]">
      <motion.h2
        className="text-3xl font-semibold text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Privacy Policy
      </motion.h2>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
        <p className="text-lg">
          Welcome to Murali's AI Travel Planner App. Your privacy is important to us, and we are committed to
          protecting the personal information you share with us. This privacy policy outlines how we collect,
          use, and protect your data when you use our services.
        </p>
      </motion.section>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Information We Collect</h3>
        <p className="text-lg">
          We may collect the following types of information:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li>Personal Information (such as your name, email address, and travel preferences)</li>
          <li>Usage Data (such as the pages you visit, device information, and location data)</li>
          <li>Payment Information (if you make any bookings or purchases through the app)</li>
        </ul>
      </motion.section>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-4">How We Use Your Information</h3>
        <p className="text-lg">
          The information we collect is used to improve our services and provide you with a better user
          experience. This includes:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li>Personalizing your travel experience and recommendations</li>
          <li>Sending you updates about your trips and other relevant information</li>
          <li>Improving the functionality and features of the app</li>
        </ul>
      </motion.section>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h3>
        <p className="text-lg">
          We use cookies and similar tracking technologies to enhance your experience while using our app. These
          technologies help us analyze app usage, remember preferences, and personalize content for you.
        </p>
        <p className="text-lg">
          You can manage your cookie preferences in your browser settings. However, disabling cookies may limit
          certain features of the app.
        </p>
      </motion.section>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Data Security</h3>
        <p className="text-lg">
          We implement security measures to protect your personal information from unauthorized access, alteration,
          or disclosure. While we strive to use commercially acceptable means to protect your information, no
          method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </motion.section>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Your Rights</h3>
        <p className="text-lg">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li>Access, update, or delete your personal information</li>
          <li>Request a copy of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>
        <p className="text-lg">
          If you would like to exercise any of these rights, please contact us using the information provided below.
        </p>
      </motion.section>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
        <p className="text-lg">
          If you have any questions or concerns regarding this privacy policy or how we handle your personal data,
          please contact us at:
        </p>
        <p className="text-lg font-semibold">
          Email: muraligmuralig01@gmail.com
        </p>
      </motion.section>

      <motion.section
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Murali's AI Travel Planner App. All rights reserved.
        </p>
      </motion.section>
    </div>
  );
};

export default PrivacyPolicy;
