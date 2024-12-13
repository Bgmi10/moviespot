import React from 'react'
import TypingEffect from 'react-typing-effect';

export const Typeeffct = () => {
  return (
    <div
    style={{
      fontSize: '16px',
      color: '#666',
      textAlign: 'center',
    }}
    className='font-medium'
  >
    <TypingEffect
      text={['JavaScript', 'React', 'Tailwind css' , 'Redux-toolkit', 'Firebase' , 'Strapi' , 'Socket.io' , 'Express js' , 'Mongo db' , 'Material ui' , 'Framer motion' , 'Node js', 'Next js','Aws-S3',
      'Aws-Ec2', 'Mantine', 'Web Socket', 'Aws-SES', 'Prisma', 'Postgres', 'Docker', 'Html', 'Css', 'CI & CD',   ]}
      speed={100}
      eraseSpeed={50}
      typingDelay={500}
      eraseDelay={2000}
      style={{ fontSize: '13px' }}
      
    />
  </div>
  )
}
