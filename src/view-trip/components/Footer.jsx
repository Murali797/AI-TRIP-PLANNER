import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { MdPrivacyTip } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
  
      {/* Branding */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          <span className="text-teal-500">Murali's</span> Travel AI
        </h2>
        <p className="text-sm text-gray-400">
          Smart travel planning with AI-powered recommendations. ✈️
        </p>
      </div>
  
      {/* Navigation */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Explore</h3>
        <ul className="space-y-1 text-sm text-gray-400">
          <li><Link to="/" className="hover:text-teal-400 transition">Home</Link></li>
          <li><Link to="/create-trip" className="hover:text-teal-400 transition">Create Trip</Link></li>
          <li><Link to="/my-trips" className="hover:text-teal-400 transition">My Trips</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
        </ul>
      </div>
  
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Contact</h3>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>Email: <a href="mailto:muraligmuralig01@gmail.com" className="text-teal-400 hover:underline">muraligmuralig01@gmail.com</a></li>
        </ul>
      </div>
  
      {/* Social */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Connect</h3>
        <div className="flex space-x-4 text-xl mt-2">
          <a href="https://www.linkedin.com/in/murali-ganeshan" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Murali797" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition">
            <FaGithub />
          </a>
          <a href="mailto:muraligmuralig01@gmail.com" className="hover:text-teal-500 transition">
            <FaEnvelope />
          </a>
          <Link to="/privacy-policy" className="hover:text-teal-500 transition">
            <MdPrivacyTip />
          </Link>
        </div>
      </div>
  
    </div>
  
    <p className="text-center text-xs text-gray-500 mt-10">
      © {new Date().getFullYear()} Murali. All rights reserved.
    </p>
  </footer>
  
  );
};

export default Footer;
