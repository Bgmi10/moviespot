import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMinus } from 'react-icons/fa';
import { addDoc, query, orderBy, onSnapshot, collection, where } from 'firebase/firestore';
import { db } from "../../utils/firebase";
import SendIcon from '@mui/icons-material/Send';

export default function ChatBox() {

  const [messageReady, setMessageReady] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [userNumber, setUserNumber] = useState(localStorage.getItem('usernumber')|| ''); 
  const [messages, setMessages] = useState(null);  
  const [localusernumber , setLocalusernumber] = useState(localStorage.getItem('usernumber') || null)
  console.log(messages)
 

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

    useEffect(() => {
      if (!localusernumber) return;

     
      const q = query(
        collection(db, "messages"),
        where("phoneNumber", "==", localusernumber), 
        orderBy("createdAt")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      });

      return () => unsubscribe();
    }, [localusernumber]);


  const handleStartChat = () => {
    if (!userNumber.trim() === "") {
      alert('Please enter your mobile number');
      return;
    }

    const isValidNumber = /^\d{10}$/.test(userNumber);
    if (!isValidNumber) {
      alert('Please provide a valid 10-digit mobile number');
      return;
    }

    localStorage.setItem('usernumber', userNumber); // Store valid number locally
    setLocalusernumber(localStorage.getItem('usernumber'))
   
   
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || userNumber === "") return; // Ensure a valid message and usernumber

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      phoneNumber: localusernumber, // Associate message with the mobile number
    });
    setNewMessage("");
  };
  return (
    <>
      {showChat ? (
        <div
          className="fixed bottom-5 right-5 z-10"
          style={{
            zIndex: 10,
            filter: `drop-shadow(0 0 7px rgba(245, 255, 255, 0.9))`,
          }}
        >
          <div className="relative w-[300px] h-[400px] rounded-lg shadow-xl overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
              }}
            />

            <div className="absolute inset-0 z-10 flex flex-col">
              <AnimatePresence>
                <motion.div
                  key="chatbox"
                  className="bg-gray-200 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 shadow-lg flex items-center gap-2 mb-2"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 80,
                    duration: 0.5,
                    delay: 0.5,
                  }}
                >
                  <div className="relative">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQGOYh0eJH9-0A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1706411204773?e=1731542400&v=beta&t=R--5mdmmG0Lx1mqS9Cnk4QefgsQhAAzYtHnOeOmX2Ss"
                      className="h-8 w-8 rounded-full"
                      alt="Profile"
                    />
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white"
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Subash</span>
                    <p className="text-sm text-gray-600">online</p>
                  </div>
                </motion.div>

              {!localusernumber &&  <motion.div
                  className="bg-[#DCF8C6] text-gray-800 rounded-tl-none rounded-tr-xl rounded-bl-xl p-2 m-4 shadow-lg w-fit"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  key="aa"
                  transition={{
                    type: 'spring',
                    stiffness: 80,
                    duration: 0.5,
                    delay: 1,
                  }}
                >
                  {!messageReady ? (
                    <motion.div
                      className="flex justify-center space-x-2 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.span
                        className="h-2 w-2 bg-gray-500 rounded-full"
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
                      />
                      <motion.span
                        className="h-2 w-2 bg-gray-500 rounded-full"
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
                      />
                      <motion.span
                        className="h-2 w-2 bg-gray-500 rounded-full"
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
                      />
                    </motion.div>
                  ) : (
                    <motion.p
                      className="text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                      Hey, welcome to my website! Click the button below to chat.
                    </motion.p>
                  )}
                </motion.div>}

                {!localusernumber &&<motion.div
                  className="flex justify-center mt-4 flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <input
                    type="number"
                    className="p-2 m-5 rounded-md border outline-none"
                    value={userNumber}
                    onChange={(e) => setUserNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    onKeyDown={(e) => {
                      if (['e', 'E', '+', '-'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />

                  <button
                    className="bg-[#25D366] text-white py-2 px-6 w-32 ml-[80px] rounded-full shadow-md"
                    onClick={handleStartChat}
                  >
                    Start Chat
                  </button>
                </motion.div>}
               {localusernumber && <div className=' p-2 flex' >
                  <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className='border mt-[270px] outline-none   p-2 rounded-lg  w-full ' placeholder='send message to subash'/>
                   <SendIcon className='text-gray-400 mt-[278px] ml-[258px]  cursor-pointer absolute' onClick={sendMessage}/>
                </div>}
              </AnimatePresence>
            </div>
            
          </div>

          <div className="absolute bottom-[355px] right-[12px] z-20">
            <FaMinus onClick={() => setShowChat(false)} className="cursor-pointer" />
          </div>
        </div>
      ) : (
        <motion.img
          src="https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png"
          className="w-10 h-10 fixed right-0 z-10 mr-5 mb-5 cursor-pointer"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          onClick={() => setShowChat(true)}
        />
      )}
    </>
  );
}
