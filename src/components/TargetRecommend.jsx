import { motion } from 'framer-motion';
import { Target, Check, ArrowRight } from 'lucide-react';
import { dummyTargets } from '../data';

export default function TargetRecommend({ onNext, selectedTargets, setSelectedTargets }) {
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const toggleTarget = (target) => {
    if (selectedTargets.find(t => t.id === target.id)) {
      setSelectedTargets(selectedTargets.filter(t => t.id !== target.id));
    } else {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="z-10 mb-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold text-white">이 아이디어는 이런 타깃에게 먼저 물어볼 수 있어요</h2>
        </div>
        <p className="text-gray-400 text-lg">인터뷰를 진행할 페르소나를 선택해주세요. (복수 선택 가능)</p>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {dummyTargets.map((target) => {
          const isSelected = selectedTargets.some(t => t.id === target.id);
          return (
            <motion.div 
              key={target.id}
              variants={cardVariants}
              onClick={() => toggleTarget(target)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 border backdrop-blur-xl ${
                isSelected 
                  ? 'bg-primary-900/20 border-primary-500 shadow-[0_0_20px_rgba(225,29,72,0.2)] transform -translate-y-2' 
                  : 'bg-panel border-white/10 hover:bg-white/[0.05] hover:-translate-y-1'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg ${target.avatarColor}`}>
                {target.avatarInitials}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{target.name}</h3>
              <p className="text-sm text-gray-400 mb-4 h-16">{target.description}</p>
              
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">추천 이유</p>
                  <p className="text-xs text-gray-300">{target.reason}</p>
                </div>
                
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">주요 관심사</p>
                  <div className="flex flex-wrap gap-1">
                    {target.interests.map((interest, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-primary-400 uppercase tracking-wider mb-1">예상 검증 포인트</p>
                  <p className="text-xs text-primary-100/80">{target.point}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="z-10 flex justify-center mt-auto pb-10">
        <button 
          onClick={onNext}
          disabled={selectedTargets.length === 0}
          className={`flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            selectedTargets.length > 0
              ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_40px_rgba(225,29,72,0.6)]' 
              : 'bg-panel text-gray-500 cursor-not-allowed border border-white/10'
          }`}
        >
          선택한 타깃({selectedTargets.length}명)으로 인터뷰 시작하기 <ArrowRight className="ml-2 w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}
