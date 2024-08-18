import leads from '../imgs/leads-3.PNG';
import swiggy from '../imgs/swiggy1.PNG';
import leads1 from '../imgs/leads-1.PNG'
import leads2 from '../imgs/leads-5.PNG'
import leads3 from '../imgs/leads-7.PNG'
import moviespot from '../imgs/moviespot2.PNG';
import swiggy1 from '../imgs/swiggy-1.PNG'
import swiggy2 from '../imgs/swiggy-3.PNG'
import swiggy3 from '../imgs/swiggy4.PNG'
import swiggy4 from '../imgs/swiggy5.PNG'
import moviespot1 from '../imgs/moviespot1.PNG'
import moviespot2 from '../imgs/moviespot3.PNG'
import moviespot3 from '../imgs/moviespot5.PNG'
import moviespot4 from '../imgs/moviespot10.PNG'
import moviespot5 from '../imgs/moviespot11.PNG'
import foodies1 from '../imgs/foodies1.PNG'
import foodies2 from '../imgs/foodies2.PNG'
import foodies3 from '../imgs/foodies4.PNG'
import stater1 from '../imgs/stater.PNG'
import yputube1 from '../imgs/youtube1.PNG'
import yputube2 from '../imgs/youtube2.PNG'
import yputube3 from '../imgs/youtube3.PNG'
import stater2 from '../imgs/staterlight.PNG'
import Chat1 from '../imgs/chat1.PNG'
import Chat2 from '../imgs/chat2.PNG'
import Chat3 from '../imgs/chat3.PNG' 
import Chat4 from '../imgs/chat4.PNG'
import Chat5 from '../imgs/chat5.PNG'  
import nexsus from '../imgs/nexsus.PNG'
import kari1 from '../imgs/kari1.PNG'
import kari2 from '../imgs/kari2.PNG'
import kari3 from '../imgs/kari3.PNG'

export const  projects = [
   
    {
      title: 'Food ordering PWA',
      description: `This project is a comprehensive frontend-only e-commerce platform inspired by Swiggy. It showcases advanced UI/UX design principles and leverages modern web technologies to create an intuitive and efficient shopping experience. Despite lacking a backend, the project covers essential features such as authentication, cart management, product display optimization, and more, all achieved through creative solutions and innovative techniques.
  
      Technologies Used:
  
      React: The core framework for building the interactive UI components.
      
      Redux: Utilized for global state management, enabling seamless cart functionality and user session persistence.
      
      Tailwind CSS & Material UI: For styling, providing a modern and responsive design across all devices.
      
      Firebase: As the backend alternative for user authentication (OAuth) and hosting
      
      Features:
      Authentication (OAuth): Secure user login and registration powered by Firebase OAuth.
      
      Cart Functionality: Global state management with Redux for handling cart items efficiently.
      
      Infinite Scroll: Optimizes product display, reducing initial page load times and improving user experience.
      
      Search Functionality: Enhanced search capabilities with optimized caching and debounce technique for reduced server load.
      
      Lazy Loading: Reduces page load times by rendering images and content only within the viewport.
      
      Shimmer UI Effect: Improves UX during data loading states with a visually appealing effect.
      
      Responsive Design: Ensures compatibility and optimal viewing experience across various devices.
      
      Dynamic Routing: Implemented using React Hooks for smooth navigation between pages.
      
      Filter Feature: Allows users to manage their preferences and refine their search results effectively.
      
      Achievements:
      FCP Optimization: Leveraged lazy loading and other performance enhancements to achieve faster content perception.
      User Experience: Employed the shimmer UI effect and optimized search functionality to enhance overall user satisfaction.`,
      imageUrl: [swiggy, swiggy1 , swiggy2 , swiggy3 , swiggy4 ],
      link : '', 
      repo : 'https://github.com/Bgmi10/Food-ordering-app-ui-/tree/master',
    },
    {
      title: 'Movie Spot',
      description: `🎬 Excited to unveil MOVIE SPOT, a cutting-edge movie web app! 🚀 Crafted with React.js, Tailwind CSS, and Firebase Auth, it boasts features like voice recognition, extreme UX, and code-splitting for optimal performance.
  
      🔍 Dynamic Search Functionality: Explore a vast collection of movies with our powerful search feature. Effortlessly find your favorite films or discover new ones using our intuitive search bar. We've integrated advanced search capabilities for a seamless and efficient user experience.
      
      📱🖥️ Responsive Design: Enjoy a tailored experience on any device! MOVIE SPOT's responsive design ensures a consistent and visually stunning interface, whether you're using a smartphone, tablet, or desktop. The UI adapts for optimal user experience and image quality.
      
      🌐 Varied UI for LG Screens: For large screens like LG monitors, we've crafted a unique user interface to maximize the viewing experience. Enjoy enhanced image quality and an interface designed for your LG screen's dimensions.
      
      🎥 YouTube API for Trailers: Dive deeper into movie details with integrated YouTube trailers. Get a sneak peek before deciding on your next cinematic adventure, all within the app.
      
      ⚙️ React Hooks for Superior UX: Utilizing React hooks, we've fine-tuned every interaction to ensure a smooth and enjoyable user experience. From transitions to real-time updates, each detail contributes to the overall satisfaction of our users.
      
      🚧 Upcoming Features: Stay tuned for exciting developments! We're working on seamless authentication to enhance user profiles and personalized experiences. The journey doesn't end here — more features are on the horizon!
      
      Join us on MOVIE SPOT for an unparalleled movie-watching journey. 🍿✨`,
      imageUrl: [moviespot , moviespot1 , moviespot2 , moviespot3 , moviespot4 , moviespot5 ],
      link : 'https://movieapp-cd283.web.app/',
      repo : 'https://github.com/Bgmi10/moviespot-frontend-main'
    },{
      title : 'New tube',
      description : `I developed a New-tube web application using React, Redux, and the official YouTube API, delivering a seamless and interactive video watching experience. This project demonstrates my expertise in modern web development, focusing on API integration, state management, and UI/UX design.

      Key Technologies:
      
      React for building the user interface.
      
      Redux for state management, ensuring efficient data flow and caching.
      
      YouTube API for fetching and displaying dynamic video content.
      
      Tailwind CSS & Material UI for crafting a responsive and intuitive design.
      
      
      Features:
      
      Sidebar with Multiple Options: A user-friendly sidebar provides easy access to various categories and features, enhancing the navigation experience.
      
      Content Display with YouTube API Integration: Dynamically showcases videos fetched from the YouTube API, offering users a personalized video feed.
      
      Search with Debounce Technique: Implements a debouncing technique to optimize API calls, reducing unnecessary requests when the user types rapidly. Results are cached using Redux to avoid redundant API calls for repeated searches.
      
      Dynamic Routing: Utilizes react-router-dom for dynamic routing, ensuring smooth transitions between different pages and content.
      
      React Hooks & Data Management: Leverages React hooks to manage the data layer effectively, ensuring components are optimized and state management is seamless.
      
      Live Chat Feature: Integrated a real-time chat feature using Redux, where actions are dispatched on component mount. The useSelector hook is used to subscribe to specific portions of the Redux store, keeping the chat synchronized.
      
      Reddit-Style Nested Comments: The video detail page includes a nested comment section inspired by Reddit. This feature uses recursive methods to efficiently render comments and replies, providing an engaging discussion platform. leveraging the redux and provide the live chat feature using the redux and it was very fun to work on this cause i  dont have any poll api to get the live data so , ive used the mock data to implement this feature. triggering the api call using setinterval api dispatch an action in to reduc store and also subscribe to the store for reciving data at a time. `,
      imageUrl : [ yputube2  , yputube3 , yputube1],
      link : 'https://new-tube-black.vercel.app/',
      repo : 'https://github.com/Bgmi10/youtube-clone'


    },
    {
      title : "Real time Chat(Socket.io)",
      description : 'Implemented socket.io to connect the user with real-time-data sharing and also group discussion with emit the message to all connected users at the time using broadcast. leveraging Oauth 2.0  for auth to connect the verified user. crafted with node js as a backend. idea was to connect the users on realtime like whatsapp',
      link : 'https://realtimechat-xi-neon.vercel.app/', 
      repo : 'https://github.com/Bgmi10/Real-time-caht-application',
      imageUrl : [Chat1 , Chat2 , Chat3 , Chat4 , Chat5]

    }
  ];



  export const opensourceprojects = [
    {
        title: 'FEAT: contributors page (Gssoc level-2)',
        description: `implemented the Contributors page with infinite scroll, ensuring compatibility for both large and small devices.`,
        imageUrl: [foodies1 , foodies2 , foodies3],
        link : 'https://github.com/VanshKing30/FoodiesWeb/pull/441',
        repo : 'https://github.com/VanshKing30/FoodiesWeb'
      }, {
        title: 'FEAT: Dark-light/toggle',
        imageUrl: [stater1 , stater2],
        link : 'https://github.com/ArslanYM/StarterHive/issues/229',
        description: `implemented the dark-light-theme across all routes from scratch. To maintain the state ive used  redux and also stored the user prefernce in local storage to persist across the web page.`,
        repo : 'https://github.com/ArslanYM/StarterHive'

      }


  ]


  export const Freelanceprojects = [
    {
      title: 'E-Commerce (selling oil products)',
      description: `Mid-scale Progressive Web App (PWA) for a client, with a focus on enhancing user experience and streamlining e-commerce operations. The project is approximately 70% complete, with production deployment anticipated by the end of the month.
  
      Key Features & Technologies:
  
      Frontend: Built using React for a dynamic and responsive user interface, with Redux Toolkit for efficient global state management. Designed with Tailwind CSS and Material UI to ensure a modern, fast-loading, and visually appealing UI.
      
      Cart Functionality: Implemented a robust cart system to facilitate easy product management and checkout.
      
      Payment Integration: Integrated Razorpay for secure and seamless payment processing.
      
      Order Management: Developed a manual order management system to track and handle orders effectively.
      
      Searchable Product Catalog: Added a search feature with debounce to minimize server API calls and enhance performance.
      
      Authentication: Currently using email and password for user authentication, with plans to extend provider options in the future.
      
      Backend: Leveraged Strapi as the headless CMS to handle content management and data storage, offering flexibility and scalability.
      
      Performance Optimization: Focused on improving page load times and reducing Largest Contentful Paint (LCP) and First Contentful Paint (FCP). Implemented chunking of pages and rendered chunks during page load to enhance initial response times.
      
      Reusable Components: Developed reusable components following the Single Responsibility Principle (SRP) to ensure maintainability and avoid code duplication.
      
      Chatbot Integration: Added a chatbot to enhance customer support, providing real-time assistance and improving user engagement.
                                                                                           -- XX --
      This e-commerce platform aims to enhance customer outreach and drive the company's product sales, particularly in the oil sector. The project is still in progress`,
      imageUrl: [leads , leads1 , leads2 , leads3],
      link : '',
      repo : 'https://github.com/Bgmi10/leads'
    },
    {
      title : 'Nexsus Security (Ed tech platform)',
      description : 'Nexsus security is the ed tech company. there are teaching lot of students to become sucessful in cyber security field with the flow there are assigned the project to me . my responsiability is to built the dashboard and protect route on frontend admin page it was feature they`ve asked it to me is RBAC(role based access control). On, frontend ive used the react to utilize the power of libraries and boilerplate codes. frontend is fairly just a landing page which was a pretty look UI. key point was ive done the project at given time and also get paid from the client. features => UI enhancement , responsiveness , cleaning unused codes , using node js to handle the logic of dashboard and for DB ive used Mongo. so , overall experiance in this project was super cool',
      link : 'https://www.nexussecurity.online/',
      imageUrl : [nexsus], 
      repo : 'https://github.com/Bgmi10/final'

    }, 
    {
      title : 'Mutton stall (static website)',
      description : ' website developed with react. leveraging the customers review and subscribe the data through fire store. static website to know the customers feedback about the store. key enhancement => # increased the bussiness sales ',
      link : 'https://vellattu-kari-kadai.vercel.app/',
      imageUrl : [kari1 , kari2 , kari3]

    }
  ]



//  const data =  [
//           {
//               "objectId": "t3wBFp5Fwj",
//               "movieName": "Mazhai Pidikatha Manithan (2024)",
//               "rating": " 0",
//               "storyline": "A secret agent, forced to live anonymously, encounters a woman in debt. Against his detached lifestyle, he befriends her while rescuing a pup, sparking a journey to help with her financial troubles.",
//               "poster": "https://www.themoviedb.org/t/p/original/udYR53s43JCHzqCLqDbIK5rGuGj.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/cnEX69OmF8QkXvG2wYp5mmdOI7K.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7846",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "4dzw0lktoqz9",
//               "filelions": "m0opr723ls1i",
//               "streamruby": "rwygbgacveyn",
//               "uploadever": "",
//               "HubCloud": "https://showflix.shop/archives/7850",
//               "shrink": false,
//               "createdAt": "2024-08-16T05:35:04.235Z",
//               "updatedAt": "2024-08-16T05:35:04.235Z"
//           },
//           {
//               "objectId": "TEDWrhVJ7P",
//               "movieName": "Dune: Part Two (2024)",
//               "rating": " 8.167",
//               "storyline": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
//               "poster": "https://www.themoviedb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://showflix.shop/archives/7837",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "pc8k6cfukiua",
//               "filelions": "ggm8pywixtea",
//               "streamruby": "lk1npfw3ed4u",
//               "uploadever": "",
//               "HubCloud": "https://showflix.shop/archives/7841",
//               "shrink": false,
//               "createdAt": "2024-08-01T06:55:42.863Z",
//               "updatedAt": "2024-08-01T06:55:42.863Z"
//           },
//           {
//               "objectId": "WEH08NFNfz",
//               "movieName": "Dune (2021)",
//               "rating": " 7.785",
//               "storyline": "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
//               "poster": "https://www.themoviedb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://showflix.shop/archives/7830",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "vfbsbq00iah0",
//               "filelions": "h7a1ndpct7bg",
//               "streamruby": "qgmcvh4frd1o",
//               "uploadever": "",
//               "HubCloud": "https://showflix.shop/archives/7832",
//               "shrink": false,
//               "createdAt": "2024-08-01T06:47:13.668Z",
//               "updatedAt": "2024-08-01T06:47:13.668Z"
//           },
//           {
//               "objectId": "PweQ2bB3UI",
//               "movieName": "Anjaamai (2024)",
//               "rating": " 0",
//               "storyline": "When Sarkaar’s son dreams of becoming a doctor, he gets unrelenting and unwavering support from his father. As bureaucratic errors and systemic obstacles threaten his future, a shocking turn of events propels him into a gripping quest for justice.",
//               "poster": "https://www.themoviedb.org/t/p/original/mGGGGa74sCoOugvfvDXBQ16JlLc.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/zHHrb6KtZ6jBx8miFgZyZKCvbJv.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7805",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "den5nv5f3re6",
//               "filelions": "w20tzb3n32mt",
//               "streamruby": "v06xc4s7uoum",
//               "uploadever": "",
//               "HubCloud": "https://showflix.shop/archives/7810",
//               "shrink": false,
//               "createdAt": "2024-07-19T15:32:54.928Z",
//               "updatedAt": "2024-07-19T15:32:54.928Z"
//           },
//           {
//               "objectId": "K8iUU6mn0P",
//               "movieName": "The Goat Life (2024)",
//               "rating": " 7.5",
//               "storyline": "The real-life incident of an Indian migrant worker, Najeeb Muhammad, who goes to Saudi Arabia to earn money. However, in a twist of fate, he finds himself living a slave-like existence, herding goats in the middle of the desert.",
//               "poster": "https://www.themoviedb.org/t/p/original/95p65Eb3meuWj8DhldOeIz3NLPF.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/iiPyuMn3SHluoLPhIBvxh04wIAb.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ml",
//               "hdlink": "https://showflix.shop/archives/7799",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "jpjf8glpqkkq",
//               "filelions": "mwlf6lhwz9kl",
//               "streamruby": "bm4nla9esrdz",
//               "uploadever": "t2u55pkhcdm4",
//               "HubCloud": "https://showflix.shop/archives/7803",
//               "shrink": false,
//               "createdAt": "2024-07-19T13:56:17.056Z",
//               "updatedAt": "2024-07-19T13:56:17.056Z"
//           },
//           {
//               "objectId": "MqGIeetHk3",
//               "movieName": "Indian (1996)",
//               "rating": " 6.9",
//               "storyline": "Senapathy, an honest veteran having served in the Indian Army, decides to teach corrupt officials a lesson. He targets officials, ministers, and bureaucrats to make them work diligently without accepting bribes.",
//               "poster": "https://www.themoviedb.org/t/p/original/5dQ86UZXRJASO5LzlgMVUMZTFQb.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/gLokHZ39okWFb9QL3xe8fvNAFDm.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7773",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "80wfewlxosws",
//               "filelions": "keacvulawo4z",
//               "streamruby": "bk8vlj1b23ny",
//               "uploadever": "",
//               "HubCloud": "https://showflix.shop/archives/7777",
//               "shrink": false,
//               "createdAt": "2024-07-13T11:51:21.506Z",
//               "updatedAt": "2024-07-13T11:51:21.506Z"
//           },
//           {
//               "objectId": "Bv4LpEgzrF",
//               "movieName": "Maharaja (2024)",
//               "rating": " 8.4",
//               "storyline": "In a quiet neighborhood, Maharaja, a respected middle-aged barber, lives with his daughter Jothi and Lakshmi. When Maharaja reports to the police that masked intruders attacked him and robbed Lakshmi, the authorities reject this claim, doubting the authenticity of her loss. Despite his repeated attempts to seek help, he was willing to go all the way, even investigating it himself before his daughter returned. As suspicions grow and the Maharaja's sanity is questioned, the mystery deepens.",
//               "poster": "https://www.themoviedb.org/t/p/original/iakDhBTwNM0MwfI8y0fuWUZej51.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/o6G8llbhWHnhKzNPSSvIbic5NWe.jpg",
//               "category": "Tamil Telugu Hindi Kannada Malayalam",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7756",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "racti6xm6bkd",
//               "filelions": "3q1e1mj8i3ed",
//               "streamruby": "gjh9kek9o2t8",
//               "uploadever": "",
//               "HubCloud": "https://showflix.shop/archives/7758",
//               "shrink": false,
//               "createdAt": "2024-07-12T07:26:14.646Z",
//               "updatedAt": "2024-07-12T07:26:14.646Z"
//           },
//           {
//               "objectId": "VDS0qjZ3qF",
//               "movieName": "Garudan (2024)",
//               "rating": " 0",
//               "storyline": "Set in Theni, a minister’s greed to seize temple land sets in motion a chain of events that pits two childhood friends, Aadhi and Karuna against each other in a tale of betrayal and retribution. Sokkan was their trusted confidant whose loyalty become changed by dynamic into betrayal and survival.",
//               "poster": "https://www.themoviedb.org/t/p/original/xLBfXgJAKYqUQmq8HkD9CUFiaMm.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/5CayL5lnfk0PJq9HXqqegvcmtdE.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7735",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "tkkypbvhlnty",
//               "filelions": "4mmb57wzytsw",
//               "streamruby": "2rl4owietwfz",
//               "uploadever": "ptdok0k6dzzh",
//               "HubCloud": "https://showflix.shop/archives/7737",
//               "shrink": false,
//               "createdAt": "2024-07-03T04:49:14.614Z",
//               "updatedAt": "2024-07-03T04:49:14.614Z"
//           },
//           {
//               "objectId": "DATS7wrE0a",
//               "movieName": "Civil War (2024)",
//               "rating": " 7.008",
//               "storyline": "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
//               "poster": "https://www.themoviedb.org/t/p/original/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://showflix.shop/archives/7725",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "knkh91ll7t4t",
//               "filelions": "gg3sszyw43id",
//               "streamruby": "xtywapkald6v",
//               "uploadever": "71e5523l0ppr",
//               "shrink": false,
//               "createdAt": "2024-06-28T08:50:23.952Z",
//               "updatedAt": "2024-06-28T08:50:42.005Z",
//               "HubCloud": "https://showflix.shop/archives/7727"
//           },
//           {
//               "objectId": "tvHPCs4Tf9",
//               "movieName": "Unarvugal Thodarkadhai (2024)",
//               "rating": " 0",
//               "storyline": "Karthik who had multiple relationships in his life goes through a breakup and impulsively marries Priya, who has never had a relationship. Will this marriage lead to eternal love between them?",
//               "poster": "https://m.media-amazon.com/images/M/MV5BNTVmNWZlMTEtNTJkMi00MTgxLTgyMTMtYWE5NzViYzYwYzc3XkEyXkFqcGdeQXVyMTM5NzM4Mjgx._V1_.jpg",
//               "backdrop": "https://assets-in.bmscdn.com/discovery-catalog/events/et00388835-sjhjfqjxas-landscape.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7704",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "7jbmnvkqxuks",
//               "filelions": "11q2vya6z1hg",
//               "streamruby": "kd13ayq3lr9h",
//               "uploadever": "tnpgwn7wlpfc",
//               "shrink": false,
//               "createdAt": "2024-06-28T07:12:32.717Z",
//               "updatedAt": "2024-06-28T07:12:57.631Z",
//               "HubCloud": "https://showflix.shop/archives/7706"
//           },
//           {
//               "objectId": "rE1vyDbIBJ",
//               "movieName": "Pagalariyaan (2024)",
//               "rating": " 0",
//               "storyline": "Wolf Elope With a Girl , a Gangster Named Silent Searching for His Sister, While Try to Find His Sister, He Find Some Traces of Their Presence and Find Out That Boy is Not a Good Guy and Try to Sell Her. On the Way to Bangalore Wolf Meet Some Illegal Underground Guys and Have a Doubt About Wolf and His Activities, Other Side Wolf Friend Baskar Try to Find Wolf Regarding of the Girl. Wolf Give Sleeping Tablet to Her and Taken Somewhere, Did Silent Find His Sister? Where Wolf is Taking Her is Leads to the Conclusion on the Same Night.",
//               "poster": "https://www.themoviedb.org/t/p/original/6nKzJVNRwEJ6T8aQiuRnXc276OC.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/jG737ZyFKstMmt0UgbXU6Hi47tZ.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7695",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "lvropnbml9ra",
//               "filelions": "p4i0t4iyfjxn",
//               "streamruby": "tfack9quiimc",
//               "uploadever": "1s6kfrugmlw7",
//               "shrink": false,
//               "createdAt": "2024-06-28T06:29:48.180Z",
//               "updatedAt": "2024-06-28T06:30:03.233Z",
//               "HubCloud": "https://showflix.shop/archives/7697"
//           },
//           {
//               "objectId": "9I5YcUAyUi",
//               "movieName": "Inga Naan Thaan Kingu (2024)",
//               "rating": " 0",
//               "storyline": "A newly married couple and their family unwittingly gets mixed up in a terrorist plot.",
//               "poster": "https://www.themoviedb.org/t/p/original/ppnJKpZp08g2P1gzP00UVQxxK3c.jpg",
//               "backdrop": "https://m.media-amazon.com/images/M/MV5BODUwZGM0MTMtMWU0Ni00MmI3LWEyMDMtOTFhMDkwNzk4OTM0XkEyXkFqcGdeQXVyMTgwNTYyNTM5._V1_.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7687",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "nde2l2pq719e",
//               "filelions": "ipnutwy2p7uh",
//               "streamruby": "48xerzl009wu",
//               "uploadever": "vvl0qk9fhmpo",
//               "shrink": false,
//               "createdAt": "2024-06-28T05:24:59.351Z",
//               "updatedAt": "2024-06-28T05:25:58.839Z",
//               "HubCloud": "https://showflix.shop/archives/7688"
//           },
//           {
//               "objectId": "JSYIdUV1Ch",
//               "movieName": "Furiosa: A Mad Max Saga (2024)",
//               "rating": " 7.677",
//               "storyline": "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
//               "poster": "https://www.themoviedb.org/t/p/original/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://showflix.shop/archives/7670",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "7fbajqj1ug0t",
//               "filelions": "no3ap7uxqieo",
//               "streamruby": "kspjg9cyv7hg",
//               "uploadever": "fud7gv2wnz1p",
//               "shrink": false,
//               "createdAt": "2024-06-26T08:50:17.563Z",
//               "updatedAt": "2024-06-26T08:51:00.144Z",
//               "HubCloud": "https://showflix.shop/archives/7667"
//           },
//           {
//               "objectId": "GqyfIEpmGi",
//               "movieName": "Maharaj (2024)",
//               "rating": " 0",
//               "storyline": "Based on a real-life historic court case, a bold journalist questions a powerful spiritual leader’s extreme control over his followers.",
//               "poster": "https://www.themoviedb.org/t/p/original/lsuUGtUzrzEnlIUjVRSqFNUMZEz.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/if7JDhEQvCaAyefVL3xSarkkLUi.jpg",
//               "category": "Tamil Telugu Hindi",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "hi",
//               "hdlink": "https://showflix.shop/archives/7662",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "85cq7xdbqgdu",
//               "filelions": "n0w9nwdb8fp5",
//               "streamruby": "ot0ylmmxtlhc",
//               "uploadever": "0q087qir6d77",
//               "shrink": false,
//               "createdAt": "2024-06-25T05:28:47.389Z",
//               "updatedAt": "2024-06-25T05:29:11.519Z",
//               "HubCloud": "https://showflix.shop/archives/7664"
//           },
//           {
//               "objectId": "VE0SED21qI",
//               "movieName": "Trigger Warning (2024)",
//               "rating": " 4",
//               "storyline": "A skilled Special Forces commando (Jessica Alba) takes ownership of her father's bar after he suddenly dies, and soon finds herself at odds with a violent gang running rampant in her hometown.",
//               "poster": "https://www.themoviedb.org/t/p/original/6XJM3C47iGOK9nFU6yLFCSf4U5c.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/aATi2PtaOQCVAquCym6OU0Z4FjY.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://showflix.shop/archives/7646",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "9y2s8jrk2cc3",
//               "filelions": "2nfmnlzvu6oe",
//               "streamruby": "kdpurhuw2yok",
//               "uploadever": "w8wbkk0gm3ne",
//               "shrink": false,
//               "createdAt": "2024-06-21T15:54:58.630Z",
//               "updatedAt": "2024-06-21T15:55:25.343Z",
//               "HubCloud": "https://showflix.shop/archives/7647"
//           },
//           {
//               "objectId": "d8ghPo82zF",
//               "movieName": "PT Sir (2024)",
//               "rating": " 9",
//               "storyline": "A young teacher attempts to introduce unique physical activities to schoolchildren.",
//               "poster": "https://www.themoviedb.org/t/p/original/f5PUzoEEHEOHjy9mirHrnobSVVz.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/npzbtnkAXPOV7dkKSdh616jiOnI.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7639",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "doyuoduzcijp",
//               "filelions": "l30rcyczdwiu",
//               "streamruby": "53r3ouc5n7zb",
//               "uploadever": "hok0vw7n8o42",
//               "shrink": false,
//               "createdAt": "2024-06-21T15:22:58.901Z",
//               "updatedAt": "2024-06-21T15:23:45.181Z",
//               "HubCloud": "https://showflix.shop/archives/7640"
//           },
//           {
//               "objectId": "btRPU1sasc",
//               "movieName": "Aranmanai 4 (2024)",
//               "rating": " 0",
//               "storyline": "After his sister's suspicious death, a man decides to discover the hidden truth, setting off a chasm for chaos and terror.",
//               "poster": "https://www.themoviedb.org/t/p/original/k4d4RmvBVtSF8SGgTGAqPZlsOg1.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/BqPHa5sz4wTzzRZkyLqXFi0E1x.jpg",
//               "category": "Tamil Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7631",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "vc1l9pc25jfb",
//               "filelions": "mzo4z26pqn00",
//               "streamruby": "lunh3skyxljw",
//               "uploadever": "lia53di0rqor",
//               "shrink": false,
//               "createdAt": "2024-06-21T08:34:32.560Z",
//               "updatedAt": "2024-06-21T08:35:32.209Z",
//               "HubCloud": "https://showflix.shop/archives/7630"
//           },
//           {
//               "objectId": "MGX1PAOQXX",
//               "movieName": "Star (2024)",
//               "rating": " 7.7",
//               "storyline": "Follows a youngster Kalai and his aspirations of becoming a 'Star' in the Tamil Film Industry. Born in a lower-middle-class family, will Kalai overcome all his struggles to emerge as a Star?",
//               "poster": "https://image.tmdb.org/t/p/original/cuKXgRznXwQzpa4kBbibJi1bBoc.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/nCRLG0OzsP4U5IddWCIZzDoAWLA.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.shop/archives/7585",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "7h5mugy7ems6",
//               "filelions": "yo80x4ofj666",
//               "streamruby": "8nspxvv93ie1",
//               "uploadever": "l1gbpyyvzj2y",
//               "shrink": false,
//               "createdAt": "2024-06-07T07:36:04.329Z",
//               "updatedAt": "2024-06-17T17:04:23.969Z",
//               "HubCloud": "https://showflix.shop/archives/7601"
//           },
//           {
//               "objectId": "6UFjTqFRFm",
//               "movieName": "Lover (2024)",
//               "rating": " 6.5",
//               "storyline": "Following six years of love, longing & togetherness, Arun and Divya start to drift apart.Will their love endure their differences, or does love really need to endure so much?",
//               "poster": "https://www.themoviedb.org/t/p/original/w6cu5wybAwZ46ZzcIKrAXd3VGI0.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/h4yzXzDdmLnoRNRJBGBMAtxpxd4.jpg",
//               "category": "Tamil Telugu Hindi Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.online/archives/7579",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "8tgsdd0ihff0",
//               "filelions": "z6847op9qycv",
//               "streamruby": "q0aqmcs44762",
//               "uploadever": "",
//               "shrink": false,
//               "createdAt": "2024-03-29T09:02:21.663Z",
//               "updatedAt": "2024-03-29T09:02:21.663Z"
//           },
//           {
//               "objectId": "1Z5cBFrxim",
//               "movieName": "Singapore Saloon (2024)",
//               "rating": " 0",
//               "storyline": "A young boy's friendship with a barber inspires him to open his own salon.",
//               "poster": "https://www.themoviedb.org/t/p/original/x6AxOaH0BiWJZkgAzeunHe3ZCLG.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/5WWuqrJm9MScRpP0WnT5PQrUe17.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.online/archives/7575",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "rp9ifa8502ff",
//               "filelions": "1d5pjz7oxxox",
//               "streamruby": "xmtvau3r0uoa",
//               "uploadever": "b01zjjd8augc",
//               "shrink": false,
//               "createdAt": "2024-02-23T05:33:41.219Z",
//               "updatedAt": "2024-02-23T05:33:41.219Z"
//           },
//           {
//               "objectId": "OWpeqxZwjJ",
//               "movieName": "The Kerala Story (2023)",
//               "rating": " 4.2",
//               "storyline": "A converted Muslim woman Fatima narrates her ordeal of how she once wanted to become a nurse but was abducted from her home and manipulated by religious vanguards and turned into an ISIS terrorist and landed in Afghanistan jail.",
//               "poster": "https://www.themoviedb.org/t/p/original/g70f3hwn5jPaNzqPssoa9unlawo.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/ukVxV6Z31zPlbNnQM4RqNLFliHB.jpg",
//               "category": "Tamil Telugu Hindi Malayalam",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "hi",
//               "hdlink": "https://showflix.online/archives/7570",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "6e0nsl03w2im",
//               "filelions": "rur5ofhy6e9v",
//               "streamruby": "svfx8od0ci16",
//               "uploadever": "vqpeafavwe6r",
//               "shrink": false,
//               "createdAt": "2024-02-16T08:00:47.758Z",
//               "updatedAt": "2024-02-16T08:00:47.758Z"
//           },
//           {
//               "objectId": "oFqitHn9M8",
//               "movieName": "Saba Nayagan (2023)",
//               "rating": " 10",
//               "storyline": "This coming-of-age drama follows Saba, the happy-go-lucky protagonist, through the years leading up to his adulthood and highlighting events of friendship and romance along the way.",
//               "poster": "https://www.themoviedb.org/t/p/original/uYIw5Jt4xkcjObDwJqcgeLFP042.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/xf0Dg2NX6rnAfOPveP8Kp2v14G6.jpg",
//               "category": "Tamil Telugu Hindi Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.online/archives/7566",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "pxhs8uz205ni",
//               "filelions": "90l6njguqg3h",
//               "streamruby": "e1yp7gjpu8cc",
//               "uploadever": "neq65egf4cl1",
//               "shrink": false,
//               "createdAt": "2024-02-16T07:36:20.259Z",
//               "updatedAt": "2024-02-16T07:36:20.259Z"
//           },
//           {
//               "objectId": "sXouQIOKYz",
//               "movieName": "Captain Miller (2024)",
//               "rating": " 7.286",
//               "storyline": "In the 1930s, during the British Raj, Analeesan \"Eesa\", a former soldier of the British Indian Army called Captain Miller, is on a mission to protect the people from the British after witnessing an atrocity.",
//               "poster": "https://www.themoviedb.org/t/p/original/gq5OlT5ImxsNpkirpgf4rYngd3M.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/u3lWiLi0e0W3aU822QdcxQIGBES.jpg",
//               "category": "Tamil Telugu Kannada Malayalam",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.online/archives/7562",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "xt7nhah0f1eq",
//               "filelions": "t7bv5vrvf1ag",
//               "streamruby": "yr8bz6awbg88",
//               "uploadever": "o265pyjzrw6x",
//               "shrink": false,
//               "createdAt": "2024-02-16T06:36:08.859Z",
//               "updatedAt": "2024-02-16T06:36:08.859Z"
//           },
//           {
//               "objectId": "f1CS0gbXEs",
//               "movieName": "Ayalaan (2024)",
//               "rating": " 5.333",
//               "storyline": "A lost alien seeks help from four friends to get back to his home planet, while a group of hostile scientists tries to capture it.",
//               "poster": "https://www.themoviedb.org/t/p/original/8nryykQqfU7yqTz4FD7uEBjseZp.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/edF35dA59ltU0dZdCJ66M9TBrp5.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://showflix.online/archives/7549",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "9k7zs6jvo4xc",
//               "filelions": "sv7ed56zmiz6",
//               "streamruby": "tzag071jpe80",
//               "uploadever": "yc2y74o2c4jb",
//               "shrink": false,
//               "createdAt": "2024-02-16T06:10:59.008Z",
//               "updatedAt": "2024-02-16T06:10:59.008Z"
//           },
//           {
//               "objectId": "Dj9VaCNFLg",
//               "movieName": "The Marvels (2023)",
//               "rating": " 6.34",
//               "storyline": "Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But unintended consequences see Carol shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole linked to a Kree revolutionary, her powers become entangled with that of Jersey City super-fan Kamala Khan, aka Ms. Marvel, and Carol’s estranged niece, now S.A.B.E.R. astronaut Captain Monica Rambeau. Together, this unlikely trio must team up and learn to work in concert to save the universe.",
//               "poster": "https://www.themoviedb.org/t/p/original/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "i79pmvfenplk",
//               "filelions": "py0yra1ilzjf",
//               "streamruby": "7yi8mmgcr8xv",
//               "uploadever": "zkgc38yjrhy1",
//               "shrink": false,
//               "createdAt": "2024-02-08T02:45:48.993Z",
//               "updatedAt": "2024-02-08T02:45:48.993Z"
//           },
//           {
//               "objectId": "EPigKAEBfy",
//               "movieName": "Aquaman and the Lost Kingdom (2023)",
//               "rating": " 6.994",
//               "storyline": "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
//               "poster": "https://www.themoviedb.org/t/p/original/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/cnqwv5Uz3UW5f086IWbQKr3ksJr.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://shrinkus.tk/archives/7545",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "yb6wbivi31bm",
//               "filelions": "6otncqn89mql",
//               "streamruby": "ihogcpducdo4",
//               "uploadever": "jpg8wpt5nvfu",
//               "shrink": false,
//               "createdAt": "2024-02-02T03:58:43.947Z",
//               "updatedAt": "2024-02-02T03:58:43.947Z"
//           },
//           {
//               "objectId": "jD7sS4yB9e",
//               "movieName": "Fight Club (2023)",
//               "rating": " 0",
//               "storyline": "A young boy Selva chasing his football sports dreams suffers a major setback, grows into an angry young man who is drawn into conflicts by evil forces involving him and his family, which he must navigate and reform",
//               "poster": "https://www.themoviedb.org/t/p/original/1h6t9nCYVWOLRskB35K51payMok.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/nlDmuxSjJS1Fi2FgVToPm9ytm5S.jpg",
//               "category": "Tamil Telugu Hindi Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7542",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "8j9htpz01a94",
//               "filelions": "59y1nuhx2bgk",
//               "streamruby": "8qdo566hzrzi",
//               "uploadever": "8lbjas95ze4p",
//               "shrink": false,
//               "createdAt": "2024-01-29T05:46:59.403Z",
//               "updatedAt": "2024-01-29T05:46:59.403Z"
//           },
//           {
//               "objectId": "k98SQBx0cH",
//               "movieName": "Animal (2023)",
//               "rating": " 7.4",
//               "storyline": "A son undergoes a remarkable transformation as the bond with his father begins to fracture, and he becomes consumed by a quest for vengeance.",
//               "poster": "https://www.themoviedb.org/t/p/original/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg",
//               "backdrop": "https://2.showflixml.workers.dev/3:/photo_2024-01-26_07-58-47.jpg",
//               "category": "Tamil Telugu Hindi Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "hi",
//               "hdlink": "https://shrinkus.tk/archives/7540",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "sruq60jxx7y8",
//               "filelions": "3p5zr8oj6ldn",
//               "streamruby": "2mayku2brxs0",
//               "uploadever": "syoeymgpg60v",
//               "shrink": false,
//               "createdAt": "2024-01-26T02:30:17.029Z",
//               "updatedAt": "2024-01-26T02:30:17.029Z"
//           },
//           {
//               "objectId": "ioMF5BsoIT",
//               "movieName": "Sapta Sagaradaache Ello - Side B (2023)",
//               "rating": " 7.5",
//               "storyline": "Manu is released from prison and strives to rekindle his love with Priya.",
//               "poster": "https://www.themoviedb.org/t/p/original/7DIsSaRDmmyDViTwfl9RqV9zQTn.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/xYFkBEn8PqJBdQMD6jRzhBjW1nG.jpg",
//               "category": "Tamil Telugu Kannada Malayalam",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "kn",
//               "hdlink": "https://shrinkus.tk/archives/7538",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "6wmav3zcclwi",
//               "filelions": "jkybyi4kw9rr",
//               "streamruby": "3gt24wa2o412",
//               "uploadever": "x3dvoteil6wt",
//               "shrink": false,
//               "createdAt": "2024-01-26T02:12:10.834Z",
//               "updatedAt": "2024-01-26T02:12:10.834Z"
//           },
//           {
//               "objectId": "VtvNuylmBf",
//               "movieName": "Neru (2023)",
//               "rating": " 7.5",
//               "storyline": "'Neru' is an enthralling legal and emotional drama that delves into the life of Sara, a blind sculpture artist on a quest for justice following a harrowing incident.  Against the backdrop of the Indian legal system, this gripping story takes viewers through a rollercoaster of emotions, unveiling layers of deceit and ultimately exploring themes of redemption.",
//               "poster": "https://www.themoviedb.org/t/p/original/ktzJcMp4J1XssMgpZoQp0aFSrpC.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/w3RSl9I3fFn5Pg1PGDf1DUZPwX8.jpg",
//               "category": "Tamil Telugu Hindi Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ml",
//               "hdlink": "https://shrinkus.tk/archives/7536",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "q58sytydyt8y",
//               "filelions": "sgul5pc3leoi",
//               "streamruby": "1enom47oizyz",
//               "uploadever": "a206caz9ekoi",
//               "shrink": false,
//               "createdAt": "2024-01-23T04:21:06.846Z",
//               "updatedAt": "2024-01-23T04:21:06.846Z"
//           },
//           {
//               "objectId": "yYNKGRvPXn",
//               "movieName": "Salaar: Part 1 – Ceasefire (2023)",
//               "rating": " 6.9",
//               "storyline": "In the city of Khansaar, Raja Mannar plans to make his son, Vardharaja Mannar his successor, but Raja Mannar's ministers and advisors plan a coup d'état by hiring armies from Russia and Serbia to attack and kill Vardha and Raja. Vardha, along with his brother and a few trusted men, manage to escape from Khansaar. Vardha goes to his childhood best friend, Deva, who learns about his predicament and sets out to make him the undisputed successor of Khansaar.",
//               "poster": "https://www.themoviedb.org/t/p/original/47Qhmf5OySjG5QUcfVqzqzjpCS2.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/hOx2kPyniEHJj9wquzJMuStFFUG.jpg",
//               "category": "Tamil Telugu Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "te",
//               "hdlink": "https://shrinkus.tk/archives/7532",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "pwhixqnznkhm",
//               "filelions": "b4duqox3bag1",
//               "streamruby": "3qpc9tbql9ob",
//               "uploadever": "r2xwcs8977a1",
//               "shrink": false,
//               "createdAt": "2024-01-20T03:05:45.117Z",
//               "updatedAt": "2024-01-20T03:05:45.117Z"
//           },
//           {
//               "objectId": "Crm92yL9Pq",
//               "movieName": "The Abyss Rescue (2023)",
//               "rating": " 0",
//               "storyline": "When an American submarine sinks in the Caribbean, a US search and recovery team works with an oil platform crew, racing against Soviet vessels to recover the boat.",
//               "poster": "https://www.themoviedb.org/t/p/original/seaALXhaRkgH0QClmw2wXkaY33a.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/zphd91XtJCpzSxUdCgMVC1okhQg.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English Chinese",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "zh",
//               "hdlink": "https://shrinkus.tk/archives/7527",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "vhp1xl7d42gp",
//               "filelions": "j19z33tsj3ak",
//               "streamruby": "f8q3c5dahjz3",
//               "uploadever": "qrmfm9jxn8ib",
//               "shrink": false,
//               "createdAt": "2024-01-19T13:41:20.763Z",
//               "updatedAt": "2024-01-19T13:41:51.856Z"
//           },
//           {
//               "objectId": "cajb5YIOIr",
//               "movieName": "The Communion Girl (2023)",
//               "rating": " 6.169",
//               "storyline": "May, 1987. While returning from a nightclub and after having taken drugs, new girl in town Sara and her friend Rebe find a doll wearing a communion dress. From that moment, their lives will become a living hell.",
//               "poster": "https://www.themoviedb.org/t/p/original/n7h5qQErebTkp5YfbDxcu9sPxc8.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/zFi8k4xbWHwjHmFoWFTK4Dy7mMC.jpg",
//               "category": "Tamil Dubbed Telugu Hindi",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "es",
//               "hdlink": "https://shrinkus.tk/archives/7525",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "c7u3d3v2t2sd",
//               "filelions": "25u8ug66zq53",
//               "streamruby": "mu2uvau1pho3",
//               "uploadever": "eulwkn9ytlsm",
//               "shrink": false,
//               "createdAt": "2024-01-19T11:40:55.238Z",
//               "updatedAt": "2024-01-19T11:40:55.238Z"
//           },
//           {
//               "objectId": "waEjx37Kl0",
//               "movieName": "Veeman (2023)",
//               "rating": " 0",
//               "storyline": "The struggle between the tribal people and the corporate company.",
//               "poster": "https://www.themoviedb.org/t/p/original/8rXsPyhpytDOgs8Y072j4EjcnO7.jpg",
//               "backdrop": "https://2.showflixml.workers.dev/6:/photo_2024-01-19_10-03-57.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7520",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "abz61jlc8p1i",
//               "filelions": "4mgct232y3ix",
//               "streamruby": "zgj19xcayfzm",
//               "uploadever": "vt7cdsxmb86r",
//               "shrink": false,
//               "createdAt": "2024-01-19T04:35:42.333Z",
//               "updatedAt": "2024-01-19T04:35:42.333Z"
//           },
//           {
//               "objectId": "tgGgRgnecg",
//               "movieName": "Odavum Mudiyadhu Oliyavum Mudiyadhu (2023)",
//               "rating": " 0",
//               "storyline": "Odavum Mudiyathu Oliyavum Mudiyathu (lit. Can't Run, Can't Hide) is an upcoming Tamil horror action comedy film written and directed by debutant Ramesh Venkat and produced by Sathyamurthi. The film is cast from popular YouTube channels such as Eruma Saani and Madras Central.",
//               "poster": "https://www.themoviedb.org/t/p/original/gS79M88SZAR0k5VtilvlEJwyVEc.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/skP6HudavQdiS8y1Vo2yqEyggs0.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7518",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "8c9iwjrir86g",
//               "filelions": "zogz3y6lat9s",
//               "streamruby": "n7hffmvs9056",
//               "uploadever": "9m66yuvp3ule",
//               "shrink": false,
//               "createdAt": "2024-01-19T04:03:18.151Z",
//               "updatedAt": "2024-01-19T04:03:18.151Z"
//           },
//           {
//               "objectId": "Ez3rfrAUy0",
//               "movieName": "Extra Ordinary Man (2023)",
//               "rating": " 8",
//               "storyline": "Abhi, from his childhood, revels in the art of playing other people. His mother recognizes his extraordinary talent, propelling him into the world of acting. As he matures, he becomes a sought-after junior artist, always relegated to the background. The lines between reel and real life blur as Abhi faces a complex situation at home, with a supportive mother and a nagging and concerned father. A chance encounter with Likitha , the MD of a company, leads to love, and Abhi finds himself playing the role of a CEO. However, a conniving director presents an intriguing script, introducing Abhi to Nero, a self-absorbed and evil character with conquest on his mind.",
//               "poster": "https://www.themoviedb.org/t/p/original/bOym2XLkyDcYVvX5sZ6YYm19xXT.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/1wWGBVCT9GQYDDRthxz2KmqrgIA.jpg",
//               "category": "Tamil Telugu",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "te",
//               "hdlink": "https://shrinkus.tk/archives/7516",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "rc9a8uhxahy8",
//               "filelions": "ktz3legxbl6x",
//               "streamruby": "nssmfnea7k1y",
//               "uploadever": "0ktmf682y6z4",
//               "shrink": false,
//               "createdAt": "2024-01-19T03:40:06.836Z",
//               "updatedAt": "2024-01-19T03:40:06.836Z"
//           },
//           {
//               "objectId": "YbnqNXcHX3",
//               "movieName": "Joe (2023)",
//               "rating": " 0",
//               "storyline": "The movie revolves around the emotional roller coaster of love, laughter, friendships and heartbreaks in Joe`s life.",
//               "poster": "https://www.themoviedb.org/t/p/original/dfMnWgKdn2yN4ed3ExUizNnANSb.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/jGMNc2MqJ2mPdc4ceFvx1JvVKV5.jpg",
//               "category": "Tamil Telugu Kannada Malayalam",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7505",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "lm2wncnkhnak",
//               "filelions": "99zjk3z09dv1",
//               "streamruby": "5x1anchet866",
//               "uploadever": "m8wqf8lc8ymf",
//               "shrink": false,
//               "createdAt": "2024-01-15T02:29:29.937Z",
//               "updatedAt": "2024-01-15T02:29:29.937Z"
//           },
//           {
//               "objectId": "xEbRHwLKOV",
//               "movieName": "Devil (2023)",
//               "rating": " 9",
//               "storyline": "A British secret agent takes up the job of solving a dark mystery. He is led into a web of love, deceit and betrayal. His success and failure can change the course of history.",
//               "poster": "https://www.themoviedb.org/t/p/original/sF3CTnQlVypKJnXbdL0CurjZmym.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/r8geXuiUDhabjNaV9sZQf2TM3iZ.jpg",
//               "category": "Tamil Telugu",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "te",
//               "hdlink": "https://shrinkus.tk/archives/7503",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "4aglntrazkgk",
//               "filelions": "4i8vdenvdqwo",
//               "streamruby": "39xkejdkdo75",
//               "uploadever": "zocivwfnfaur",
//               "shrink": false,
//               "createdAt": "2024-01-14T09:22:48.085Z",
//               "updatedAt": "2024-01-14T09:22:48.085Z"
//           },
//           {
//               "objectId": "kS90ocdGKu",
//               "movieName": "Sila Nodigalil (2023)",
//               "rating": " 7",
//               "storyline": "What happens when your fate is messed up and you are trapped in your past?  When a married cosmetic surgeon Raj Varadhan from London falls in love with his model girlfriend Maya Pillai who accidentally dies due to drug overdose, his life takes him on an unexpected ride! Will he be able to hide his secrets from his wife Medha?",
//               "poster": "https://www.themoviedb.org/t/p/original/qPJ2vdnzAc6W7sJ5zGUJJUNspyF.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/h3yehz4IURNhKbKvJZV2EneKudN.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7500",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "vtybyjii59sv",
//               "filelions": "q6akfy4eux81",
//               "streamruby": "djjsvf7mqa21",
//               "uploadever": "a7dvkyvzdo14",
//               "shrink": false,
//               "createdAt": "2024-01-12T16:42:14.408Z",
//               "updatedAt": "2024-01-12T16:42:14.408Z"
//           },
//           {
//               "objectId": "xwCsmmXN8L",
//               "movieName": "Sevappi (2024)",
//               "rating": " 0",
//               "storyline": "A five year kid who lives in a remote village in Tamilnadu imagines that, he has given birth to a Chicken. His love towards the chicken is limitless. All limitless emotions and scenarios involving them have faced a rough road, likewise the impeccable love of this 5 year boy happens to be the root cause of a family dispute, which later turns out to be a caste issue and then finally an issue on which the entire village fights upon.",
//               "poster": "https://www.themoviedb.org/t/p/original/kDdiOgmMXmnjH8zwisJTpAzK6ho.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/dmLjdp0WXz1PHe3XOwPAguJt1ZW.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7498",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "pwh1kekuuqmm",
//               "filelions": "ugn7j6dwwpad",
//               "streamruby": "kl27498cfecw",
//               "uploadever": "yraaxhftq737",
//               "shrink": false,
//               "createdAt": "2024-01-12T13:44:29.006Z",
//               "updatedAt": "2024-01-12T13:44:29.006Z"
//           },
//           {
//               "objectId": "SvFPrIlxgk",
//               "movieName": "Lift (2024)",
//               "rating": " 10",
//               "storyline": "An international heist crew, led by Cyrus Whitaker, race to lift $500 million in gold from a passenger plane at 40,000 feet.",
//               "poster": "https://www.themoviedb.org/t/p/original/46sp1Z9b2PPTgCMyA87g9aTLUXi.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/rz8GGX5Id2hCW1KzAIY4xwbQw1w.jpg",
//               "category": "Tamil Dubbed Telugu English Hindi",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://shrinkus.tk/archives/7496",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "59eqve8wdic4",
//               "filelions": "1527qhptzsmh",
//               "streamruby": "77g71l4fpfrb",
//               "uploadever": "d426eujxf5l2",
//               "shrink": false,
//               "createdAt": "2024-01-12T12:29:06.130Z",
//               "updatedAt": "2024-01-12T12:29:06.130Z"
//           },
//           {
//               "objectId": "3n6Axkqd9N",
//               "movieName": "Tiger 3 (2023)",
//               "rating": " 6.3",
//               "storyline": "Following the events of Tiger Zinda Hai, War, and Pathaan, Avinash Singh Rathore returns as Tiger but this time the battle is within. He has to choose between his country or family as an old enemy is after his life, who claims that his family was killed by Tiger. He holds Tiger captive in Pakistan as the Indian agent's loyalty towards his country faces its biggest test.",
//               "poster": "https://www.themoviedb.org/t/p/original/8HOqipGorQ7eYDJk7UOkPa5lw8o.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/kqSxCsGIT4rqrZTTMpYP8RIzojv.jpg",
//               "category": "Tamil Telugu Hindi",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "hi",
//               "hdlink": "https://shrinkus.tk/archives/7482",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "lq3ba3g3y1he",
//               "filelions": "8ewu4nf8f6nv",
//               "streamruby": "zy44wzpia7n0",
//               "uploadever": "kel4herv87ki",
//               "shrink": false,
//               "createdAt": "2024-01-07T02:42:06.280Z",
//               "updatedAt": "2024-01-07T02:42:06.280Z"
//           },
//           {
//               "objectId": "OQ5DrRknQp",
//               "movieName": "A Savannah Haunting (2022)",
//               "rating": " 6.3",
//               "storyline": "Based on true events and filmed in the actual haunted house upon which the script is based, A Savannah Haunting is a chilling supernatural thriller about a family that is torn apart by evil forces inside their new home.",
//               "poster": "https://www.themoviedb.org/t/p/original/fpxmnwY9mQk05JVya6lsbvUm3mW.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/hg8J9cow8XaGUTuOcAsXzQye3jW.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://shrinkus.tk/archives/7463",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "0mbuck12xt2h",
//               "filelions": "7zcitrazfphe",
//               "streamruby": "qav9vm7ef5n7",
//               "uploadever": "wwwvm35nmv9u",
//               "shrink": false,
//               "createdAt": "2024-01-05T06:12:05.462Z",
//               "updatedAt": "2024-01-05T06:12:05.462Z"
//           },
//           {
//               "objectId": "Lj0REWHPWU",
//               "movieName": "Warhorse One (2023)",
//               "rating": " 7.15",
//               "storyline": "A gunned down Navy SEAL Master Chief must guide a child to safety through a gauntlet of hostile Taliban insurgents and survive the brutal Afghanistan wilderness.",
//               "poster": "https://www.themoviedb.org/t/p/original/jP2ik17jvKiV5sGEknMFbZv7WAe.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/csu96RxWGh2tReD9gYQRdUOSuUE.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://shrinkus.tk/archives/7458",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "n1663wdk5mdh",
//               "filelions": "zlnqx9xwytdw",
//               "streamruby": "hx6lsujtp8lg",
//               "uploadever": "x5ui7jdasz5n",
//               "shrink": false,
//               "createdAt": "2024-01-05T04:27:57.976Z",
//               "updatedAt": "2024-01-05T04:27:57.976Z"
//           },
//           {
//               "objectId": "W6HNMzPreM",
//               "movieName": "Expend4bles (2023)",
//               "rating": " 6.43",
//               "storyline": "Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.",
//               "poster": "https://www.themoviedb.org/t/p/original/iwsMu0ehRPbtaSxqiaUDQB9qMWT.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/rMvPXy8PUjj1o8o1pzgQbdNCsvj.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "en",
//               "hdlink": "https://shrinkus.tk/archives/7447",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "p4mtxl09v00l",
//               "filelions": "06atf6c1fj14",
//               "streamruby": "dqzc99p0rymg",
//               "uploadever": "sgfph7eevrrs",
//               "shrink": false,
//               "createdAt": "2024-01-05T03:22:25.334Z",
//               "updatedAt": "2024-01-05T03:22:25.334Z"
//           },
//           {
//               "objectId": "yXGMq2YLFh",
//               "movieName": "Conjuring Kannappan (2023)",
//               "rating": " 0",
//               "storyline": "A man begins to have nightmares where he experiences things in sleep have an effect on him in real life, too. But as his derangement spreads across his family and friends, they decide to go to the root of the cause.",
//               "poster": "https://www.themoviedb.org/t/p/original/rtyWDHQZElXYVETNZ4r8Wb6OZ2U.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/fr05I4wRXWNQY2rJcwg5TubBIrk.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7445",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "dwgnxe7ypshn",
//               "filelions": "q27mgvikdj5s",
//               "streamruby": "64qvxow2dlgx",
//               "uploadever": "i7usncr0w1rd",
//               "shrink": false,
//               "createdAt": "2024-01-04T19:07:05.542Z",
//               "updatedAt": "2024-01-04T19:07:05.542Z"
//           },
//           {
//               "objectId": "FLNs8VlycT",
//               "movieName": "Society of the Snow (2024)",
//               "rating": " 8.4",
//               "storyline": "On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby team to Chile, crashes into a glacier in the heart of the Andes.",
//               "poster": "https://www.themoviedb.org/t/p/original/k7rEpZfNPB35FFHB00ZhXHKTL7X.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/md848EEPm3dHZOqwGxxTVwH2vu5.jpg",
//               "category": "Tamil Dubbed Telugu Hindi English Spanish",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "es",
//               "hdlink": "https://shrinkus.tk/archives/7436",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "kw12rinveofb",
//               "filelions": "2hwpwxc2rv2s",
//               "streamruby": "7kt9zptodwil",
//               "uploadever": "15h4df0ssciw",
//               "shrink": false,
//               "createdAt": "2024-01-04T14:30:32.896Z",
//               "updatedAt": "2024-01-04T14:30:32.896Z"
//           },
//           {
//               "objectId": "hG64jGQFHQ",
//               "movieName": "Kaathal – The Core (2023)",
//               "rating": " 9",
//               "storyline": "Mathew Devassy, a retired bank manager decides to enter local panchayat elections. Unexpectedly, his wife Omana, shocks everyone by filing for divorce, claiming that Mathew is a homosexual.",
//               "poster": "https://www.themoviedb.org/t/p/original/klXnqglAUnAGG71EmQ3Z610gkDa.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/otwvq063nQCWVIBFg2kyHHcm2AP.jpg",
//               "category": "Tamil Telugu Hindi Kannada Malayalam",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ml",
//               "hdlink": "https://shrinkus.tk/archives/7433",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "ro0n1z6pwtkw",
//               "filelions": "i7vfawgeyfnu",
//               "streamruby": "4pdg6py2q5zw",
//               "uploadever": "ywua7k1lshbd",
//               "shrink": false,
//               "createdAt": "2024-01-04T04:01:58.730Z",
//               "updatedAt": "2024-01-04T04:01:58.730Z"
//           },
//           {
//               "objectId": "8FiAwpvC4g",
//               "movieName": "Hi Nanna (2023)",
//               "rating": " 7",
//               "storyline": "A single father begins to narrate the story of the missing mother to his child and nothing remains the same.",
//               "poster": "https://www.themoviedb.org/t/p/original/hhMLtq9m1aK0dpY9Wcq26XeDH2z.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/2vxKa3gMHc84O1iHRkslqeHSsxE.jpg",
//               "category": "Tamil",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "te",
//               "hdlink": "https://shrinkus.tk/archives/7431",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "6j2miw3gzw9s",
//               "filelions": "tjvwbmwcehum",
//               "streamruby": "ywuwn9t7u3se",
//               "uploadever": "vs33l2fto511",
//               "shrink": false,
//               "createdAt": "2024-01-04T02:12:54.846Z",
//               "updatedAt": "2024-01-04T02:12:54.846Z"
//           },
//           {
//               "objectId": "HfgP6G5UPJ",
//               "movieName": "Parking (2023)",
//               "rating": " 0",
//               "storyline": "Two men become involved in an argument over a parking space outside their apartment building.",
//               "poster": "https://www.themoviedb.org/t/p/original/xcKk5IILXOzAfY69lvKhhGcIt9J.jpg",
//               "backdrop": "https://www.themoviedb.org/t/p/original/rIOjUd2fUazYTcnEfGLgSjG8i4m.jpg",
//               "category": "Tamil Telugu Hindi Malayalam Kannada",
//               "streamlink": "https://embedsb.com/play/.html",
//               "language": "ta",
//               "hdlink": "https://shrinkus.tk/archives/7426",
//               "sharedisk": "",
//               "streamhide": "",
//               "streamwish": "fvyk5nddjtth",
//               "filelions": "shv2qjcw3zb9",
//               "streamruby": "us0797tefe74",
//               "uploadever": "hrujyze4z2dm",
//               "shrink": false,
//               "createdAt": "2023-12-30T02:20:56.320Z",
//               "updatedAt": "2023-12-30T02:21:45.785Z"
//           }
//       ]
  