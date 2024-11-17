// Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './chatbot.module.css';
import frontierImage from './frontier.png';
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef(null);

  const callApi = async (userInput) => {
    const encodedPrompt = encodeURIComponent(userInput);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_text: encodedPrompt
      })
    };

    console.log('Request Options:', requestOptions);

    try {
      const res = await fetch(`http://127.0.0.1:5000/chat?input_text=${encodedPrompt}`, requestOptions);
      console.log('Response Status:', res.status);

      if (!res.ok) {
        console.error('Response Error:', res.statusText);
        throw new Error('Something went wrong');
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        console.log('Response Data:', data);
        return data;
      } else {
        const textData = await res.text();
        console.log('Response Text:', textData);
        return { response: textData };
      }
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

  const fetchInitialMessage = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/chat-one');
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      setMessages([{ text: data.response, sender: 'bot' }]);
    } catch (error) {
      setMessages([{ text: "Hi! Thanks for talking to Frontier, we're always here to help with any issues!", sender: 'bot' }]);
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      fetchInitialMessage();
    }
  }, [isOpen]);

  return (
    <div>
<a href="https://frontier.com" target="_blank" rel="noopener noreferrer">
  <img src={frontierImage} alt="Frontier" className="logo" />
</a>
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

            <div className={styles.messageContainer} ref={messageContainerRef}>
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
    </div>
  );
}

export default Chatbot;