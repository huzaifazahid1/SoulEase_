"use client";
import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiChevronRight,
  FiMonitor,
  FiLayers,
  FiTag,
  FiBookOpen,
  FiHelpCircle,
} from "react-icons/fi";
import { BiRocket, BiCodeAlt } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-100 via-white to-primary-50 border-t border-primary-200 pt-16 relative overflow-hidden text-secondary-800">
      {/* Decorative Icons */}
      <div className="absolute top-10 left-10 text-primary-200 text-7xl opacity-20 rotate-12">
        <BiRocket />
      </div>
      <div className="absolute bottom-10 right-10 text-accent-200 text-8xl opacity-20 -rotate-12">
        <BiCodeAlt />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-10 z-10 relative">
        {/* Brand Column */}
        <div>
        <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold text-secondary-800">
              Dual<span className="text-primary-500">Pixel</span>
            </span>
          </div>
          <p className="text-sm text-secondary-600 mb-4 leading-relaxed">
            Where design meets development. We build scalable, modern, and
            beautiful digital experiences that make an impact.
          </p>
          <div className="flex gap-4 text-primary-500 text-xl mt-4">
            <a href="#" className="hover:text-primary-600 transition">
              <FiFacebook />
            </a>
            <a href="#" className="hover:text-primary-600 transition">
              <FiTwitter />
            </a>
            <a href="#" className="hover:text-primary-600 transition">
              <FiInstagram />
            </a>
            <a href="mailto:hello@dualpixel.com" className="hover:text-primary-600 transition">
              <FiMail />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-accent-600 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-secondary-700">
            <li className="flex items-center gap-2 hover:text-primary-600 transition-all duration-300">
              <FiMonitor className="text-primary-400" />
              <a href="#services">Services</a>
            </li>
            <li className="flex items-center gap-2 hover:text-primary-600 transition-all duration-300">
              <FiLayers className="text-primary-400" />
              <a href="#portfolio">Portfolio</a>
            </li>
            <li className="flex items-center gap-2 hover:text-primary-600 transition-all duration-300">
              <FiTag className="text-primary-400" />
              <a href="#pricing">Pricing</a>
            </li>
            <li className="flex items-center gap-2 hover:text-primary-600 transition-all duration-300">
              <FiBookOpen className="text-primary-400" />
              <a href="#blog">Blog</a>
            </li>
            <li className="flex items-center gap-2 hover:text-primary-600 transition-all duration-300">
              <FiHelpCircle className="text-primary-400" />
              <a href="#faq">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold text-accent-600 mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-secondary-700">
            <li className="flex items-center gap-2">
              <FiMapPin className="text-primary-500" />
              Lahore, Pakistan
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-primary-500" />
              +92 300 0000000
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-primary-500" />
              hello@dualpixel.com
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xl font-semibold text-accent-600 mb-4">
            Newsletter
          </h4>
          <p className="text-sm text-secondary-600 mb-3">
            Stay updated with our latest news, tips, and launches.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium py-2 rounded-lg hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-16 border-t border-primary-200 text-center py-4 text-sm text-secondary-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-primary-600 font-medium">Dual Pixel</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
