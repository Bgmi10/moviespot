import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { addDoc, collection, query, orderBy, onSnapshot, doc, collectionGroup, updateDoc, setDoc, getDocs } from 'firebase/firestore';
import { db } from "../../../utils/firebase";
import SendIcon from '@mui/icons-material/Send';

 function Adminmsgchat() {
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true); 
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const [isauth, setisauth] = useState(false);
  const [password, setpassword] = useState('');
  const mounted = useRef(true); 
  const passwordmodle = 'Pubg@001';

  useEffect(() => {
    const storeInitialStatus = async () => {
      const adminId = 'admin-id'; 
      const userDocRef = doc(db, 'users', adminId);

      await setDoc(userDocRef, {
        onlineStatus: true,
        lastActive: new Date(),
      }, { merge: true });
    };

    storeInitialStatus();

    return () => {
      if (mounted.current) {
        const setOfflineStatus = async () => {
          const adminId = 'admin-id'; 
          const userStatusRef = doc(db, 'users', adminId);
          await updateDoc(userStatusRef, {
            onlineStatus: false,
            lastActive: new Date(),
          });
        };

        setOfflineStatus();
      }
    };
  }, []);

  useEffect(() => {
    
    return () => {
      mounted.current = false;
    };
  }, []);

  const checkPassword = () => {
    if (passwordmodle !== password) {
      alert('Password is wrong');
    } else if (password === passwordmodle) {
      setisauth(true);
    }
  };

  // Fetch all messages and organize by user
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const q = query(collectionGroup(db, 'messages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userMessages = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const docPath = doc.ref.path;
        const userId = docPath.split('/')[1];

        if (!userMessages[userId]) {
          userMessages[userId] = [];
        }
        userMessages[userId].push(data);
      });

      // Update users list, sorting by latest message's timestamp
      setUsers(Object.keys(userMessages).map(userId => ({
        id: userId,
        messages: userMessages[userId],
        latestMessage: userMessages[userId][0]?.createdAt || null
      })).sort((a, b) => b.latestMessage - a.latestMessage));
    });

    return () => unsubscribe();
  }, []);

  // Fetch messages for the selected user
  useEffect(() => {
    if (!selectedUser) return;

    const userDocRef = doc(db, "messages", selectedUser);
    const q = query(collection(userDocRef, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // Send message function
  const sendMessage = async () => {
    if (newMessage.trim() === "" || !selectedUser) return;

    const messagesRef = collection(db, "messages", selectedUser, "messages");
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: new Date(),
      sentBy: "admin",
      isread : false
    });
    setNewMessage(""); // Clear input after sending
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    setShowUserList(false); // Hide user list when a user is selected on small devices
  };

  const handleBackToUserList = () => {
    setShowUserList(true); // Show user list again
  };
  useEffect(() => {
    const updateMessageRead = async () => {
      if (!selectedUser) return; // Ensure selectedUser is valid
  
      // Get the collection path for messages based on selectedUser
      const messageCollectionRef = collection(db, "messages", selectedUser, "messages");
  
      try {
        const q = query(messageCollectionRef, orderBy('createdAt'));
        const snapshot = await getDocs(q);
  
        snapshot.forEach(async (doc) => {
          const messageDocRef = doc.ref;
  
          // Update the isread field to true for each document
          await updateDoc(messageDocRef, {
            isread: true,
          });
        });
  
        console.log("Messages marked as read");
      } catch (error) {
        console.error("Error updating documents: ", error);
      }
    };
  
    updateMessageRead(); // Call the function when selectedUser changes
  }, [selectedUser]);
  
  
  
  return (
    <>
      {
        !isauth ? (
          <div className='justify-center flex'>
            <div className='h-screen flex justify-center items-center'>
            <input
              type='text'
              className='ml-2 outline-none rounded-md m-1 p-2'
              placeholder='password'
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              className='bg-rose-600 p-2 m-2 text-black rounded-md'
              onClick={checkPassword}
            >
              Let`s go
            </button>
          </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-10">
            <div className="relative w-full h-full flex rounded-lg shadow-xl overflow-hidden">

              {/* User List for Small and Medium Screens */}
              <div className={`w-full sm:w-[30%] md:w-[25%] h-full p-2 border-r overflow-y-auto transition-all duration-300 ${showUserList ? 'block' : 'hidden sm:block'}`}>
                <p className="font-semibold text-gray-400 mb-4">Users</p>
                <ul className="space-y-2 max-h-full">
                  {users.map((user, index) => (
                    <li key={index} className="cursor-pointer" onClick={() => handleUserSelect(user.id)}>
                      <div className={selectedUser === user.id ? 'bg-gray-700 flex items-center justify-between p-2 rounded-lg text-gray-500' : "flex items-center justify-between p-2 rounded-lg text-gray-500"}>
                        <span>{user.id}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(user.latestMessage?.seconds * 1000).toLocaleTimeString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chat Window */}
              <div className={`relative flex-1 flex flex-col bg-slate-900 mb-12 ${showUserList ? 'hidden sm:flex' : 'flex'}`}>
                {selectedUser ? (
                  <>
                    <div className="flex items-center justify-between p-4 bg-green-300 border-b">
                      <button
                        onClick={handleBackToUserList}
                        className="sm:hidden text-gray-600 hover:text-gray-900"
                      >
                        <FaArrowLeft />
                      </button>
                      <h2 className="font-semibold text-gray-800 flex"><FaUser className='m-1' /> {selectedUser}</h2>
                    </div>
                    <div className="overflow-y-auto p-4 space-y-2" ref={scrollRef}>
                      {messages.map((msg, index) => {
                        const messageTime = new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        return (
                          <div
                            key={index}
                            className={`w-full flex ${msg.sentBy === "admin" ? 'justify-end' : 'justify-start'}`}
                          >
                            <ol
                              className={`p-2 text-xs md:text-sm max-w-xs ${msg.sentBy === "admin" ? 'bg-[#DCF8C6] text-gray-800 rounded-tl-none rounded-tr-xl rounded-bl-xl' : 'bg-gray-200 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl'}`}
                            >
                              <li>{msg.text}</li>
                              <span className="text-[10px] text-gray-500 flex justify-end">{messageTime}</span>
                            </ol>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-2 flex items-center space-x-2 fixed bottom-0 lg:w-[940px] sm:w-[415px] bg-slate-900">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                      />
                      <button
                        onClick={sendMessage}
                        className="p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
                      >
                        <SendIcon />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Select a user to start chatting</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}


export default Adminmsgchat