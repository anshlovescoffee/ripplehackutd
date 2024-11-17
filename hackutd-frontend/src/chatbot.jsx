// Chatbot.jsx
import React, { useState } from 'react';
import styles from './chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (userInput) => {
    const encodedPrompt = encodeURIComponent(userInput);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    try {
      const res = await fetch(`https://api.talkwith.tech/game-one?input_text=${encodedPrompt}`, requestOptions);
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { response: "Sorry, I'm having trouble connecting right now." };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    const userInput = input;
    setInput('');
    
    setIsLoading(true);
    
    try {
      const response = await callApi(userInput);
      setMessages(prev => [...prev, { 
        text: response.response || response, 
        sender: 'bot' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Sorry, something went wrong", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.chatbot} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Chat Assistant</h3>
          </div>

          <div className={styles.messageContainer}>
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className={styles.loading}>
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;