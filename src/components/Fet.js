import React, { useEffect } from 'react'

export const Fet = () => {


    useEffect(()=>{
       const dummyapi = async () =>{
        const res = await fetch('https://b7dc90d8-2b26-429e-b714-c63e2bd1e010-00-1ardormi6zjcq.sisko.replit.dev/api/subscription-status')

        const json = await res.json()
        console.log(json)
       }
       dummyapi()
    },[])
  return (
    <div></div>
  )
}
