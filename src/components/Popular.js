import React, { useEffect } from 'react'

export const Popular = () => {

    useEffect(()=>{
        const fetch_data = async () =>{
            const res = await fetch('https://api.themoviedb.org/3/movie/743563/lists',{
                method:"GET",
                headers:{
                    accept : "application/json",
                    Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzlhNTBjYzljNjE3YmI3YWJiNzE3ZDE4MGMwZTM1NyIsInN1YiI6IjY1YTE3OWEyMjE2MjFiMDEzMjU5NzAxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8kSxkmzsk-de6T_drytirygqdNamu0CSJokC4xYMpsw'
                }
            })
        }
    })
  return (
    <div>

    </div>
  )
}



