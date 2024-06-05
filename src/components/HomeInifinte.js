import React, { useEffect } from 'react'

 const HomeInifinte = () => {

    useEffect(()=>{
      const fetch_data = async () =>{
        const res = await fetch(`
        https://api.themoviedb.org/3/movie/changes?api_key=${process.env.REACT_APP_API_KEY}`)
        const json = await res.json()
    

      }
      fetch_data()
    },[])
  return (
    <div>
        {

        }
    </div>
  )
}

export default  HomeInifinte