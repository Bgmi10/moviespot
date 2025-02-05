import React from 'react'

 const Terms = ({title  , welcome , policy1 , policy1info , policy2 , policy2info , policy3 , policy3info , policy4 , policy4info , policy5 , policy5info , policy6 , policy6info , endcontext , policy7 , policy7info , policy8, policy8info ,}) => {
  return (
    <div className='px-10 py-5'>
        <h1 className='font-medium flex justify-center py-5  text-gray-500 text-2xl '>{title}</h1>
       <div className='py-5'>
        <h1 className='text-gray-300 font-bold '>Introduction</h1>
        <p className='font-light text-gray-400'>
       {welcome || "welcome to moveispot terms and condition"} 
        </p>
       </div>
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '> {policy1 || "1. Server"}</h1>
        <p className='font-light text-gray-400'>
       {policy1info || "moviespot does not host any of the movies or series on its server. All the content is provided by non-affiliated third parties."}
        </p>
       </div>
       <div className='py-5' >
       <h1 className='text-gray-300 font-bold '>{policy2}</h1>
        <p className='font-light text-gray-400'>
        {policy2info}
        </p>
       </div>
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '>{policy3}</h1>
        <p className='font-light text-gray-400'>{policy3info}
        </p>
       </div>
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '>{policy4}</h1>
        <p className='font-light text-gray-400'>{policy4info}
        </p>
       </div>
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '>{policy5}</h1>
        <p className='font-light text-gray-400'>{policy5info}
        </p>
       </div>
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '>{policy6}</h1>
        <p className='font-light text-gray-400'>{policy6info}
        </p>
       </div>a
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '>{policy7}</h1>
        <p className='font-light text-gray-400'>{policy7info}
        </p>
       </div>
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '>{policy8}</h1>
        <p className='font-light text-gray-400'>
        {policy8info}
        </p>
       </div>
       <div className='py-5'>
       <h1 className='text-gray-300 font-bold '>9. Contact Information</h1>
        <p className='font-light text-gray-400'>
        If you have any questions about these Terms and Conditions, please contact us at moviesspot@gmail.com
        </p>
        <p className='flex justify-center font-bold text-gray-400 py-10 underline' >{endcontext}</p>
       </div>
    </div>
  )
}
export default Terms 