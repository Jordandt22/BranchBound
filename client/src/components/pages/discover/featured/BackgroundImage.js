"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const BackgroundImage = ({ imageUrl }) => {
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevImageUrlRef = useRef(imageUrl);

  useEffect(() => {
    if (imageUrl !== prevImageUrlRef.current) {
      prevImageUrlRef.current = imageUrl;
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImage(imageUrl);
          setIsTransitioning(false);
        }, 50);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [imageUrl]);

  return (
    <div className="fixed top-0 left-0 bottom-0 w-full md:w-[calc(100%-8px)] h-[65%]">
      <Image
        src={currentImage}
        alt="Background"
        fill
        className={`object-cover object-top bg-fixed transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        priority
        quality={75}
      />
      {/* Gradient overlay that fades to dark at the bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-base-bg/70 via-base-bg md:via-base-bg/95 to-base-bg" />
    </div>
  );
};

export default BackgroundImage;
