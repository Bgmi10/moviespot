export const random = () =>{
    const a = ["subash", "mukesj" , "ramesh" , "pandiammal" , "ravi" , ]
    
    const b = Math.floor(Math.random() * a.length)
    return a[b] 
  }

  export const settings = {
    infinite: false,
    slidesToShow: 8,
    slidesToScroll: 2,
   
    
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          
          arrows: false
        },
      },
    ],  
   };