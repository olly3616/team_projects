import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function IdeaInput({ onNext, idea, setIdea }) {
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const isFormValid = idea.name.trim() !== '' && idea.desc.trim() !== '';

  return (
    <motion.div 
      className="flex-1 flex flex-col items-center justify-center p-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="z-10 w-full max-w-2xl bg-panel backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold text-white">검증하고 싶은 아이디어를 알려주세요</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">아이디어 이름</label>
            <input 
              type="text" 
              value={idea.name}
              onChange={(e) => setIdea({ ...idea, name: e.target.value })}
              placeholder="예: 나만의 냉장고 식재료 관리 앱" 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">아이디어 설명</label>
            <textarea 
              value={idea.desc}
              onChange={(e) => setIdea({ ...idea, desc: e.target.value })}
              placeholder="예: 혼자 사는 대학생을 위한 냉장고 식재료 관리 앱입니다. 유통기한 알림을 주고 남은 재료로 레시피를 추천해줍니다." 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all h-32 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">현재 고민되는 점 (선택)</label>
            <textarea 
              value={idea.concern}
              onChange={(e) => setIdea({ ...idea, concern: e.target.value })}
              placeholder="예: 사람들이 정말 귀찮음을 감수하고 재료를 입력할까요?" 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all h-24 resize-none"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button 
            onClick={onNext}
            disabled={!isFormValid}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isFormValid 
                ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
            }`}
          >
            타깃 추천받기 <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
