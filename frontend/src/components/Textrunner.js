import React, { useEffect, useRef } from 'react';

const TextRunner = ({ text, duration }) => {
  const textRef = useRef(null); 

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const animationDuration = `${duration}s`;
      textElement.style.animationDuration = animationDuration;
    }
  }, [duration]);

  return (
    <div className="overflow-hidden whitespace-nowrap w-full box-border bg-gradient-to-l from-gray-600" >
      <div
        ref={textRef}
        className="inline-block  animate-scroll-text text-sky-300 font-sans"
      >
       📢❗🚨 {text}
      </div>
    </div>
  );
};

export default TextRunner;
