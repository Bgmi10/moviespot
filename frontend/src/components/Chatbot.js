import React, { useState, useEffect } from 'react';
import { Widget, toggleWidget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import nlp from 'compromise';
import { tamilmovies } from '../utils/constans';
import './customchatbot.css'




const handleMovieQuery = ({movieTitle}) =>{
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
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
       
        onClick={toggleChatbot}
        title="Chatbot"
        //titleAvatar={}
        subtitle="Ask me about movies, recommendations."
       
        
        
      />
    
    </div>
  );
};

export default Chatbot;
