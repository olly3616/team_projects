import { motion } from 'framer-motion';
import { BarChart2, Users, AlertTriangle, CheckCircle, Target, HelpCircle, RotateCcw, Plus } from 'lucide-react';

export default function Report({ onReset, selectedTargets }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full relative pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="z-10 mb-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">인터뷰 요약 리포트</h2>
            <p className="text-gray-400 mt-1">AI가 분석한 고객 검증 인사이트 대시보드</p>
          </div>
        </div>
      </div>

      <div className="z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* 공통 니즈 */}
          <motion.div variants={itemVariants} className="bg-panel backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
            <div className="flex items-center mb-4 text-primary-400">
              <CheckCircle className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-bold">공통 니즈</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start"><span className="text-primary-500 mr-2 mt-1">•</span>식재료를 버리는 문제를 줄이고 싶어함</li>
              <li className="flex items-start"><span className="text-primary-500 mr-2 mt-1">•</span>유통기한 알림에 대한 필요성은 공통적으로 존재함</li>
              <li className="flex items-start"><span className="text-primary-500 mr-2 mt-1">•</span>앱 사용 과정이 복잡하지 않고 직관적이어야 한다는 요구가 강함</li>
            </ul>
          </motion.div>

          {/* 타깃별 반응 */}
          <motion.div variants={itemVariants} className="bg-panel backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center mb-6 text-white">
              <Users className="w-5 h-5 mr-2 text-gray-400" />
              <h3 className="text-lg font-bold">타깃별 반응 요약</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTargets.map(target => (
                <div key={target.id} className="bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center mb-2 space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${target.avatarColor}`}>
                      {target.avatarInitials}
                    </div>
                    <span className="font-bold text-gray-200">{target.name}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {target.name.includes("자취") ? "필요성은 느끼지만 직접 입력에 대한 부담이 커서 간편한 입력 방식을 선호함." :
                     target.name.includes("직장인") ? "자동화 기능(영수증 촬영 등)이 있다면 사용 가능성이 높으며 시간 절약을 중시함." :
                     target.name.includes("식단") ? "영양 정보와 식단 목표 연동에 관심이 높고, 입력 자체에 거부감이 적음." :
                     "공통 기능은 원하지만, 너무 복잡한 확장 기능에는 거부감을 보일 수 있음."}
                  </p>
                </div>
              ))}
              {selectedTargets.length === 0 && (
                <p className="text-sm text-gray-500">선택된 타깃이 없습니다.</p>
              )}
            </div>
          </motion.div>

          {/* 의견 충돌 & 핵심 장벽 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="bg-panel backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center mb-4 text-amber-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-bold">의견 충돌 지점</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-200">단순함 vs 고도화:</strong><br />
                일부 타깃은 단순한 알림 기능만을 선호하지만, 특정 타깃(식단관리 등)은 칼로리 연동 등 고도화된 기능을 원합니다.
              </p>
              <div className="bg-amber-900/20 border border-amber-500/20 p-3 rounded-lg text-amber-200/80 text-xs">
                👉 초기 MVP는 단순한 알림으로 시작하고, 고급 기능은 선택적 옵션으로 분리하는 것이 안전합니다.
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-panel backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center mb-4 text-rose-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-bold">핵심 장벽</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start"><span className="text-rose-500 mr-2 mt-1">-</span>식재료 직접 입력의 번거로움</li>
                <li className="flex items-start"><span className="text-rose-500 mr-2 mt-1">-</span>앱을 새로 설치하고 지속 접속해야 하는 부담</li>
                <li className="flex items-start"><span className="text-rose-500 mr-2 mt-1">-</span>기능이 많아질 경우 복잡하게 느껴질 가능성</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* 우선 공략 타깃 */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-900/40 to-panel backdrop-blur-xl border border-primary-500/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.1)]">
            <div className="flex items-center mb-4 text-white">
              <Target className="w-5 h-5 mr-2 text-primary-400" />
              <h3 className="text-lg font-bold">우선 공략 타깃</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              초기 MVP는 <strong className="text-primary-300">자취 대학생</strong>과 <strong className="text-primary-300">1인 가구 직장인</strong>을 우선 타깃으로 설정하는 것이 적절합니다. 두 그룹 모두 식재료 낭비 문제를 겪고 있으며, 단순한 알림 기능에 대한 니즈가 확인되었습니다.
            </p>
          </motion.div>

          {/* 다음 인터뷰 질문 */}
          <motion.div variants={itemVariants} className="bg-panel backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center mb-4 text-white">
              <HelpCircle className="w-5 h-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-bold">다음 인터뷰 추천 질문</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="bg-black/30 p-3 rounded-lg border border-white/5">식재료를 직접 입력해야 한다면 어느 정도(빈도, 방식)까지 허용 가능한가요?</li>
              <li className="bg-black/30 p-3 rounded-lg border border-white/5">유통기한 알림은 푸시 알림, 위젯 중 어떤 방식이 편한가요?</li>
              <li className="bg-black/30 p-3 rounded-lg border border-white/5">자동 등록 기능(영수증 스캔 등)이 있다면 유료 구독할 의향이 있나요?</li>
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants} className="mt-12 flex justify-center space-x-4">
        <button 
          onClick={onReset}
          className="flex items-center px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white font-medium transition-colors"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          다시 인터뷰하기
        </button>
        <button 
          onClick={onReset}
          className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-500 shadow-[0_0_20px_rgba(225,29,72,0.4)] rounded-xl text-white font-bold transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          새 아이디어 검증하기
        </button>
      </motion.div>
    </motion.div>
  );
}
