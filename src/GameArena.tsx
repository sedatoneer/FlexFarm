import { useState, useEffect, useRef } from 'react';
import { levels, type Animal } from './data/levels';
import confetti from 'canvas-confetti';
import { useGameFx } from './hooks/useGameFx';

// ==========================================
// COLORS
// ==========================================
const Colors = {
  red: { bg: "#fca5a5", accent: "#b91c1c", roof: "#ef4444" },
  blue: { bg: "#93c5fd", accent: "#1e3a8a", roof: "#3b82f6" },
  yellow: { bg: "#fde047", accent: "#a16207", roof: "#eab308" },
  default: { bg: "#e2e8f0", accent: "#64748b", roof: "#94a3b8" }
};

// ==========================================
// ICONS & UI ELEMENTS
// ==========================================
const Icons = {
  Help: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  Book: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Trash: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Refresh: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>,
  Plus: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Check: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  
  FarmLogo: () => (
    <div className="flex items-center gap-2 select-none">
      <div className="w-10 h-10 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <rect x="20" y="30" width="60" height="50" rx="20" fill="white" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 25 35 Q 35 35 35 45 Q 35 55 25 55 Z" fill="#334155" />
          <path d="M 75 60 Q 65 60 65 70 Q 65 80 75 80 Z" fill="#334155" />
          <rect x="30" y="20" width="40" height="35" rx="12" fill="white" stroke="#94a3b8" strokeWidth="2" />
          <rect x="35" y="40" width="30" height="12" rx="6" fill="#fda4af" />
          <circle cx="40" cy="32" r="3" fill="#334155" />
          <circle cx="60" cy="32" r="3" fill="#334155" />
          <path d="M 32 52 Q 50 62 68 52" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="50" cy="58" r="4" fill="#fbbf24" stroke="#64748b" strokeWidth="1" />
        </svg>
      </div>
      <h1 className="font-extrabold text-xl text-slate-800 tracking-tight leading-none">
        Flex<span className="text-green-600">Farm</span>
      </h1>
    </div>
  ),

  ArrowRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  ArrowLeft: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Play: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>,
  Trophy: () => <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-3 9h6l-3-9zm0 0l3 9h-6l3-9zm0 18c-3.3 0-6-2.7-6-6h12c0 3.3-2.7 6-6 6zm-8-9h16v2H4v-2z"/></svg>,
  Close: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Github: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  Linkedin: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  Instagram: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
};

// ==========================================
// ANIMAL & WEB ELEMENTS (SVG)
// ==========================================

const CuteFarmer = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <ellipse cx="50" cy="25" rx="32" ry="10" fill="#d97706" />
    <rect x="25" y="50" width="50" height="40" rx="15" fill="#ef4444" />
    <path d="M 30 100 L 30 65 L 35 50 L 65 50 L 70 65 L 70 100 Z" fill="#2563eb" />
    <rect x="40" y="60" width="20" height="15" rx="3" fill="#1d4ed8" opacity="0.4" />
    <circle cx="50" cy="40" r="16" fill="#fca5a5" />
    <path d="M 35 42 Q 50 65 65 42" fill="#f1f5f9" />
    <circle cx="44" cy="38" r="2" fill="#1e293b" />
    <circle cx="56" cy="38" r="2" fill="#1e293b" />
    <path d="M 32 25 Q 50 5 68 25" fill="#f59e0b" />
    <path d="M 20 25 Q 50 38 80 25" fill="none" stroke="#d97706" strokeWidth="2" />
  </svg>
);

const CuteSheep = ({ color }: { color: string }) => {
  const c = Colors[color as keyof typeof Colors] || Colors.default;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <circle cx="50" cy="50" r="35" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="30" cy="40" r="15" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="70" cy="40" r="15" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="50" cy="25" r="15" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="50" cy="75" r="15" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="50" cy="55" r="18" fill="#334155" />
      <circle cx="43" cy="52" r="3" fill="white" />
      <circle cx="57" cy="52" r="3" fill="white" />
      <rect x="35" y="80" width="6" height="12" rx="3" fill="#334155" />
      <rect x="59" y="80" width="6" height="12" rx="3" fill="#334155" />
      <path d="M 40 68 L 60 68 L 50 76 Z" fill={c.accent} stroke="white" strokeWidth="1"/>
      <circle cx="50" cy="68" r="3" fill={c.accent} stroke="white" strokeWidth="1"/>
    </svg>
  );
};

const CuteCow = ({ color }: { color: string }) => {
  const c = Colors[color as keyof typeof Colors] || Colors.default;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <rect x="20" y="30" width="60" height="50" rx="20" fill="white" stroke="#94a3b8" strokeWidth="2" />
      <path d="M 25 35 Q 35 35 35 45 Q 35 55 25 55 Z" fill="#334155" />
      <path d="M 75 60 Q 65 60 65 70 Q 65 80 75 80 Z" fill="#334155" />
      <rect x="30" y="20" width="40" height="35" rx="12" fill="white" stroke="#94a3b8" strokeWidth="2" />
      <rect x="35" y="40" width="30" height="12" rx="6" fill="#fda4af" />
      <circle cx="40" cy="32" r="3" fill="#334155" />
      <circle cx="60" cy="32" r="3" fill="#334155" />
      <path d="M 32 52 Q 50 62 68 52" fill="none" stroke={c.accent} strokeWidth="5" strokeLinecap="round"/>
      <circle cx="50" cy="58" r="4" fill="#fbbf24" stroke={c.accent} strokeWidth="1" />
    </svg>
  );
};

const CuteDuck = ({ color }: { color: string }) => {
  const c = Colors[color as keyof typeof Colors] || Colors.default;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <circle cx="50" cy="55" r="28" fill="#fde047" stroke="#eab308" strokeWidth="2" />
      <path d="M 55 60 Q 70 70 75 55" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      <circle cx="42" cy="45" r="2" fill="#334155" />
      <circle cx="58" cy="45" r="2" fill="#334155" />
      <path d="M 42 55 Q 50 62 58 55" fill="#f97316" />
      <path d="M 30 30 Q 50 10 70 30" fill={c.accent} stroke="white" strokeWidth="1"/>
      <circle cx="50" cy="20" r="4" fill="white" />
    </svg>
  );
};

const CuteGoat = ({ color }: { color: string }) => {
  const c = Colors[color as keyof typeof Colors] || Colors.default;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <rect x="25" y="35" width="50" height="40" rx="10" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
      <rect x="30" y="20" width="35" height="40" rx="12" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
      <path d="M 45 60 L 50 70 L 55 60" fill="#cbd5e1" />
      <path d="M 35 25 L 25 10" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <path d="M 60 25 L 70 10" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="38" r="2" fill="#334155" />
      <circle cx="54" cy="38" r="2" fill="#334155" />
      <rect x="35" y="50" width="25" height="5" fill={c.accent} />
    </svg>
  );
};

// --- WEB SITE ICONS ---
const WebLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <rect x="5" y="30" width="90" height="40" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="2" />
    <circle cx="25" cy="50" r="12" fill="white" stroke="#94a3b8" strokeWidth="1" />
    <path d="M 20 52 Q 25 55 30 52" fill="none" stroke="#fda4af" strokeWidth="3" strokeLinecap="round" />
    <circle cx="22" cy="48" r="1.5" fill="#334155" />
    <circle cx="28" cy="48" r="1.5" fill="#334155" />
    <text x="42" y="55" fontSize="11" fill="#1e293b" fontWeight="900">Flex</text>
    <text x="64" y="55" fontSize="11" fill="#16a34a" fontWeight="900">Farm</text>
  </svg>
);

const WebLink = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <rect x="10" y="30" width="80" height="40" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
    <rect x="20" y="45" width="60" height="10" rx="5" fill="#cbd5e1" />
  </svg>
);

const WebProfile = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <circle cx="50" cy="50" r="45" fill="#f472b6" />
    <circle cx="50" cy="40" r="15" fill="white" />
    <path d="M 25 75 Q 50 60 75 75" fill="white" />
  </svg>
);

const AnimalRenderer = ({ type, color }: { type: string, color: string }) => {
  switch (type) {
    case 'sheep': return <CuteSheep color={color} />;
    case 'cow': return <CuteCow color={color} />;
    case 'duck': return <CuteDuck color={color} />;
    case 'farmer': return <CuteFarmer />;
    case 'goat': return <CuteGoat color={color} />;
    case 'logo': return <WebLogo />;
    case 'link': return <WebLink />;
    case 'profile': return <WebProfile />;
    default: return <CuteSheep color={color} />;
  }
};

// ==========================================
// CHEATSHEET DATA
// ==========================================
const CheatsheetData = {
  'justify-content': [
    { code: 'flex-start', desc: 'Sola/Başa yaslar' },
    { code: 'flex-end', desc: 'Sağa/Sona yaslar' },
    { code: 'center', desc: 'Ortalar' },
    { code: 'space-between', desc: 'Uçlara iter' },
    { code: 'space-around', desc: 'Eşit boşluk bırakır' }
  ],
  'align-items': [
    { code: 'flex-start', desc: 'Üste yaslar' },
    { code: 'flex-end', desc: 'Alta yaslar' },
    { code: 'center', desc: 'Dikey ortalar' }
  ],
  'flex-direction': [
    { code: 'row', desc: 'Yan yana (Varsayılan)' },
    { code: 'row-reverse', desc: 'Ters yan yana' },
    { code: 'column', desc: 'Alt alta' },
    { code: 'column-reverse', desc: 'Ters alt alta' }
  ],
  'Diğerleri': [
    { code: 'order', desc: 'Sıralamayı değiştirir' },
    { code: 'flex-wrap', desc: 'Taşmayı önler (alt satır)' },
    { code: 'align-self', desc: 'Tek elemanı hizalar' }
  ]
};

// ==========================================
// GAME ENGINE
// ==========================================

export default function GameArena() {
  const { playSound } = useGameFx();

  const [levelId, setLevelId] = useState(() => parseInt(localStorage.getItem('flex_farm_level') || "1"));
  const [userCode, setUserCode] = useState("");
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => JSON.parse(localStorage.getItem('flex_farm_completed') || "[]"));
  const [isWin, setIsWin] = useState(false);
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [isError, setIsError] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  // Easter Egg States
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [isDisco, setIsDisco] = useState(false);

  // --- SANDBOX STATE ---
  const [isSandbox, setIsSandbox] = useState(false);
  const [sandboxAnimals, setSandboxAnimals] = useState<Animal[]>([
    { id: 1, type: 'sheep', color: 'default' },
    { id: 2, type: 'cow', color: 'red' },
    { id: 3, type: 'duck', color: 'blue' }
  ]);

  const level = levels.find(l => l.id === levelId) || levels[0];
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // CERTIFICATE CHECK
  const isAllLevelsCompleted = new Set(completedLevels).size === levels.length;

  // CURRENT ANIMALS
  const currentAnimals = isSandbox ? sandboxAnimals : level.animals;

  // :)
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === konamiCode.length) {
          setIsDisco(true);
          playSound('success');
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, playSound]);

  // :(
  useEffect(() => {
    if (isDisco) {
      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          spread: 160,
          origin: { y: 0.2 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isDisco]);

  useEffect(() => {
    if (!isSandbox) {
      setUserCode("");
      setIsWin(false);
      setShowTip(false);
      setIsError(false);
      localStorage.setItem('flex_farm_level', levelId.toString());
    } else {
      setUserCode(""); // Sandbox default code
    }
    const timer = setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 50);
    return () => clearTimeout(timer);
  }, [levelId, isSandbox]);

  const parseCssToSet = (code: string) => {
    return new Set(
      code.trim().toLowerCase().split(';').map(rule => rule.trim().replace(/\s/g, '')).filter(rule => rule.length > 0)
    );
  };

  const checkAnswer = () => {
    if (isWin || isSandbox) return; 

    const userRules = parseCssToSet(userCode);
    const correctRules = parseCssToSet(level.correctCss);
    let isCorrect = userRules.size === correctRules.size;
    
    if (isCorrect) {
      userRules.forEach(rule => { if (!correctRules.has(rule)) isCorrect = false; });
    }

    if (isCorrect) {
      playSound('success');
      setIsWin(true);
      const newCompleted = Array.from(new Set([...completedLevels, levelId]));
      setCompletedLevels(newCompleted);
      localStorage.setItem('flex_farm_completed', JSON.stringify(newCompleted));
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    } else {
      playSound('error');
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      inputRef.current?.focus();
    }
  };

  const nextLevel = () => { if (levelId < levels.length) { playSound('pop'); setLevelId(levelId + 1); } };
  const prevLevel = () => { if (levelId > 1) { playSound('click'); setLevelId(levelId - 1); } };
  
  const getCssValue = (property: string) => {
    const regex = new RegExp(`${property}\\s*:\\s*([^;]+)`);
    const match = userCode.match(regex);
    return match ? match[1] : undefined;
  };

  // Sandbox Functions
  const toggleSandbox = () => {
    playSound('click');
    setIsSandbox(!isSandbox);
    setIsWin(false);
  };

  const addToSandbox = (type: Animal['type']) => {
    playSound('pop');
    setSandboxAnimals([...sandboxAnimals, { 
      id: Date.now(), 
      type, 
      color: ['red', 'blue', 'yellow', 'default'][Math.floor(Math.random() * 4)] as any 
    }]);
  };

  const clearSandbox = () => {
    playSound('click');
    setSandboxAnimals([]);
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-dvh md:h-screen w-full bg-[#f1f5f9] md:overflow-hidden ${isDisco ? 'animate-hue-rotate' : ''}`}>
      
      {/* DISCO MODE EXIT BUTTON */}
      {isDisco && (
        <button 
          onClick={() => setIsDisco(false)} 
          className="fixed top-4 right-4 z-[999] bg-white text-black px-6 py-2 rounded-full font-bold shadow-xl hover:scale-110 transition-transform"
        >
          STOP PARTY
        </button>
      )}

      {/* CHEATSHEET MODAL */}
      {showCheatsheet && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowCheatsheet(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Book /> CSS Flexbox Sozlugu</h3>
              <button onClick={() => setShowCheatsheet(false)} className="text-slate-400 hover:text-red-500"><Icons.Close /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(CheatsheetData).map(([title, items]) => (
                <div key={title}>
                  <h4 className="font-bold text-green-700 mb-2 border-b border-green-100">{title}</h4>
                  <ul className="text-sm space-y-1">
                    {items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <code className="text-blue-600 bg-blue-50 px-1 rounded">{item.code}</code>
                        <span className="text-slate-500">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEFT PANEL: GAME STAGE */}
      <div className="w-full h-[45dvh] md:h-full md:flex-1 relative farm-bg shadow-inner overflow-hidden flex flex-col shrink-0">
        {!isSandbox && <div className="absolute top-4 left-4 z-10 md:hidden bg-white/90 p-2 rounded-full shadow-lg font-bold text-green-700 text-sm px-4">Level {level.id}</div>}

        {/* SANDBOX TOOLBAR */}
        {isSandbox && (
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-2 justify-center">
            <button onClick={() => addToSandbox('sheep')} className="bg-white p-2 rounded-lg shadow hover:scale-105 transition-transform text-xs font-bold flex items-center gap-1"><Icons.Plus /> Koyun</button>
            <button onClick={() => addToSandbox('cow')} className="bg-white p-2 rounded-lg shadow hover:scale-105 transition-transform text-xs font-bold flex items-center gap-1"><Icons.Plus /> Inek</button>
            <button onClick={() => addToSandbox('duck')} className="bg-white p-2 rounded-lg shadow hover:scale-105 transition-transform text-xs font-bold flex items-center gap-1"><Icons.Plus /> Ordek</button>
            <button onClick={() => addToSandbox('goat')} className="bg-white p-2 rounded-lg shadow hover:scale-105 transition-transform text-xs font-bold flex items-center gap-1"><Icons.Plus /> Keci</button>
            <button onClick={() => addToSandbox('farmer')} className="bg-white p-2 rounded-lg shadow hover:scale-105 transition-transform text-xs font-bold flex items-center gap-1"><Icons.Plus /> Ciftci</button>
            
            <button onClick={clearSandbox} className="bg-red-100 text-red-600 p-2 rounded-lg shadow hover:scale-105 transition-transform text-xs font-bold flex items-center gap-1"><Icons.Trash /> Temizle</button>
          </div>
        )}

        <div className="w-full h-full p-6 md:p-12 flex flex-col relative">
            <div className="relative flex-1">
                {/* DYNAMIC CSS LOGIC */}
                <style>{`
                    #animals { display: flex; width: 100%; height: 100%; gap: 12px; padding: 24px; ${userCode} }
                    #barns { display: flex; width: 100%; height: 100%; gap: 12px; padding: 24px; ${level.barnsCss} }
                    ${level.correctCss.includes('wrap') || isSandbox ? '.barn-slot, .animal-wrapper { width: 18% !important; margin-bottom: 10px; }' : ''}
                    ${level.correctCss.includes('align-content') ? '.barn-slot, .animal-wrapper { width: 18% !important; margin-bottom: 10px; }' : ''}
                `}</style>

                {/* LAYER 1: BARNS */}
                {!isSandbox && level.id !== 21 && (
                  <div id="barns" className="absolute inset-0 z-0">
                      {level.barns.map((barn, i) => {
                        const c = Colors[barn.color as keyof typeof Colors] || Colors.default;
                        const animalType = level.animals[i]?.type;
                        const isGoatLevel = level.correctCss.includes('align-self');
                        const isGoatBarn = isGoatLevel && animalType === 'goat';

                        return (
                          <div key={`barn-${i}`} className="w-24 h-24 barn-slot" style={{ background: `linear-gradient(135deg, ${c.bg}, white)`, '--roof-color': c.roof, alignSelf: isGoatBarn ? 'flex-end' : 'auto' } as React.CSSProperties}></div>
                        )
                      })}
                  </div>
                )}

                {/* LAYER 2: ANIMALS / WEB ELEMENTS */}
                <div id="animals" 
                     className={`absolute inset-0 z-10 ${level.id === 21 && !isSandbox ? 'bg-slate-100 border-b-4 border-slate-300 h-32 items-center rounded-lg shadow-inner' : ''}`}>
                    {currentAnimals.map((a, i) => {
                       const orderValue = getCssValue('order');
                       const alignSelfValue = getCssValue('align-self');
                       return (
                        <div key={isSandbox ? a.id : `animal-${i}`} 
                             className={`w-24 h-24 animal-wrapper transition-all duration-500 ease-in-out ${isWin ? 'animate-win' : 'animate-idle'} ${isDisco ? 'animate-bounce' : ''}`}
                             style={{ 
                               order: (a.type === 'farmer' && orderValue) ? parseInt(orderValue) : 0, 
                               alignSelf: (a.type === 'goat' && alignSelfValue) ? alignSelfValue : 'auto' 
                             }}>
                            <AnimalRenderer type={a.type} color={a.color} />
                        </div>
                       )
                    })}
                </div>
            </div>
        </div>
        
        {/* WIN OVERLAY */}
        {isWin && !isSandbox && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-pop p-4">
            
            {/* CERTIFICATE LOGIC */}
            {isAllLevelsCompleted ? (
              <div className="bg-white rounded-2xl shadow-2xl text-center max-w-md w-full border-4 border-yellow-400 overflow-hidden">
                {!showCertificate ? (
                  <div className="p-8">
                    <div className="mb-4 flex justify-center"><Icons.Trophy /></div>
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Flexbox Ustasi!</h2>
                    <p className="text-slate-600 mb-6 text-sm">Tebrikler! Tum bolumleri basariyla tamamladin. Sertifikani almak icin ismini yaz.</p>
                    <input 
                      type="text" 
                      placeholder="Adin Soyadin" 
                      className="w-full p-3 border-2 border-slate-200 rounded-lg mb-4 text-center font-bold text-slate-700 focus:border-yellow-400 outline-none"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <button 
                      disabled={!playerName.trim()}
                      onClick={() => { setShowCertificate(true); playSound('success'); confetti(); }} 
                      className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold text-xl shadow-lg w-full cursor-pointer transition-all"
                    >
                      Sertifikayi Goster
                    </button>
                  </div>
                ) : (
                  <div className="relative bg-[#fffbeb] p-8 text-center border-b-8 border-yellow-500">
                    <div className="absolute top-2 left-2 text-yellow-200"><Icons.Trophy /></div>
                    <div className="absolute bottom-2 right-2 text-yellow-200"><Icons.Trophy /></div>
                    
                    <h1 className="font-serif text-4xl text-slate-800 font-bold mb-1">SERTIFIKA</h1>
                    <div className="text-xs font-bold text-yellow-600 tracking-widest mb-6">FLEXBOX USTALIK BELGESI</div>
                    
                    <p className="text-slate-500 italic mb-2">Bu belge,</p>
                    <h2 className="text-3xl font-bold text-indigo-700 mb-2 border-b-2 border-indigo-100 inline-block px-4 pb-1">{playerName}</h2>
                    <p className="text-slate-600 text-sm mb-6">adli kisinin FlexFarm'daki tum gorevleri basariyla tamamlayarak <br/><strong>CSS Flexbox Uzmani</strong> oldugunu belgeler.</p>
                    
                    <div className="flex justify-between items-end mt-8 pt-4 border-t border-yellow-200">
                      <div className="text-left">
                        <div className="text-[10px] text-slate-400">Tarih</div>
                        <div className="text-sm font-bold text-slate-600">{new Date().toLocaleDateString('tr-TR')}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Egitmen</div>
                        <div className="font-serif text-lg text-slate-800 italic">Ciftci Celal</div>
                      </div>
                    </div>

                    <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="mt-6 text-xs text-slate-400 hover:text-slate-600 underline">Oyunu Sifirla</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={nextLevel} className="bg-green-500 text-white px-10 py-5 rounded-full shadow-[0_10px_20px_rgba(34,197,94,0.4)] font-bold text-2xl hover:scale-105 transition-transform border-4 border-white flex items-center gap-3 cursor-pointer">
                <span>Mukemmel!</span> <span className="bg-white text-green-600 w-9 h-9 rounded-full flex items-center justify-center"><Icons.ArrowRight /></span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL: EDITOR */}
      <div className="w-full flex-1 md:h-full md:flex-none md:w-[450px] lg:w-[500px] bg-white border-l border-slate-200 flex flex-col z-20 shadow-2xl overflow-y-auto">
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2"><Icons.FarmLogo /></div>
             <div className="relative">
                <div className="flex gap-2">
                  {/* LEVEL SELECTOR */}
                  <div className="relative">
                    <button 
                      onClick={() => { if(!isSandbox) { playSound('click'); setShowLevelMenu(!showLevelMenu); } }} 
                      className={`ml-4 px-3 py-1 border border-slate-200 rounded text-sm font-medium transition-colors flex items-center gap-2 shadow-sm ${isSandbox ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white hover:border-green-400'}`}
                    >
                      {isSandbox ? 'Serbest Mod' : `Level ${level.id}`} {!isSandbox && <span className="text-[10px] text-slate-400">▼</span>}
                    </button>
                    {showLevelMenu && !isSandbox && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-xl shadow-xl p-3 grid grid-cols-5 gap-2 z-50">
                        {levels.map(l => (
                          <button key={l.id} onClick={() => { playSound('pop'); setLevelId(l.id); setShowLevelMenu(false); }} className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 transition-all ${l.id === levelId ? 'border-green-500 bg-green-50 text-green-700' : completedLevels.includes(l.id) ? 'border-green-200 bg-green-100 text-green-600' : 'border-slate-100 hover:border-green-300 hover:bg-slate-50'}`}>{l.id}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SANDBOX TOGGLE */}
                  <button 
                    onClick={toggleSandbox}
                    className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${isSandbox ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                    title="Serbest Mod / Oyun Modu"
                  >
                    {isSandbox ? 'Oyuna Don' : 'Serbest Mod'}
                  </button>
                </div>
             </div>
          </div>
          
          {/* NAV BUTTONS */}
          {!isSandbox && (
            <div className="flex gap-2">
               <button onClick={prevLevel} disabled={levelId===1} className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-40 transition-all"><Icons.ArrowLeft /></button>
               <button onClick={nextLevel} disabled={levelId===levels.length} className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-40 transition-all"><Icons.ArrowRight /></button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-start mb-4">
             <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
               {isSandbox ? 'Serbest Mod' : level.title}
             </h2>
             <button onClick={() => setShowCheatsheet(true)} className="text-slate-400 hover:text-blue-600 transition-colors" title="Sozluk"><Icons.Book /></button>
          </div>
          
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {isSandbox 
              ? "Burası senin oyun alanın! Yukarıdaki butonlarla hayvan ekle, CSS kodları yaz ve sonuçları anında gör. Hedef yok, sadece eğlence var." 
              : level.desc}
          </p>
          
          {!isSandbox && (
            <div className="mb-6">
              <button onClick={() => { playSound('click'); setShowTip(!showTip); }} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2 mb-2">
                <Icons.Help /> {showTip ? 'Ipucunu Gizle' : 'Ipucu Goster'}
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showTip ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-200 shadow-sm"><p className="text-blue-900 font-medium leading-snug">{level.tip}</p></div>
              </div>
            </div>
          )}

          <div className={`editor-window mb-6 ${isError ? 'animate-shake' : ''}`}>
            <div className="editor-header justify-between">
              <div className="flex items-center">
                 <div className="window-dots"><div className="dot dot-red"></div><div className="dot dot-yellow"></div><div className="dot dot-green"></div></div>
                 <div className="filename-tab">style.css</div>
              </div>
              <button onClick={() => setUserCode('')} className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1 transition-colors" title="Kodu Temizle"><Icons.Trash /></button>
            </div>
            <div className="editor-body h-full flex">
              <div className="line-numbers text-slate-400 text-right pr-2 pt-1 select-none font-mono text-sm leading-6">
                <span className="block">1</span>
                <span className="block">2</span>
                <span className="block">3</span>
                <span className="block">4</span>
                <span className="block">5</span>
              </div>
              <div className="code-area flex-1 font-mono text-sm leading-6">
                <div className="code-line"><span className="token-selector text-purple-600 font-bold">#farm</span> <span className="token-brace text-slate-500">{'{'}</span></div>
                <div className="code-line pl-4 text-slate-600">
                  <span className="token-property text-sky-600">display</span>: <span className="token-value text-orange-600">flex</span>;<span className="token-comment opacity-50 ml-2 italic">/* Varsayilan */</span>
                </div>
                
                <div className="code-line pl-4 flex-1 h-32 relative">
                  <textarea 
                    ref={inputRef as any}
                    value={userCode} 
                    onChange={(e) => { setUserCode(e.target.value); if(isError) setIsError(false); }} 
                    onKeyDown={(e) => { 
                      if(!isSandbox && e.key === 'Enter') {
                        e.preventDefault();
                        checkAnswer();
                      }
                    }}
                    className="w-full h-full bg-transparent outline-none text-pink-600 resize-none font-mono placeholder:text-slate-300/70"
                    placeholder={isSandbox ? "/* Ornek:\njustify-content: center;\nalign-items: center;\n*/" : "/* Kodu buraya yaz */"} 
                    spellCheck="false" 
                    autoComplete="off" 
                  />
                </div>

                <div className="code-line"><span className="token-brace text-slate-500">{'}'}</span></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
             {/* Sandbox Buttons */}
             <button onClick={checkAnswer} className={`${isSandbox ? 'bg-slate-600 hover:bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 group`}>
               <Icons.Play /> <span className="group-hover:tracking-wide transition-all">{isSandbox ? 'Kodu Uygula' : 'Kodu Calistir'}</span>
             </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 text-center bg-slate-50">
           <div className="text-xs font-bold text-slate-400 mb-3 tracking-wide uppercase">Made by <span className="text-slate-600">sedatoneer</span></div>
           <div className="flex justify-center gap-5 mb-4">
              <a href="https://github.com/sedatoneer" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors"><Icons.Github /></a>
              <a href="https://linkedin.com/in/sedatoneer" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-700 transition-colors"><Icons.Linkedin /></a>
              <a href="https://instagram.com/sedatoneer" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors"><Icons.Instagram /></a>
           </div>
           <button onClick={() => { if(confirm('Tum ilerleme silinsin mi?')) { localStorage.clear(); window.location.reload(); } }} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center gap-2 mx-auto">
             <Icons.Refresh /> Ilerlemeyi Sifirla
           </button>
        </div>
      </div>
    </div>
  );
}