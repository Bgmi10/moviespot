import React from 'react'

export const Formcontent = ({starvalue , dynamic_hash_heading , targetRatingHashtags}) => {
  return (
    <div>
         { starvalue === 0 ? <div className='mt-3'>
                 

                 <p className='text-xl font-serif text-gray-600 mt-10 text-center'> Your ratings matter !</p>
                 <p className='text-center font-light text-sm text-gray-400'>They help others decide what to watch next.</p>


            </div> : 

            <div className='mt-6 '>
                   
                   <h1 className='p-2'>{dynamic_hash_heading}</h1>

                   <p className='text-gray-400 font-sans text-sm p-2 '> Express yourself with hashtags! </p>

                     <div className="flex flex-wrap justify-center gap-2">
                         {targetRatingHashtags?.map((i , index) => (
                           <button className='p-2 text-rose-600 m-1 border rounded-full' key={index}>{i}</button>
                         ))}
                     </div>

            </div>

  }
    </div>
  )
}
