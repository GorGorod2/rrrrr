
import React, { useState, useEffect, useRef } from 'react';
import { User, UserLevel, Question, ChatMessage, Block, LevelData, BlockProgress } from './types';
import { CURRICULUM } from './data/curriculum';
import { getGeminiHelp, getMotivation, getHintForMistake } from './services/geminiService';
import { 
  BookOpen, 
  Brain, 
  ChevronRight, 
  LogIn, 
  UserPlus, 
  Send, 
  CheckCircle, 
  XCircle,
  HelpCircle, 
  ArrowLeft, 
  Lock,
  Play,
  Lightbulb,
  MapPin,
  BarChart2,
  TrendingUp,
  AlertCircle,
  Loader2,
  Check
} from 'lucide-react';

// --- Authentication ---
const AuthScreen: React.FC<{ onLogin: (username: string, email?: string) => void }> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username, isRegistering ? email : undefined);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-indigo-100">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">LinguaAI</h1>
          <p className="text-indigo-500 font-medium mt-2">Твой путь к свободному английскому</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition font-medium"
              placeholder="Как к вам обращаться?"
              required
            />
          </div>
          
          {isRegistering && (
            <div className="animate-fade-in-down">
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition font-medium"
                placeholder="hello@example.com"
                required={isRegistering}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:translate-y-[-2px] flex items-center justify-center gap-2 mt-6"
          >
            {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
            {isRegistering ? 'Начать обучение' : 'Продолжить путь'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-bold hover:underline"
          >
            {isRegistering ? 'Уже есть аккаунт? Войти' : 'Впервые у нас? Создать аккаунт'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Diagnostic Test Data ---
const DIAGNOSTIC_QUESTIONS = [
  { q: "I ___ a student.", options: ["am", "is", "are"], answer: "am", level: UserLevel.A1 },
  { q: "Yesterday I ___ to the park.", options: ["go", "went", "gone"], answer: "went", level: UserLevel.A2 },
  { q: "If it rains, I ___ stay home.", options: ["would", "will", "had"], answer: "will", level: UserLevel.B1 },
  { q: "I have been living here ___ 2010.", options: ["since", "for", "from"], answer: "since", level: UserLevel.B1 },
  { q: "She is interested ___ music.", options: ["on", "in", "at"], answer: "in", level: UserLevel.A2 }
];

// --- Diagnostic Test ---
const DiagnosticScreen: React.FC<{ onComplete: (level: UserLevel) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (option: string) => {
    const isCorrect = option === DIAGNOSTIC_QUESTIONS[step].answer;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);
    
    if (step < DIAGNOSTIC_QUESTIONS.length - 1) {
      setStep(s => s + 1);
    } else {
      // Finish
      finishTest(newScore);
    }
  };

  const finishTest = (finalScore: number) => {
    setIsAnalyzing(true);
    // Determine level
    let level = UserLevel.A1;
    if (finalScore >= 4) level = UserLevel.B1;
    else if (finalScore >= 2) level = UserLevel.A2;

    // Simulate AI thinking time for "Personalizing Path"
    setTimeout(() => {
        onComplete(level);
    }, 2000);
  };

  if (isAnalyzing) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-gray-800">Создаем персональную карту...</h2>
              <p className="text-gray-500 mt-2">Анализируем ваши ответы и адаптируем сложность</p>
          </div>
      )
  }

  const currentQ = DIAGNOSTIC_QUESTIONS[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        <Brain className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Определяем ваш уровень</h2>
        <p className="text-gray-500 mb-8">Ответьте на несколько вопросов, чтобы мы построили персональную карту обучения.</p>
        
        <div className="mb-6">
           <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((step + 0.5)/DIAGNOSTIC_QUESTIONS.length)*100}%` }}
              ></div>
           </div>
           
           <h3 className="text-2xl font-medium mb-8 text-gray-800 leading-relaxed">
             {currentQ.q.split('___').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="inline-block w-16 border-b-2 border-indigo-500 mx-2 relative top-1"></span>
                  )}
                </React.Fragment>
             ))}
           </h3>

           <div className="space-y-3">
             {currentQ.options.map(opt => (
               <button
                 key={opt}
                 onClick={() => handleAnswer(opt)}
                 className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 font-bold transition-all text-left text-gray-700"
               >
                 {opt}
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Analytics Widget ---
const AnalyticsWidget: React.FC<{ user: User }> = ({ user }) => {
  // Calculate stats
  let totalAnswered = 0;
  let totalMistakes = 0;
  let completedBlocks = 0;

  Object.values(user.progress).forEach((p: BlockProgress) => {
    totalAnswered += p.currentQuestionIndex;
    totalMistakes += p.mistakes;
    if (p.isCompleted) completedBlocks++;
  });

  const accuracy = totalAnswered > 0 
    ? Math.round(((totalAnswered - totalMistakes) / totalAnswered) * 100) 
    : 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
       <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
         <BarChart2 className="text-indigo-600" size={20} />
         Мой прогресс
       </h3>
       <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Точность</div>
            <div className="text-2xl font-bold text-indigo-700">{accuracy}%</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Блоки</div>
            <div className="text-2xl font-bold text-green-700">{completedBlocks}</div>
          </div>
       </div>
       
       <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
          <span className="font-bold block mb-1">Рекомендация:</span> 
          {accuracy < 70 ? 
            "Попробуйте перепройти сложные темы. Не бойтесь ошибаться!" : 
            "Отличный темп! Продолжайте двигаться вперед по карте."}
       </div>
    </div>
  );
};

// --- Learning Map Component ---
const LearningMap: React.FC<{ 
  user: User; 
  onSelectBlock: (level: LevelData, block: Block) => void;
  onLogout: () => void;
}> = ({ user, onSelectBlock, onLogout }) => {
  const [dailyQuote, setDailyQuote] = useState("Loading motivation...");

  useEffect(() => {
    getMotivation(user.username).then(setDailyQuote);
  }, [user.username]);

  // Determine unlocked status based on recommended level or previous completions
  const isLevelUnlocked = (levelId: UserLevel) => {
    // Basic logic
    if (levelId === UserLevel.A1) return true;
    
    // Check recommendation
    const levels = [UserLevel.A1, UserLevel.A2, UserLevel.B1];
    const recIdx = levels.indexOf(user.diagnosticResult?.recommendedLevel || UserLevel.A1);
    const currIdx = levels.indexOf(levelId);
    
    // Unlocked if recommended level is same or higher
    if (currIdx <= recIdx) return true;
    
    // Or if previous level is completed (simplified: checking if any progress exists in current level implies previous done in this demo context)
    // In a real app we'd check strict completion of previous level blocks.
    const prevLevel = levels[currIdx - 1];
    const prevBlocks = CURRICULUM.find(l => l.id === prevLevel)?.blocks || [];
    const allPrevDone = prevBlocks.every(b => {
        const key = `${prevLevel}_${b.id}`;
        // Completed explicitly OR implied by diagnostic level
        const impliedDone = (currIdx - 1) < recIdx;
        return user.progress[key]?.isCompleted || impliedDone;
    });

    return allPrevDone;
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Navbar */}
       <nav className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 rounded-lg p-1">
               <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-gray-800">LinguaAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                {user.diagnosticResult?.recommendedLevel || 'A1'}
            </span>
            <button onClick={onLogout} className="text-sm text-red-500 font-medium hover:text-red-700">Выйти</button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Map */}
        <div className="md:col-span-2 space-y-8 relative">
           
           {/* Quote Card */}
           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <h2 className="font-bold text-lg mb-1">Welcome back, {user.username}!</h2>
              <p className="text-indigo-100 text-sm italic">"{dailyQuote}"</p>
           </div>

           {/* The Path */}
           <div className="relative pl-8 md:pl-0">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-[2.25rem] top-4 bottom-0 w-1 bg-gray-200 z-0"></div>

              {CURRICULUM.map((level, levelIdx) => {
                 const unlocked = isLevelUnlocked(level.id);
                 
                 // Diagnostic check: Is this level considered "mastered" by the placement test?
                 // e.g. if I am B1, then A1 and A2 are "assessed as done"
                 const levelsArr = [UserLevel.A1, UserLevel.A2, UserLevel.B1];
                 const recIdx = levelsArr.indexOf(user.diagnosticResult?.recommendedLevel || UserLevel.A1);
                 const currIdx = levelsArr.indexOf(level.id);
                 const isAssessedPassed = currIdx < recIdx;

                 return (
                    <div key={level.id} className="relative z-10 mb-12">
                       {/* Level Marker */}
                       <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 shadow-sm bg-white transition-colors
                             ${unlocked ? 'border-indigo-600 text-indigo-700' : 'border-gray-300 text-gray-400'}
                             ${isAssessedPassed ? 'bg-indigo-50 border-indigo-300' : ''}
                          `}>
                             {isAssessedPassed ? <Check size={24} className="text-indigo-600" /> : <span className="font-bold text-lg">{level.id}</span>}
                          </div>
                          <div>
                             <h3 className={`text-xl font-bold ${unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                                {level.title}
                                {isAssessedPassed && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Сдано</span>}
                             </h3>
                             <p className="text-gray-500 text-sm">{level.description}</p>
                          </div>
                       </div>

                       {/* Blocks */}
                       <div className="space-y-4 ml-4 md:ml-12">
                          {level.blocks.map((block, blockIdx) => {
                             const blockKey = `${level.id}_${block.id}`;
                             const progress = user.progress[blockKey];
                             
                             // A block is completed if user finished it OR if placement test surpassed this level
                             const isCompleted = progress?.isCompleted || isAssessedPassed;
                             const isActive = progress && !isCompleted && progress.currentQuestionIndex > 0;
                             
                             // Lock logic
                             let blockLocked = !unlocked;
                             if (unlocked && !isAssessedPassed && blockIdx > 0) {
                                // If inside current level, enforce sequential order
                                const prevBlockKey = `${level.id}_${level.blocks[blockIdx-1].id}`;
                                if (!user.progress[prevBlockKey]?.isCompleted) blockLocked = true;
                             }

                             return (
                                <button
                                   key={block.id}
                                   disabled={blockLocked}
                                   onClick={() => onSelectBlock(level, block)}
                                   className={`w-full group relative flex items-center bg-white rounded-xl p-4 shadow-sm border-2 text-left transition-all
                                      ${blockLocked 
                                         ? 'border-gray-100 opacity-60 cursor-not-allowed' 
                                         : 'border-transparent hover:border-indigo-200 hover:shadow-md cursor-pointer'
                                      }
                                      ${isActive ? 'border-indigo-500 ring-4 ring-indigo-50' : ''}
                                      ${isCompleted ? 'border-green-200 bg-green-50/30' : ''}
                                   `}
                                >
                                   {/* Connector Line Horizontal */}
                                   <div className="absolute -left-4 md:-left-12 top-1/2 w-4 md:w-8 h-1 bg-gray-200"></div>

                                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 mr-4 transition-colors
                                      ${isCompleted ? 'bg-green-500 text-white' : 
                                        isActive ? 'bg-indigo-600 text-white' :
                                        blockLocked ? 'bg-gray-100 text-gray-400' : 'bg-indigo-100 text-indigo-600'}
                                   `}>
                                      {isCompleted ? <CheckCircle size={24} /> : 
                                       blockLocked ? <Lock size={20} /> : 
                                       isActive ? <Play size={20} fill="currentColor" /> : <MapPin size={24} />}
                                   </div>

                                   <div className="flex-1">
                                      <h4 className={`font-bold ${blockLocked ? 'text-gray-400' : 'text-gray-800'}`}>
                                         {block.title}
                                      </h4>
                                      <p className="text-xs text-gray-500">{block.description}</p>
                                      
                                      {/* Mini Progress Bar inside card */}
                                      {isActive && (
                                         <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                                            <div 
                                               className="bg-indigo-500 h-full rounded-full" 
                                               style={{ width: `${(progress.currentQuestionIndex / block.questions.length) * 100}%` }}
                                            ></div>
                                         </div>
                                      )}
                                      
                                      {isCompleted && (
                                          <div className="mt-1 text-xs font-medium text-green-600 flex items-center gap-1">
                                              <CheckCircle size={10} /> {isAssessedPassed ? 'Зачтено тестом' : 'Выполнено'}
                                          </div>
                                      )}
                                   </div>

                                   {!blockLocked && !isCompleted && (
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600">
                                         <ChevronRight />
                                      </div>
                                   )}
                                </button>
                             );
                          })}
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>

        {/* Right Column: Analytics & Info */}
        <div className="md:col-span-1">
           <div className="sticky top-24">
              <AnalyticsWidget user={user} />
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="text-purple-600" size={20} />
                    Траектория
                 </h3>
                 <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Ваш персональный план адаптирован под уровень <strong className="text-indigo-600">{user.diagnosticResult?.recommendedLevel || 'A1'}</strong>. 
                    Система автоматически зачла предыдущие темы, чтобы вы не тратили время.
                 </p>
                 <div className="space-y-3 pt-2 border-t border-gray-100">
                     <div className="flex items-start gap-2 text-xs text-gray-500">
                        <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                        <span>Начальные темы скрыты или отмечены как пройденные</span>
                     </div>
                     <div className="flex items-start gap-2 text-xs text-gray-500">
                        <Brain size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                        <span>Сложность растет по мере вашего прогресса</span>
                     </div>
                 </div>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};

// --- Exercise Component (Updated for Blocks) ---
const ExerciseView: React.FC<{
  level: LevelData;
  block: Block;
  initialIndex: number;
  onBack: () => void;
  onProgressUpdate: (index: number, isCompleted: boolean, mistook: boolean) => void;
  user: User;
}> = ({ level, block, initialIndex, onBack, onProgressUpdate, user }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  
  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [aiThinking, setAiThinking] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const safeIndex = Math.min(currentQuestionIndex, block.questions.length - 1);
  const currentQuestion = block.questions[safeIndex];
  const isLastQuestion = safeIndex === block.questions.length - 1;

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
    setAiHint(null);
  }, [currentQuestionIndex]);

  const handleCheck = async () => {
    const normalize = (s: string) => s.trim().toLowerCase();
    
    if (normalize(userAnswer) === normalize(currentQuestion.correctAnswer)) {
      setFeedback('correct');
      setAiHint(null);
    } else {
      setFeedback('incorrect');
      setIsHintLoading(true);
      
      // Update mistakes count in parent
      onProgressUpdate(currentQuestionIndex, false, true);

      const hint = await getHintForMistake(currentQuestion, userAnswer);
      setAiHint(hint);
      setIsHintLoading(false);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Autosave position
      onProgressUpdate(nextIndex, false, false);
    } else {
      // Completed block
      onProgressUpdate(currentQuestionIndex + 1, true, false);
      onBack();
    }
  };

  const askAI = async (customPrompt?: string) => {
    const promptText = customPrompt || inputMessage;
    if (!promptText.trim()) return;

    const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: promptText };
    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
    setAiThinking(true);

    const response = await getGeminiHelp(currentQuestion, userAnswer, promptText);

    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: response };
    setMessages(prev => [...prev, aiMsg]);
    setAiThinking(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col p-4 md:p-6 h-screen overflow-y-auto">
        <button onClick={onBack} className="self-start flex items-center text-gray-500 hover:text-indigo-600 mb-4 transition font-medium">
          <ArrowLeft size={20} className="mr-1" /> Карта обучения
        </button>

        <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl shadow-xl overflow-hidden flex-1 flex flex-col min-h-[500px] max-h-[800px] border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white flex justify-between items-center">
            <div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">{level.title}</div>
              <h2 className="text-xl font-bold">{block.title}</h2>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-right">
                  <div className="text-xs text-indigo-200">Прогресс</div>
                  <div className="font-bold">{safeIndex + 1} / {block.questions.length}</div>
               </div>
               <div className="w-12 h-12 relative">
                  <svg className="w-full h-full transform -rotate-90">
                     <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-indigo-500 opacity-30" />
                     <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={125} 
                        strokeDashoffset={125 - (125 * (safeIndex / block.questions.length))} 
                        className="text-white transition-all duration-500" />
                  </svg>
               </div>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col justify-center">
            <span className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 self-start">
              Topic: {currentQuestion.topic}
            </span>
            
            <h3 className="text-2xl md:text-3xl font-medium text-gray-800 mb-10 leading-relaxed">
              {currentQuestion.question.split('___').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className={`inline-block border-b-2 px-2 mx-2 text-center font-bold text-2xl transition-colors min-w-[4rem]
                        ${feedback === 'correct' ? 'border-green-500 text-green-600' : 
                          feedback === 'incorrect' ? 'border-red-500 text-red-600' : 'border-indigo-300 text-indigo-600'}
                    `}>
                      {userAnswer || "?"}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h3>

            {currentQuestion.type === 'multiple-choice' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                        setUserAnswer(opt);
                        if(feedback === 'incorrect') setFeedback(null);
                    }}
                    className={`p-5 rounded-2xl border-2 text-left transition-all font-medium text-lg relative
                      ${userAnswer === opt 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md transform scale-[1.02]' 
                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-600'
                      }
                      ${feedback === 'correct' && userAnswer === opt ? '!bg-green-100 !border-green-500 !text-green-900' : ''}
                      ${feedback === 'incorrect' && userAnswer === opt ? '!bg-red-50 !border-red-500 !text-red-900' : ''}
                    `}
                    disabled={feedback === 'correct'}
                  >
                    {opt}
                    {feedback === 'correct' && userAnswer === opt && <CheckCircle className="absolute top-1/2 -translate-y-1/2 right-4 text-green-600" />}
                    {feedback === 'incorrect' && userAnswer === opt && <XCircle className="absolute top-1/2 -translate-y-1/2 right-4 text-red-600" />}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                    setUserAnswer(e.target.value);
                    if(feedback === 'incorrect') setFeedback(null);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && userAnswer) handleCheck();
                }}
                placeholder="Type your answer..."
                className={`w-full p-5 text-xl border-2 rounded-2xl outline-none transition-colors shadow-sm
                  ${feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-900' : 
                    feedback === 'incorrect' ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50'}
                `}
                disabled={feedback === 'correct'}
              />
            )}

            {(isHintLoading || aiHint) && feedback !== 'correct' && (
                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 animate-fade-in shadow-sm">
                    <div className="bg-amber-100 p-2 rounded-full shrink-0">
                      <Lightbulb className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-800 text-sm mb-1">AI Подсказка</h4>
                      <div className="text-amber-900 leading-relaxed">
                          {isHintLoading ? "Анализирую вашу ошибку..." : aiHint}
                      </div>
                    </div>
                </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
             <button
              onClick={() => {
                if (!chatOpen) setChatOpen(true);
                askAI("Please explain this grammar rule to me.");
              }}
              className="text-gray-600 hover:text-indigo-600 hover:bg-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition border border-transparent hover:border-gray-200 hover:shadow-sm"
            >
              <HelpCircle size={20} />
              <span className="hidden sm:inline">Объяснить правило</span>
            </button>

            {feedback === 'correct' ? (
                 <div className="flex items-center gap-4 animate-fade-in">
                    <div className="hidden sm:flex items-center gap-2 font-bold text-green-600 bg-green-100 px-4 py-2 rounded-lg">
                       <CheckCircle size={18} />
                       Верно!
                    </div>
                    <button
                      onClick={handleNext}
                      className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                    >
                      {isLastQuestion ? 'Завершить блок' : 'Далее'} <ChevronRight size={20} />
                    </button>
                  </div>
            ) : (
               <button
                onClick={handleCheck}
                disabled={!userAnswer}
                className={`px-10 py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 text-white flex items-center gap-2
                    ${feedback === 'incorrect' ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed'}
                `}
              >
                {feedback === 'incorrect' ? 'Попробовать снова' : 'Проверить'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col border-l border-gray-100
        ${chatOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="bg-gray-900 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
               <Brain className="text-white" size={18} />
            </div>
            <div>
               <h3 className="font-bold text-sm">AI Репетитор</h3>
               <p className="text-xs text-gray-400">Всегда готов помочь</p>
            </div>
          </div>
          <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white transition">
            <XCircle size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {aiThinking && (
             <div className="flex justify-start">
               <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex gap-1">
                 <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
               </div>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); askAI(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Задайте вопрос..."
              className="flex-1 bg-gray-100 border-transparent focus:bg-white border-2 focus:border-indigo-500 rounded-xl px-4 py-3 outline-none transition-all text-sm"
            />
            <button 
              type="submit" 
              disabled={!inputMessage.trim() || aiThinking}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition shadow-md hover:shadow-lg"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Main App Controller ---
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSession, setActiveSession] = useState<{level: LevelData, block: Block} | null>(null);

  const handleLogin = (username: string, email?: string) => {
    // In a real app, load from DB. Here we simulate new user.
    setUser({ 
        username, 
        email, 
        isLoggedIn: true, 
        progress: {} 
    });
  };

  const handleDiagnosticComplete = (recommendedLevel: UserLevel) => {
    if (!user) return;
    setUser({
      ...user,
      diagnosticResult: {
        completed: true,
        recommendedLevel,
        score: 0 // Simplification
      }
    });
  };

  const handleBlockSelect = (level: LevelData, block: Block) => {
      setActiveSession({ level, block });
  };

  const handleUpdateProgress = (blockId: string, levelId: string, index: number, isCompleted: boolean, mistook: boolean) => {
      if (!user) return;
      const key = `${levelId}_${blockId}`;
      const currentProgress = user.progress[key] || { currentQuestionIndex: 0, isCompleted: false, mistakes: 0 };
      
      setUser({
          ...user,
          progress: {
              ...user.progress,
              [key]: {
                  currentQuestionIndex: index,
                  isCompleted: isCompleted || currentProgress.isCompleted,
                  mistakes: mistook ? (currentProgress.mistakes + 1) : currentProgress.mistakes
              }
          }
      });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSession(null);
  };

  // 1. Not logged in
  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // 2. Logged in, but no diagnostic taken yet
  if (!user.diagnosticResult) {
    return <DiagnosticScreen onComplete={handleDiagnosticComplete} />;
  }

  // 3. In active exercise session
  if (activeSession) {
    const { level, block } = activeSession;
    const progressKey = `${level.id}_${block.id}`;
    
    // Autosave Resume Logic:
    // If completed, we let them review (start at 0) or implementation choice. 
    // If in progress, resume at index.
    const savedIndex = user.progress[progressKey]?.isCompleted 
        ? 0 
        : (user.progress[progressKey]?.currentQuestionIndex || 0);

    return (
      <ExerciseView 
        user={user} 
        level={level}
        block={block}
        initialIndex={savedIndex}
        onBack={() => setActiveSession(null)} 
        onProgressUpdate={(idx, completed, mistook) => handleUpdateProgress(block.id, level.id, idx, completed, mistook)}
      />
    );
  }

  // 4. Dashboard (Map)
  return (
    <LearningMap 
      user={user} 
      onSelectBlock={handleBlockSelect} 
      onLogout={handleLogout} 
    />
  );
}
