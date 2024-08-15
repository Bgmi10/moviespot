export const random = () =>{
    const a = ["subash", "mukesj" , "ramesh" , "pandiammal" , "ravi" , "rekaer"]
    
    const b = Math.floor(Math.random() * a.length)
    return a[b] 
  }

  export const settings = {
    infinite: false,
    slidesToShow: 8,
    slidesToScroll: 8,
    arrows : false,
   
    
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false
        },
      },
    ],  
   };