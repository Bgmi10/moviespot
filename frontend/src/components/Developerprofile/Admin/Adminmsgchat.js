import { useState, useEffect, useRef } from 'react';
import {  FaArrowLeft, FaUser } from 'react-icons/fa';
import { addDoc, collection, query, orderBy, onSnapshot, doc, collectionGroup } from 'firebase/firestore';
import { db } from "../../../utils/firebase";
import SendIcon from '@mui/icons-material/Send';


export function Adminmsgchat() {
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true); // Toggle user list on small devices
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const scrollRef  = useRef(null)
  const [isauth , setisauth] = useState(false)
  const [password  , setpassword ] = useState('')

  const passwordmodle = 'Pubg@001';

  
  const checkpassword = () => {

    if(passwordmodle !== password){
      alert('password is wrong')
    }
  
    if(password === passwordmodle){
      setisauth(true)
    }
  }

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
      sentBy: "admin"
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

  return (
    <>
       
     {
     !isauth ? 
          <div className='justify-center flex mt-72'>
           
                  <input type='text' className='ml-2 outline-none rounded-md m-1 p-2' placeholder='password' onChange={(e) =>setpassword(e.target.value) }/>
                  <button className='bg-blue-400 p-2 m-2 text-white rounded-md ' onClick={checkpassword}>Let`s go</button>
          </div>  : 
      <div className="fixed inset-0 z-10 ">
          <div className="relative w-full h-full flex rounded-lg shadow-xl overflow-hidden">

            {/* User List for Small and Medium Screens */}
            <div className={`w-full sm:w-[30%] md:w-[25%] h-full  p-2 border-r overflow-y-auto transition-all duration-300 ${showUserList ? 'block' : 'hidden sm:block'}`}>
              <p className="font-semibold text-gray-400 mb-4">Users</p>
              <ul className="space-y-2 max-h-full">
                {users.map((user, index) => (
                  <li key={index} className="cursor-pointer" onClick={() => handleUserSelect(user.id)}>
                    <div className={selectedUser === user.id ? 'bg-gray-700 flex items-center justify-between p-2  rounded-lg text-gray-500  '  : "flex items-center justify-between p-2  rounded-lg text-gray-500 "}>
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
                 < div className="overflow-y-auto p-4 space-y-2" ref={scrollRef}>
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
                           <span className="text-[10px] text-gray-500 flex justify-end ">{messageTime}</span>
                         </ol>
                       </div>
                     );
                   })}
                </div>


                  <div className="p-2 flex items-center space-x-2 fixed bottom-0 lg:w-[940px] sm: w-[415px] bg-slate-900">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 p-2 border rounded-lg outline-none text-xs md:text-sm"
                      placeholder="Type your message"
                    />
                    <SendIcon className="text-gray-400 cursor-pointer absolute right-3" onClick={sendMessage} />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-xs md:text-sm">
                  <p>Select a user to start chatting</p>
                </div>
              )}
            </div>

          </div>

        </div>
    }
      
    </>
  );
}
