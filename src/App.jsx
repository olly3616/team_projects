import { useState } from 'react';
import StartScreen from './components/StartScreen';
import IdeaInput from './components/IdeaInput';
import TargetRecommend from './components/TargetRecommend';
import InterviewRoom from './components/InterviewRoom';
import Report from './components/Report';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [step, setStep] = useState(1);
  const [idea, setIdea] = useState({ name: '', desc: '', concern: '' });
  const [selectedTargets, setSelectedTargets] = useState([]);

  const nextStep = () => setStep((s) => s + 1);
  const reset = () => {
    setStep(1);
    setIdea({ name: '', desc: '', concern: '' });
    setSelectedTargets([]);
  };

  const steps = [
    { id: 1, label: '아이디어 입력' },
    { id: 2, label: '타깃 추천' },
    { id: 3, label: '타깃 선택' }, // We merge TargetRecommend and TargetSelection into one screen (Step 3). So effectively: 1: Start (no indicator), 2: Idea, 3: Recommend/Select, 4: Interview, 5: Report. Wait, the user said "1. 아이디어 입력 2. 타깃 추천 3. 타깃 선택 4. 멀티 인터뷰 5. 리포트". We can just represent them in the indicator.
    { id: 4, label: '멀티 인터뷰' },
    { id: 5, label: '리포트' }
  ];

  // Helper to map actual internal steps to indicator step.
  // Internal step:
  // 1: StartScreen
  // 2: IdeaInput (Indicator 1)
  // 3: TargetRecommend (Indicator 2 & 3)
  // 4: InterviewRoom (Indicator 4)
  // 5: Report (Indicator 5)

  const getIndicatorStep = () => {
    if (step === 2) return 1;
    if (step === 3) return 2; // Can highlight both 2 and 3 if needed, we'll just say 2
    if (step === 4) return 4;
    if (step === 5) return 5;
    return 0;
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 font-sans selection:bg-primary-500 selection:text-white flex flex-col">
      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setStep(1)}>
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]">
              P
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Persona Studio</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">AI-powered Customer Validation Room</p>
            </div>
          </div>

          {step > 1 && (
            <div className="hidden md:flex items-center space-x-6">
              {steps.map((s, idx) => {
                const currentInd = getIndicatorStep();
                const isActive = s.id === currentInd || (s.id === 3 && currentInd === 2); // Treat 2 and 3 together if needed
                const isPast = s.id < currentInd;
                return (
                  <div key={s.id} className="flex items-center">
                    <div className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-primary-500' : isPast ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="mr-2">{s.id}.</span>{s.label}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-4 border-t border-gray-700 ml-6"></div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col pt-20">
        <AnimatePresence mode="wait">
          {step === 1 && <StartScreen key="1" onNext={nextStep} />}
          {step === 2 && <IdeaInput key="2" onNext={nextStep} idea={idea} setIdea={setIdea} />}
          {step === 3 && <TargetRecommend key="3" onNext={nextStep} selectedTargets={selectedTargets} setSelectedTargets={setSelectedTargets} />}
          {step === 4 && <InterviewRoom key="4" onNext={nextStep} selectedTargets={selectedTargets} idea={idea} />}
          {step === 5 && <Report key="5" onReset={reset} selectedTargets={selectedTargets} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
