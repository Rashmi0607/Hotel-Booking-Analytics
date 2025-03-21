import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-t border-purple-500/20 bg-gray-800/30">
      <div className="flex items-center gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about hotel bookings, revenue, trends..."
          className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-500/20 bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`p-3 rounded-xl ${
            isLoading || !input.trim() 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-purple-500 hover:bg-purple-600'
          } text-white transition-all duration-200 disabled:opacity-50`}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}