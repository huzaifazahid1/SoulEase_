"use client"

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiMessageCircle, FiX, FiSend, FiUser, FiBot } from 'react-icons/fi';
import { BiRocket, BiHeart, BiStar } from 'react-icons/bi';

const AssistantBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const buttonRef = useRef(null);
  const messagesRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      type: 'bot',
      text: 'Hey there! 👋 I\'m here to help answer any questions about our services!',
      time: '2:30 PM'
    },
    {
      id: 2,
      type: 'bot',
      text: 'Feel free to ask about our design process, development timeline, or anything else!',
      time: '2:30 PM'
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    // Initial button animation
    gsap.from(buttonRef.current, {
      scale: 0,
      duration: 0.5,
      delay: 1,
      ease: "back.out(1.7)"
    });

    // Floating animation for button
    gsap.to(buttonRef.current, {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      // Open chat animation
      gsap.set(chatRef.current, { display: 'block' });
      gsap.from(chatRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
        transformOrigin: "bottom right"
      });
    } else {
      // Close chat animation
      gsap.to(chatRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        transformOrigin: "bottom right",
        onComplete: () => {
          gsap.set(chatRef.current, { display: 'none' });
        }
      });
    }
  };

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(message),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('budget')) {
      return 'Our pricing depends on the project scope! Simple websites start at $2,500, while custom web apps range from $5,000-$15,000. Would you like to discuss your specific needs?';
    }
    
    if (msg.includes('timeline') || msg.includes('time') || msg.includes('long')) {
      return 'Great question! Most projects take 2-8 weeks depending on complexity. We\'ll give you a detailed timeline after understanding your requirements. What kind of project are you thinking about?';
    }
    
    if (msg.includes('contact') || msg.includes('call') || msg.includes('meeting')) {
      return 'I\'d love to connect you with our team! You can reach us at hello@dreamerstodoers.com or schedule a free consultation call. We usually respond within 24 hours!';
    }
    
    return 'That\'s a great question! I\'d love to connect you with our team who can give you a detailed answer. Feel free to reach out at hello@dreamerstodoers.com or ask me anything else!';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Interface */}
      <div
        className={`absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-primary-200/50 overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        style={{ maxHeight: '500px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FiUser className="text-lg" />
            </div>
            <div>
              <h3 className="font-semibold">Assistant</h3>
              <p className="text-xs text-primary-100">Usually replies in minutes</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
          >
            <FiX className="text-sm" />
          </button>
        </div>

        {/* Messages */}
        <div
          className="h-64 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-primary-50/30 to-accent-50/30"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white border border-primary-200 text-secondary-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  {msg.type === 'bot' && (
                    <FiUser className="text-primary-500 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-primary-100' : 'text-secondary-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-primary-200 text-secondary-800 px-4 py-2 rounded-2xl">
                <div className="flex items-center gap-2">
                  <FiUser className="text-primary-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-primary-200/50 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-primary-200 rounded-full focus:border-primary-400 focus:outline-none transition-colors duration-300"
            />
            <button
              onClick={sendMessage}
              disabled={message.trim() === ''}
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full flex items-center justify-center hover:from-primary-600 hover:to-accent-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FiSend className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full shadow-2xl hover:from-primary-600 hover:to-accent-600 transition-all duration-300 hover:scale-110 flex items-center justify-center relative overflow-hidden ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-ping opacity-20"></div>
        
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMessageCircle className="text-2xl" />
          )}
        </div>

        {/* Notification badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            <BiHeart className="text-sm" />
          </div>
        )}
      </button>

      {/* Quick Actions (when chat is closed) */}
      {!isOpen && (
        <div className="absolute bottom-20 right-0 space-y-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-primary-200 text-sm text-secondary-700 whitespace-nowrap">
            💬 Need help? Click to chat!
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistantBot;