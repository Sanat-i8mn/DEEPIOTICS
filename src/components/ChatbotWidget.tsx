import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotWidgetProps {
  customerName?: string;
  customerId?: string;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ 
  customerName = "Guest", 
  customerId = "guest_user" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    email: '',
    phone: ''
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate session ID on component mount
  useEffect(() => {
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load greeting when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0 && userDetails) {
      loadGreeting();
    }
  }, [isOpen, userDetails]);

  const loadGreeting = async () => {
    // Mock greeting response for development
    const mockGreeting = `Hello ${userDetails?.name || customerName}! 👋 Welcome to Deepiotics AI Support. I'm here to help you with any questions about our AI development services. How can I assist you today?`;
    
    const greetingMessage: Message = {
      id: `greeting_${Date.now()}`,
      text: mockGreeting,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([greetingMessage]);
  };

  const sendMessageToAPI = async (message: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://31.97.235.117:8080/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          message,
          session_id: sessionId,
          customer_id: "deepiotics"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response to messages
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: data.response || "I apologize, but I couldn't process your request at the moment. Please try again.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      // Silently handle API errors and provide helpful fallback responses
      const fallbackResponse = getFallbackResponse(message);

      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // AI Development Services
    if (message.includes('ai development') || message.includes('custom ai') || message.includes('machine learning')) {
      return "🤖 **AI Development Services**\n\nDeepiotics specializes in custom AI development including:\n\n• Custom Machine Learning Models\n• AI-Powered Chatbots & Virtual Assistants\n• Intelligent Document Processing\n• Predictive Business Analytics\n\nWe've helped 500+ companies achieve 300% efficiency gains. Would you like to schedule a free AI strategy session?\n\n📅 **Book a call:** https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire";
    }
    
    // AI Agents
    if (message.includes('ai agent') || message.includes('lead generation') || message.includes('sales automation')) {
      return "🎯 **AI Agents for Sales & Marketing**\n\nOur AI agents can transform your business:\n\n• **Lead Generation:** 300% increase in qualified leads\n• **Sales Automation:** 24/7 intelligent customer engagement\n• **Marketing Analytics:** Real-time insights and optimization\n• **Customer Segmentation:** Hyper-targeted campaigns\n\nAverage client results: 85% reduction in customer acquisition cost!\n\n📞 **Get a demo:** Contact our AI experts at ai-experts@deepiotics.com";
    }
    
    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
      return "💰 **AI Development Investment**\n\nOur pricing is customized based on your specific needs:\n\n• **Starter AI Solutions:** From $10,000\n• **Enterprise AI Systems:** $50,000+\n• **Custom AI Development:** Quote-based\n\n✅ **Guaranteed ROI within 6 months**\n✅ **Free strategy session included**\n\nLet's discuss your project: https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire";
    }
    
    // Contact/Support
    if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return "📞 **Contact Our AI Experts**\n\n• **Email:** ai-experts@deepiotics.com\n• **Phone:** +919826324365\n• **Office:** Atulya IT Park, Indore, MP 452016, India\n\n🗓️ **Schedule a free consultation:**\nhttps://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire\n\nOur team typically responds within 2 hours during business hours.";
    }
    
    // About/Company
    if (message.includes('about') || message.includes('company') || message.includes('deepiotics')) {
      return "🏢 **About Deepiotics**\n\nLeading AI development company with:\n\n• **10+ years** of AI expertise\n• **1000+ AI solutions** deployed\n• **50+ expert team** members\n• **25+ countries** served\n• **$50M+ client savings** achieved\n\nTrusted by Fortune 500 companies for enterprise AI development.\n\n🎯 **Our Mission:** Transform businesses through intelligent AI solutions that deliver measurable ROI.";
    }
    
    // Case Studies/Results
    if (message.includes('case study') || message.includes('results') || message.includes('success')) {
      return "📊 **Proven AI Success Stories**\n\n🏭 **Manufacturing:** 87% defect reduction, $4.2M savings\n🏥 **Healthcare:** 96% diagnostic accuracy, 58% faster diagnosis\n🏦 **Finance:** 99.2% fraud detection, $12.5M losses prevented\n\nAverage client results:\n• 300% efficiency improvement\n• 45% cost reduction\n• 6-month ROI guarantee\n\n📈 **See full case studies:** Contact us for detailed success stories in your industry.";
    }
    
    // Greeting/General
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.length < 10) {
      return "👋 **Welcome to Deepiotics!**\n\nI'm here to help you discover how AI can transform your business. We're a leading AI development company specializing in:\n\n🤖 Custom AI Development\n🎯 AI Agents & Automation\n📊 Machine Learning Solutions\n🔧 Enterprise AI Integration\n\nHow can I assist you today? Ask me about:\n• AI development services\n• Pricing and ROI\n• Case studies and results\n• Scheduling a consultation";
    }
    
    // Default response
    return "🤖 **Thanks for your question!**\n\nWhile our AI system is temporarily unavailable, I'd love to help you learn about Deepiotics' AI development services.\n\n**Popular topics:**\n• Custom AI development and machine learning\n• AI agents for sales and marketing\n• Pricing and ROI information\n• Success stories and case studies\n\n📞 **For immediate assistance:**\n• Email: ai-experts@deepiotics.com\n• Phone: +919826324365\n• Free consultation: https://calendly.com/researchmentorclinic1/ai-strategy-call-pre-call-questionnaire\n\nWhat specific AI solution are you interested in?";
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.phone.trim()) {
      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot-submit`;

        await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }),
        });
      } catch (error) {
        console.error("Failed to submit user data:", error);
      }

      setUserDetails(formData);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    const messageToSend = inputMessage;
    setInputMessage('');

    // Send to API
    await sendMessageToAPI(messageToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Box */}
      {isOpen && (
        <div className="absolute bottom-16 md:bottom-20 right-0 w-80 sm:w-96 md:w-[420px] h-96 sm:h-[450px] md:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold text-sm md:text-base">Deepiotics AI Assistant</h3>
            </div>
            <button
              onClick={closeChat}
              className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/10 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
            {!userDetails ? (
              /* User Details Form */
              <div className="flex items-center justify-center h-full">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-full max-w-sm">
                  <div className="text-center mb-6">
                    <Bot className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Deepiotics AI</h3>
                    <p className="text-sm text-gray-600">Please provide your details to start the conversation</p>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Start Conversation
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.isUser
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area - Only show when user details are provided */}
          {userDetails && (
            <div className="p-3 md:p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-blue-600 text-white p-2.5 md:p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Button */}
      <div className="relative group">
        <button
          onClick={toggleChat}
          className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        >
          {isOpen ? (
            <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Bot className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
          )}
        </button>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs md:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Deepiotics AI Bot
            <div className="absolute top-full right-1/2 transform translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotWidget;