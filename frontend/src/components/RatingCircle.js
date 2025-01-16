import React from 'react';
import { motion } from 'framer-motion';

const getColorForRating = (rating)  => {
  if (rating >= 9) return '#2196F3'; // Blue
  if (rating >= 7) return '#03A9F4'; // Light Blue
  if (rating >= 5) return '#FFC107'; // Amber
  if (rating >= 3) return '#FF9800'; // Orange
  return '#FF5722'; // Red-Orange
};

const RatingCircle= ({ rating, maxRating = 10 }) => {
  const normalizedRating = (rating / maxRating) * 100;
  const circumference = 2 * Math.PI * 18;
  const color = getColorForRating(rating);

  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full backdrop-blur-md rounded-full" viewBox="0 0 40 40">
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
        />
        {/* Animated rating circle */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (normalizedRating / 100) * circumference }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white lg:text-sm xs: text-[10px] font-bold drop-shadow-md">{rating.toFixed(1)}</span>
        <span className="text-white lg:text-[10px] xs: text-[8px] drop-shadow-md">/ 10</span>
      </div>
    </div>
  );
};

export default RatingCircle;

