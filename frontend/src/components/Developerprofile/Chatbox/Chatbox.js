import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaClosedCaptioning, FaMinus } from 'react-icons/fa';
import { addDoc, collection, query, orderBy, onSnapshot, doc, refEqual, updateDoc  } from 'firebase/firestore';
import { db } from "../../../utils/firebase";
import whatsapp from '../imgs/whatsapppng.png'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SendIcon from '@mui/icons-material/Send';

export default function ChatBox() {
  const [messageReady, setMessageReady] = useState(false);
  const [showChat, setShowChat] = useState(true);  
  const [newMessage, setNewMessage] = useState('');
  const [userNumber, setUserNumber] = useState(localStorage.getItem('usernumber') || ''); 
  const [messages, setMessages] = useState([]);
  const [localUserNumber, setLocalUserNumber] = useState(localStorage.getItem('usernumber') || null);
  const scrollRef = useRef(null);
  const [  isuseronline , setIsUserOnline] = useState(null)
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    const adminId = 'admin-id'; // Replace with actual admin ID or auth ID
    const userDocRef = doc(db, "users", adminId);

    // Function to set the user's offline status
    
    const setOfflineStatus = async () => {
      await updateDoc(userDocRef, {
        onlineStatus: false,
        lastActive: new Date(),
      });
    };
    
 

    
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setIsUserOnline(data.onlineStatus);
        if (data.lastActive) {
          const seconds = data.lastActive.seconds;
          const nanoseconds = data.lastActive.nanoseconds;

          const date = new Date(seconds * 1000 + nanoseconds / 1000000);
          
        }
      }
      }
    );

   
    if (!isuseronline) {
      setOfflineStatus();
    }

    return () => {
      unsubscribe();
      
    };
  }, [isuseronline]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);


  useEffect(() => {
    if (!localUserNumber) return;

    const userDocRef = doc(db, "messages", localUserNumber);
    const q = query(collection(userDocRef, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, [localUserNumber]);

  const handleStartChat = () => {
    if (!userNumber.trim()) {
      alert('Please enter your mobile number');
      return;
    }

    const isValidNumber = /^\d{10}$/.test(userNumber);
    if (!isValidNumber) {
      alert('Please provide a valid 10-digit mobile number');
      return;
    }

    localStorage.setItem('usernumber', userNumber);
    setLocalUserNumber(userNumber);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !localUserNumber) return;

    const messagesRef = collection(db, "messages", localUserNumber, "messages");
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: new Date(),
      sentBy: "user",
      isread : false
    });
    setNewMessage("");
  };

  return (
    <>
      {showChat ? (
        <div
          className="fixed bottom-5 right-5 z-10"
          style={{ zIndex: 10, filter: `drop-shadow(0 0 7px rgba(245, 255, 255, 0.9))` }}
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
                  transition={{ type: 'spring', stiffness: 80, duration: 0.5, delay: 0.5 }}
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
                      className={isuseronline ? "absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white" : "absolute bottom-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white"}
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Subash</span>
                    <p className="text-sm text-gray-600">{isuseronline ? 'online' : 'offline'} </p>
                   
                  </div>
                </motion.div>

                {!localUserNumber && (
                  <motion.div
                    className="bg-[#DCF8C6] text-gray-800 rounded-tl-none rounded-tr-xl rounded-bl-xl p-2 m-4 shadow-lg w-fit"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    key="welcome"
                    transition={{ type: 'spring', stiffness: 80, duration: 0.5, delay: 1 }}
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
                        Hi there! 👋 Welcome to my website. Drop your mobile number below, and let's chat!
                      </motion.p>
                    )}
                  </motion.div>
                )}
                 
                {!localUserNumber && (
                  <motion.div
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
                  </motion.div>
                )}
                
                {localUserNumber && (
                  <>
                 <div ref={scrollRef} className="overflow-y-scroll relative cursor-pointer mb-16">
  {messages.map((i) => {
    const messageTime = new Date(i.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <div key={i.createdAt.seconds}  className={i.sentBy === 'user' ? 'flex justify-end ' : 'flex justify-start relative'}>
        <ol className=''>
          <li
            className={
              i.sentBy === 'user'
                ? 'bg-[#DCF8C6] m-2 p-1 font-normal outline-none rounded-md flex text-sm '
                : 'bg-white m-2 p-1 font-normal outline-none rounded-md flex text-sm '
            }
          >
            {i.text}
            {/* Display the message time below the message */}
            <span className=" text-[8px] text-gray-500 mt-3">{messageTime}</span>
           {i.sentBy === 'user' && <span className='flex justify-end mt-4'>{!i?.isread ? <DoneIcon className='text-gray-400 text-xs ml-1' style={{fontSize : "14px"}} />  : <DoneAllIcon  className='text-blue-400 ml-1' style={{fontSize : "14px"}}/>  }</span>}
            
          
          </li>
          <div className='flex justify-end ml-10'>
           
            
            </div>
        </ol>
      </div>
    );
  })}
</div>

                  <div className='p-2 flex fixed'>
                    <input
                      type='text'
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className='border mt-[340px] outline-none p-2 rounded-lg w-[275px] '
                      placeholder='Send message to Subash'
                    />
                    <SendIcon
                      className='text-gray-400 mt-[350px] ml-[250px] cursor-pointer absolute'
                      onClick={sendMessage}
                    />
                  </div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
         <AnimatePresence>
          <motion.div className="absolute bottom-[355px] right-[12px] z-20"  
                       initial={{ y: -50, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       exit={{ y: -50, opacity: 0 }}
                       transition={{ type: 'spring', stiffness: 80, duration: 0.5, delay: 0.8 }}>
            <CloseIcon onClick={() => setShowChat(false)} className="cursor-pointer text-gray-500" />
            
          </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.img
          src={whatsapp}
          alt="Chat Icon"
          className="fixed bottom-5 right-5  w-10 h-10 cursor-pointer"
          onClick={() => setShowChat(true)}
          style={{ zIndex: 20, filter: `drop-shadow(0 0 7px rgba(245, 255, 255, 0.9))` }}
        ></motion.img>
      
      )}
    </>
  );
}
