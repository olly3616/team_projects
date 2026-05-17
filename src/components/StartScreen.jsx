import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Users, MessageSquare, BarChart } from 'lucide-react';

export default function StartScreen({ onNext }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    { icon: <Lightbulb className="w-6 h-6" />, title: "1. 아이디어 입력", desc: "검증하고 싶은 아이디어를 상세히 적어보세요." },
    { icon: <Users className="w-6 h-6" />, title: "2. 타깃 추천", desc: "AI가 가장 적합한 인터뷰 타깃들을 추천합니다." },
    { icon: <MessageSquare className="w-6 h-6" />, title: "3. 멀티 인터뷰", desc: "여러 페르소나가 모인 라운지에서 대화하세요." },
    { icon: <BarChart className="w-6 h-6" />, title: "4. 비교 리포트", desc: "인터뷰 내용을 바탕으로 인사이트를 얻으세요." }
  ];

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Gradient & Glow Effects */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="z-10 max-w-4xl w-full text-center mt-12">
        <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-sm text-primary-400 text-sm font-semibold tracking-wide">
          스타트업 / 창업 아이디어 검증 도구
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-white drop-shadow-2xl">
          당신의 아이디어,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
            어떤 고객에게 먼저 물어봐야 할까요?
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
          AI가 타깃을 추천하고, 여러 페르소나가 함께 대화하며<br className="hidden md:block" />
          가장 빠르고 정확하게 고객 반응을 검증합니다.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <button 
            onClick={onNext}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-primary-600 rounded-lg hover:bg-primary-500 hover:shadow-[0_0_40px_rgba(225,29,72,0.6)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              검증 시작하기 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <motion.div variants={itemVariants} className="z-10 w-full max-w-6xl mt-24 mb-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-panel backdrop-blur-xl border border-white/5 p-6 rounded-2xl hover:bg-white/[0.03] transition-colors border-t-white/10 group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-primary-400 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
