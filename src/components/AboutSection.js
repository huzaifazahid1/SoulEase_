"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiHeart, FiCode, FiPenTool, FiCheckCircle } from "react-icons/fi";

const themeToImage = {
  "theme-green": "1.png",
  "theme-red": "2.png",
  "theme-blue": "3.png",
  "theme-yellow": "4.png",
  "theme-dark": "3.png", // fallback
};
const AboutSection = () => {
  const [imageUrl, setImageUrl] = useState("/1.png"); // Default

  useEffect(() => {
    const html = document.documentElement;

    const updateImageUrl = () => {
      const themeClass = Array.from(html.classList).find((cls) =>
        cls.startsWith("theme-")
      );
      const fileName = themeToImage[themeClass] || "1.png";
      setImageUrl(`/${fileName}`);
    };

    // Run initially
    updateImageUrl();

    // Observe changes to theme class on <html>
    const observer = new MutationObserver(updateImageUrl);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
  <h2 className="text-5xl md:text-6xl font-bold text-secondary-800 leading-tight">
    About{" "}
    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
      Dual
    </span>
    <span className="bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent ml-2">
      Pixel
    </span>
  </h2>

  <p className="text-secondary-700 text-lg leading-relaxed">
    At <strong>DualPixel</strong>, we’re more than just a developer and a designer — 
    we’re a creative duo on a mission to turn ideas into immersive digital experiences.
    Our journey began with shared curiosity and a belief that great design and powerful code
    should work in perfect harmony.
  </p>

  <p className="text-secondary-700 text-lg leading-relaxed">
    Every pixel we design and every line of code we write is driven by purpose, creativity, 
    and a commitment to excellence. Whether it’s a startup portfolio or a full-fledged brand platform,
    we build with care, clarity, and soul.
  </p>

  {/* Key Points */}
  <ul className="space-y-4">
    {[
      "Beautiful UI/UX crafted with empathy and intention",
      "Scalable web apps built with the MERN stack",
      "Collaborative, detail-driven, and deadline-focused",
      "Bringing brands to life with modern tools and creative energy",
    ].map((point, index) => (
      <li key={index} className="flex items-start gap-3 text-secondary-700">
        <FiCheckCircle className="text-primary-500 text-xl mt-1" />
        <span>{point}</span>
      </li>
    ))}
  </ul>
</div>


        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt="About illustration"
            width={600}
            height={400}
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* Signature Line */}
      <div className="text-center mt-16">
        <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-primary-200/50">
          <p className="text-xl md:text-2xl font-semibold text-secondary-800 flex flex-wrap justify-center items-center gap-3">
            <span>One designs.</span>
            <FiHeart className="text-primary-500" />
            <span>One codes.</span>
            <FiCode className="text-accent-500" />
            <span>Together, we create magic.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
