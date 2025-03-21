import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
        isUser ? 'bg-purple-500' : 'bg-gray-700'
      }`}>
        {isUser ? <MessageCircle size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
      </div>
      <div className={`flex-1 px-6 py-4 rounded-xl ${
        isUser 
          ? 'bg-purple-500 text-white' 
          : 'bg-gray-800/70 text-gray-100 border border-purple-500/20'
      }`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span className="text-xs opacity-70 block mt-2">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </span>
      </div>
    </div>
  );
}