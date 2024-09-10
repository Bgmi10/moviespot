import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ChatBox() {
  const [messageReady, setMessageReady] = useState(false);

  useEffect(() => {
    // Simulate delay for thinking indic  ator before message shows
    const timer = setTimeout(() => {
      setMessageReady(true);
    }, 3000); // Show message after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-10">
      <div className="relative w-[280px] h-[400px] rounded-lg shadow-xl overflow-hidden">
        {/* Chat Background */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
          }}
        />

        {/* Chat Bubble */}
        <div className="absolute inset-0 z-10 flex flex-col p-4 justify-start">
          {/* Profile Image */}
          <motion.img
            src="https://media.licdn.com/dms/image/v2/D5603AQGOYh0eJH9-0A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1706411204773?e=1731542400&v=beta&t=R--5mdmmG0Lx1mqS9Cnk4QefgsQhAAzYtHnOeOmX2Ss"
            className="h-10 w-10 rounded-full mb-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, duration: 0.5 }}
            alt="Profile"
          />

          {/* Thinking Indicator (Three Dots) */}
          {!messageReady && (
            <motion.div
              className="flex justify-center space-x-2 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" />
              <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-150" />
              <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-300" />
            </motion.div>
          )}

          {/* Message */}
          <AnimatePresence>
            {messageReady && (
              <motion.div
                className="bg-green-100 text-gray-800 rounded-xl p-3 shadow-lg w-full relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 80, duration: 0.5 }}
              >
                <span className="font-semibold text-gray-900">Subash</span>
                <p className="text-sm text-gray-600 mt-1">Hey, let's chat!</p>
                

              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
       
      </div>

      {/* WhatsApp Icon outside the chat box */}
      <div className="absolute bottom-[100px] right-[-40px]">
        <motion.img
          src="https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png"
          className="w-10 h-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, duration: 0.5 }}
        />
      </div>
    </div>
  );
}
