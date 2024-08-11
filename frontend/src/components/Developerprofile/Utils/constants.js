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

export const  projects = [
    {
      title: 'Mid-Scale E-Commerce (Freelancing )',
      description: `Currently developing a small-scale Progressive Web App (PWA) for a client, with a focus on enhancing user experience and streamlining e-commerce operations. The project is approximately 70% complete, with production deployment anticipated by the end of the month. ...
  
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
    },
    {
      title: 'Food ordering PWA using swiggy api ',
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
    },
    {
      title: 'Movie Spot using TMDB official api ',
      description: `🎬 Excited to unveil MOVIE SPOT, a cutting-edge movie web app! 🚀 Crafted with React.js, Tailwind CSS, and Firebase Auth, it boasts features like voice recognition, extreme UX, and code-splitting for optimal performance.
  
      🔍 Dynamic Search Functionality: Explore a vast collection of movies with our powerful search feature. Effortlessly find your favorite films or discover new ones using our intuitive search bar. We've integrated advanced search capabilities for a seamless and efficient user experience.
      
      📱🖥️ Responsive Design: Enjoy a tailored experience on any device! MOVIE SPOT's responsive design ensures a consistent and visually stunning interface, whether you're using a smartphone, tablet, or desktop. The UI adapts for optimal user experience and image quality.
      
      🌐 Varied UI for LG Screens: For large screens like LG monitors, we've crafted a unique user interface to maximize the viewing experience. Enjoy enhanced image quality and an interface designed for your LG screen's dimensions.
      
      🎥 YouTube API for Trailers: Dive deeper into movie details with integrated YouTube trailers. Get a sneak peek before deciding on your next cinematic adventure, all within the app.
      
      ⚙️ React Hooks for Superior UX: Utilizing React hooks, we've fine-tuned every interaction to ensure a smooth and enjoyable user experience. From transitions to real-time updates, each detail contributes to the overall satisfaction of our users.
      
      🚧 Upcoming Features: Stay tuned for exciting developments! We're working on seamless authentication to enhance user profiles and personalized experiences. The journey doesn't end here — more features are on the horizon!
      
      Join us on MOVIE SPOT for an unparalleled movie-watching journey. 🍿✨`,
      imageUrl: [moviespot , moviespot1 , moviespot2 , moviespot3 , moviespot4 , moviespot5 ],
    },
  ];



  export const opensourceprojects = [
    {
        title: '',
        description: `Currently developing a small-scale Progressive Web App (PWA) for a client, with a focus on enhancing user experience and streamlining e-commerce operations. The project is approximately 70% complete, with production deployment anticipated by the end of the month. ...
    
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
      }

  ]