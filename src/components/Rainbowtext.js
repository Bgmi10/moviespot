import React, { useEffect, useState } from 'react';

const RainbowText = ({ userName }) => {
  const [borderColor, setBorderColor] = useState('');

  const generateRainbowBorder = () => {
    const rainbowColors = [
      '#FF0000',
      '#FF7F00',
      '#FFFF00',
      '#00FF00',
      '#0000FF',
      '#4B0082',
      '#8B00FF',
    ];

    const gradient = `linear-gradient(45deg, ${rainbowColors.join(', ')})`;
    setBorderColor(gradient);
  };

  useEffect(() => {
    generateRainbowBorder();
  }, [userName]); // Add userName as a dependency

  return (
    <div className="relative">
      <div
        className="text-white"
        style={{ borderBottom: `2px solid ${borderColor}` }}
      >
        Hey, {userName}
      </div>
    </div>
  );
};

export default RainbowText;
