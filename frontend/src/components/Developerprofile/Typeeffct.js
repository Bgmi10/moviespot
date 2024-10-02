import React from 'react'
import TypingEffect from 'react-typing-effect';

export const Typeeffct = () => {
  return (
    <div
    style={{
      fontSize: '16px',
      color: '#666',
      fontWeight: '700',
      textAlign: 'center',
    }}
  >
    <TypingEffect
      text={['JavaScript', 'React', 'Tailwind css' , 'Redux-toolkit', 'Firebase' , 'Strapi' , 'Socket.io' , 'Express js' , 'Mongo db' , 'Material ui' , 'Framer motion' , 'Node js', 'Next js', 'Mantine'  ]}
      speed={100}
      eraseSpeed={50}
      typingDelay={500}
      eraseDelay={2000}
      style={{ fontSize: '16px' }}
      
    />
  </div>
  )
}
