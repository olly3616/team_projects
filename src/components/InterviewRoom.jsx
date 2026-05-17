import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Bot } from 'lucide-react';
import { dummyChatSequence } from '../data';

export default function InterviewRoom({ onNext, selectedTargets, idea }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSequenceStarted, setChatSequenceStarted] = useState(false);
  const chatEndRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 'sys-1',
        isSystem: true,
        text: `선택한 페르소나들이 인터뷰룸에 입장했습니다. "${idea.name || '아이디어'}"에 대해 궁금한 점을 질문해보세요.`
      }
    ]);
  }, [idea.name]);

  useEffect(() => {
    // Scroll to bottom when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMsg = {
      id: `user-${Date.now()}`,
      isUser: true,
      text: inputValue
    };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    
    // Trigger dummy sequence if not yet started
    if (!chatSequenceStarted) {
      setChatSequenceStarted(true);
      startDummySequence();
    }
  };

  const startDummySequence = () => {
    let delay = 600;
    
    dummyChatSequence.forEach((item, index) => {
      // 선택된 페르소나들을 순서대로 돌아가면서 할당하여 대화가 겹치지 않게 합니다.
      const mappedTarget = selectedTargets[index % selectedTargets.length];

      setTimeout(() => {
        setIsTyping(true);
      }, delay - 300);

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: `ai-${Date.now()}-${index}`,
          isAi: true,
          target: mappedTarget,
          text: item.message
        }]);
      }, delay);
      
      // 답변 속도를 훨씬 빠르게 조정
      delay += 1500 + Math.random() * 500; 
    });
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col p-4 md:p-6 max-w-5xl mx-auto w-full h-[calc(100vh-80px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top Header - Persona Chips */}
      <div className="bg-panel backdrop-blur-xl border border-white/10 rounded-t-2xl p-4 flex items-center overflow-x-auto no-scrollbar space-x-4">
        <div className="flex-shrink-0 flex items-center space-x-2 text-primary-400 font-medium px-4 py-2 bg-primary-900/20 rounded-lg border border-primary-500/30">
          <Bot className="w-5 h-5" />
          <span>참여 중인 페르소나</span>
        </div>
        <div className="flex space-x-3">
          {selectedTargets.map(target => (
            <div key={target.id} className="flex items-center space-x-2 bg-black/40 border border-white/5 rounded-full px-3 py-1.5 flex-shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${target.avatarColor}`}>
                {target.avatarInitials}
              </div>
              <span className="text-sm text-gray-300 font-medium">{target.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-black/60 border-x border-white/10 overflow-y-auto p-6 space-y-6 relative custom-scrollbar">
        {messages.map((msg) => {
          if (msg.isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-6">
                <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-sm text-gray-400 text-center shadow-lg">
                  {msg.text}
                </div>
              </div>
            );
          }

          if (msg.isUser) {
            return (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex justify-end mb-4"
              >
                <div className="max-w-[70%] bg-primary-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-[0_4px_20px_rgba(225,29,72,0.3)]">
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            );
          }

          if (msg.isAi) {
            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex justify-start mb-4 space-x-3"
              >
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold shadow-md mt-1 ${msg.target.avatarColor}`}>
                  {msg.target.avatarInitials}
                </div>
                <div className="max-w-[70%]">
                  <span className="text-xs text-gray-400 ml-1 mb-1 block font-medium">{msg.target.name}</span>
                  <div className="bg-panel border border-white/10 text-gray-200 rounded-2xl rounded-tl-sm px-5 py-3 shadow-lg">
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          }
          return null;
        })}
        
        {isTyping && (
          <div className="flex justify-start mb-4 space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gray-800 flex-shrink-0 flex items-center justify-center text-gray-500 shadow-md mt-1">
              <Bot className="w-5 h-5" />
            </div>
            <div className="max-w-[70%]">
              <span className="text-xs text-gray-500 ml-1 mb-1 block font-medium">답변 작성 중...</span>
              <div className="bg-panel border border-white/10 rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg flex space-x-2 items-center h-[52px]">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-panel backdrop-blur-xl border border-white/10 rounded-b-2xl p-4 flex items-center space-x-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="페르소나들에게 질문을 입력하세요..."
          className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="p-3 bg-primary-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500 transition-colors shadow-[0_0_15px_rgba(225,29,72,0.3)]"
        >
          <Send className="w-6 h-6" />
        </button>
        <div className="w-px h-8 bg-white/10 mx-2"></div>
        <button
          onClick={onNext}
          className="flex items-center px-5 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white font-medium transition-colors"
        >
          <FileText className="w-5 h-5 mr-2" />
          리포트 생성하기
        </button>
      </div>
    </motion.div>
  );
}
