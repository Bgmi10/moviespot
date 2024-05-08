import React, { useState, useEffect } from 'react';
import { Widget, toggleWidget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ChatbotLogo from '../../src/img/botgif.gif';
import nlp from 'compromise';
import { tamilmovies } from '../utils/constans';





const handleMovieQuery = (movieTitle) => {
  const movie = tamilmovies.find((movie) => movie.title.toLowerCase() === movieTitle.toLowerCase());

  if (movie) {
    const response = `Title: ${movie.title}\nOverview: ${movie.overview}\nDownload Link: ${movie.download_link}`;
    return response;
  } else {
    return "Movie not found. Can I suggest some other movies?";
  }
};

const handleChatbotQuery = async (doc) => {
  if (doc.text().toLowerCase().includes('hello') || doc.text().toLowerCase().includes('hi')) {
    return "Hello! How can I help you today?";
  } else if (doc.text().toLowerCase().includes('recommend some movies') || doc.verbs().out('array').includes('recommend')) {
    try {
      const searchTerm = doc.match('#Noun').out('text');
      if (!searchTerm) {
        return "I'm sorry, I couldn't understand your movie preference. Can you provide more details?";
      }

      const movieTitles = tamilmovies.map((movie) => movie.title);
      return `Here are some movies related to '${searchTerm}': ${movieTitles.join(', ')}`;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return "Sorry, something went wrong while fetching movie data.";
    }
  } else if (
    doc.text().toLowerCase().includes('how are you') ||
    doc.text().toLowerCase().includes("what's up") ||
    doc.text().toLowerCase().includes('how are you doing') ||
    doc.text().toLowerCase().includes('how do you feel') ||
    doc.text().toLowerCase().includes('are you okay') ||
    doc.text().toLowerCase().includes('how are you today')
  ) {
    const responses = [
      "I'm just a bot, but thanks for asking! How can I assist you today?",
      "I'm here to help! What can I do for you?",
      "I'm doing well, thanks! How can I assist you today?",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse;
  } else if (
    doc.text().toLowerCase().includes('site owner') ||
    doc.text().toLowerCase().includes('owner') ||
    doc.text().toLowerCase().includes('contact owner') ||
    doc.text().toLowerCase().includes('need help') ||
    doc.text().toLowerCase().includes('help') ||
    doc.text().toLowerCase().includes('support') ||
    doc.text().toLowerCase().includes('customer care')
  ) {
    return "If you need to contact the site owner, please send an email to subashchandraboseravi45@gmail.com";
  } else {
    return "I'm sorry, I didn't understand. Can you please be more specific?";
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    addResponseMessage("Hello! How can I assist you today?");
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);

    const doc = nlp(newMessage);
    const response =
      doc.has('#Noun') && doc.has('movie')
        ? await handleMovieQuery(doc.match('#Noun').out('text'))
        : await handleChatbotQuery(doc);

    addResponseMessage(response);
  };

  const toggleChatbot = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    toggleWidget();
  };

  return (
    <div className="fixed bottom-4 md:bottom-8 lg:bottom-12 right-4 z-50 items-center bg-colour-black">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        onClick={toggleChatbot}
        title="Chatbot"
        titleAvatar={ChatbotLogo}
        subtitle="Ask me about movies, recommendations."
      />
    </div>
  );
};

export default Chatbot;

// <!-- HTML !-->
// <button class="button-85" role="button">Button 85</button>

// /* CSS */
// .button-85 {
//   padding: 0.6em 2em;
//   border: none;
//   outline: none;
//   color: rgb(255, 255, 255);
//   background: #111;
//   cursor: pointer;
//   position: relative;
//   z-index: 0;
//   border-radius: 10px;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
// }

// .button-85:before {
//   content: "";
//   background: linear-gradient(
//     45deg,
//     #ff0000,
//     #ff7300,
//     #fffb00,
//     #48ff00,
//     #00ffd5,
//     #002bff,
//     #7a00ff,
//     #ff00c8,
//     #ff0000
//   );
//   position: absolute;
//   top: -2px;
//   left: -2px;
//   background-size: 400%;
//   z-index: -1;
//   filter: blur(5px);
//   -webkit-filter: blur(5px);
//   width: calc(100% + 4px);
//   height: calc(100% + 4px);
//   animation: glowing-button-85 20s linear infinite;
//   transition: opacity 0.3s ease-in-out;
//   border-radius: 10px;
// }

// @keyframes glowing-button-85 {
//   0% {
//     background-position: 0 0;
//   }
//   50% {
//     background-position: 400% 0;
//   }
//   100% {
//     background-position: 0 0;
//   }
// }

// .button-85:after {
//   z-index: -1;
//   content: "";
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: #222;
//   left: 0;
//   top: 0;
//   border-radius: 10px;
// } 
