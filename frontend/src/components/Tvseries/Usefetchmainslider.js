import { useEffect , useState } from "react"

const Usefetchmainslider = ({category}) =>{
     const [data , setdata] = useState(null)

     const fetch_data = async( ) =>{
      try{ 
         const res  = await fetch(`https://api.themoviedb.org/3/discover/${category}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true&include_null_first_air_dates=false&with_original_language=ta&page=1`)
        const json  = await res.json()
        setdata(json)}
        catch (error){
            console.log(error)
        }
     }

    useEffect(() =>{
      fetch_data()
    } , [])
return {data}
}

export default Usefetchmainslider