import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message, ChatState } from './types';
import { Database, ArrowLeft, BarChart3, Calendar, DollarSign, Hotel, Users, Clock, Ban } from 'lucide-react';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: import.meta.env.VITE_COHERE_API_KEY || '',
});

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      if (!import.meta.env.VITE_COHERE_API_KEY) {
        throw new Error('Cohere API key is not configured');
      }

      const chatHistory = chatState.messages.map(msg => ({
        role: msg.role === 'user' ? 'USER' : 'CHATBOT',
        message: msg.content
      }));

      const response = await cohere.chat({
        message: content,
        temperature: 0.7,
        chatHistory,
        connectors: [{ id: "web-search" }],
        prompt_truncation: 'AUTO',
        stream: false,
        preamble: `You are a helpful hotel booking analytics assistant analyzing data from a comprehensive dataset of hotel bookings. The dataset includes information about hotel types (City Hotel and Resort Hotel), bookings, cancellations, guest demographics, length of stay, booking channels, and revenue metrics. Help users understand booking patterns, revenue trends, cancellation rates, and other key metrics. When providing answers, focus on clear, data-driven insights and relevant statistics from the hotel industry context.`,
      });

      if (!response.text) {
        throw new Error('No response received from Cohere');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Cohere API Error:', error);
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get response. Please try again.',
      }));
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-lg shadow-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <Hotel className="text-purple-400" size={24} />
            <h1 className="text-2xl font-bold text-white">Hotel Booking Analytics</h1>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Guests</p>
                <p className="text-xl font-bold text-white">2,450</p>
                <p className="text-xs text-purple-400">+12% this month</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <DollarSign className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="text-xl font-bold text-white">$156.8K</p>
                <p className="text-xs text-purple-400">+8% vs last week</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Clock className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg. Stay</p>
                <p className="text-xl font-bold text-white">3.8 days</p>
                <p className="text-xs text-purple-400">Based on last 30 days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Ban className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Cancellation Rate</p>
                <p className="text-xl font-bold text-white">8.2%</p>
                <p className="text-xs text-purple-400">-2% improvement</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col">
        <div className="flex-1 bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl border border-purple-500/20 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {chatState.messages.length === 0 ? (
              <div className="text-center space-y-4 py-12">
                <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Database className="text-purple-400" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome to Hotel Analytics Assistant</h2>
                  <p className="text-gray-400 mb-4">Ask questions about booking data, trends, and insights</p>
                  <div className="space-y-2 text-sm text-purple-400">
                    <p>"What's the average daily rate for city hotels?"</p>
                    <p>"Show me booking patterns during summer months"</p>
                    <p>"Compare cancellation rates between resort and city hotels"</p>
                  </div>
                </div>
              </div>
            ) : (
              chatState.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            {chatState.isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
              </div>
            )}
            {chatState.error && (
              <div className="text-red-400 text-center py-3 px-4 bg-red-900/20 rounded-lg border border-red-500/20">
                {chatState.error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSendMessage={handleSendMessage} isLoading={chatState.isLoading} />
        </div>
      </main>
    </div>
  );
}

export default App;