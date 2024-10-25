import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom'

export const Detailpage = () => {
    const {id} = useParams();
    const [data , setData] = useState(null)  

    console.log(data)
    const fetch_data = async () => {
        try {
            const res = await fetch(`https://www.eporner.com/api/v2/video/id/?id=${id}&thumbsize=medium&format=json`);
            const json = await res.json();

            setData(json);

        }
        catch (e){
            console.log(e)
        } 
    }

    useEffect(() => {
            fetch_data()
    },[id])

  return (
    <>
    <div className='justify-center flex py-10'>
        <iframe src={data?.embed} 
        className='py-10 w-full blur-3xl'
        allowFullScreen 
        title={data?.title} 
        width="889px" 
        height="600px" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>

    
    </div>
    <span className='text-gray-100 text-lg font-bold'>{data?.title}</span>
    </>
  )
}
