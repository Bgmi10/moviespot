export const random = () =>{
    const a = ["subash", "mukesj" , "ramesh" , "pandiammal" , "ravi" , ]
    
    const b = Math.floor(Math.random() * a.length)
    return a[b] 
  }