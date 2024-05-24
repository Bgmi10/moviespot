import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {addmessage , removemessage} from '../utils/Chatslice'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { random } from '../utils/Helper'
import SendIcon from '@mui/icons-material/Send';


export const Livechat = () => {

  const [msg,setmsg] = useState('')

  const dispatch = useDispatch()
  
  const messag = {
    name:random(),
    msg:msg
    
  }
  const sendmsg = (e) =>{

    e.preventDefault()

    dispatch(addmessage(messag))
    setmsg('')
   
  }
 

  const selectmessage = useSelector(store=>store.chat.chatmessage)
  const message  = {
    name:random(),
    msg:"hi from indiaskdlasldasdlk"
}

    useEffect(()=>{
        const interval = setInterval(()=>{

            dispatch(addmessage(message ))
        },1500)
            

        dispatch(removemessage())
        

        return ()=> clearInterval(interval)
    })

  return (
    <div className='border border-gray-400 w-80 h-80 overflow-y-scroll  rounded-lg '>
      <div className='text-gray-500  flex-col-reverse flex  ' >
    
    {

        selectmessage.map((item,i)=>(
          <div key={i} className=' w-80 flex p-2' >
            <FontAwesomeIcon icon={faUserCircle} className='p-2' />
           <p className='text-gray-500 '>
              {item.name} 
            </p>
            <p className='text-gray-300  ml-5 '>{item.msg}</p>
           
          </div>
        ))}
       
      
    </div>
    
    <form className=' flex' onSubmit={sendmsg}>
        <input type='text' placeholder='type anything...' onChange={(e)=>setmsg(e.target.value)}  className=' rounded-md ml-4 border-gray-500 border text-gray-400 w-56 p-3 h-10 mb-4 bg-black  ' />
       <button className='ml-2 h-10 w-10'> 
         <SendIcon className='text-rose-600 '/>  
       </button>     
    </form>  

    </div>
    
  )
}
