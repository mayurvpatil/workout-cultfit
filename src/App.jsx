import { useState } from 'react';
import { videos, weeklyPlan, monthlyPlan, fallbackWorkouts } from './data/videos';

export default function App() {
  const [pickerType, setPickerType] = useState('push');
  const [pickerDuration, setPickerDuration] = useState('long');
  const [randomVideo, setRandomVideo] = useState(null);
  
  const [tabType, setTabType] = useState('push');

  const handleRandomize = () => {
    const list = videos[pickerType]?.[pickerDuration];
    if (!list || list.length === 0) {
      setRandomVideo(null);
      return;
    }
    const random = list[Math.floor(Math.random() * list.length)];
    setRandomVideo(random);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-lime-500 selection:text-black">
      {/* Header */}
      <header className="p-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-2">
              Cult Fit <span className="text-lime-400">Planner</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-semibold flex items-center gap-3">
              Push 
              <span className="w-1 h-1 rounded-full bg-lime-500"></span> 
              Pull 
              <span className="w-1 h-1 rounded-full bg-lime-500"></span> 
              Core/Legs
            </p>
          </div>
          <div className="hidden sm:block">
             <div className="px-3 py-1 border border-zinc-800 bg-zinc-900 rounded-full text-xs font-bold tracking-widest text-lime-400 uppercase flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
               Ready to train
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-20 py-12">
        {/* Weekly Plan */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">Weekly Split</h2>
            <div className="h-1 w-20 bg-lime-500"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklyPlan.map(day => (
              <div key={day.day} className="p-5 bg-zinc-900 border border-zinc-800 hover:border-lime-500/50 transition-colors flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-xs text-zinc-500 font-bold mb-2 uppercase tracking-widest relative z-10">{day.day}</div>
                <div className="font-black text-lg uppercase tracking-wide text-zinc-100 relative z-10 group-hover:text-lime-400 transition-colors">{day.type}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Picker */}
        <section className="bg-zinc-900 p-8 sm:p-10 border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col gap-2 mb-8 relative z-10">
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">Quick Start</h2>
            <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Generate a random workout video</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
            <select value={pickerType} onChange={e => setPickerType(e.target.value)} className="px-5 py-4 bg-zinc-950 border border-zinc-800 font-bold uppercase tracking-wider shadow-sm outline-none focus:border-lime-500 text-zinc-200">
              <option value="push">Push</option>
              <option value="pull">Pull</option>
              <option value="core">Core/Legs</option>
            </select>
            <select value={pickerDuration} onChange={e => setPickerDuration(e.target.value)} className="px-5 py-4 bg-zinc-950 border border-zinc-800 font-bold uppercase tracking-wider shadow-sm outline-none focus:border-lime-500 text-zinc-200">
              <option value="long">45–60 Minutes</option>
              <option value="short">Under 40 Minutes</option>
            </select>
            <button onClick={handleRandomize} className="px-8 py-4 bg-lime-500 text-black font-black uppercase tracking-widest hover:bg-lime-400 transition transform hover:-translate-y-0.5 active:translate-y-0">
              Generate
            </button>
            <button onClick={handleRandomize} className="px-8 py-4 bg-zinc-800 text-white font-black uppercase tracking-widest hover:bg-zinc-700 transition">
              Shuffle
            </button>
          </div>

          {randomVideo && (
            <div className="p-1 max-w-lg bg-gradient-to-br from-lime-500 to-green-600 relative z-10 animate-fade-in-up">
              <div className="bg-zinc-950 p-6 flex flex-col">
                <div className="inline-block px-3 py-1 bg-lime-500/20 text-lime-400 border border-lime-500/30 text-xs font-black uppercase tracking-widest mb-4 self-start">
                  {pickerType} / {pickerDuration === 'long' ? '45-60m' : '<40m'}
                </div>
                <h3 className="font-black text-2xl uppercase italic leading-tight mb-2 text-white">{randomVideo.title}</h3>
                <div className="flex items-center gap-3 text-sm text-zinc-400 font-bold uppercase tracking-wide mb-6">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {randomVideo.duration}
                  </span>
                  <span>•</span>
                  <span>{randomVideo.published}</span>
                </div>
                <a href={randomVideo.url} target="_blank" rel="noreferrer" className="block text-center bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-zinc-200 transition">
                  Watch Workout
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Library */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">The Vault</h2>
            <div className="h-1 w-20 bg-lime-500"></div>
          </div>
          
          <div className="flex border-b border-zinc-800 mb-8 overflow-x-auto">
            {['push', 'pull', 'core'].map(t => (
              <button 
                key={t} 
                onClick={() => setTabType(t)} 
                className={`px-8 py-4 font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
                  tabType === t 
                    ? 'text-lime-400 border-b-2 border-lime-400 bg-lime-500/5' 
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {t} Group
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-zinc-300">
                <span className="w-2 h-2 bg-lime-500"></span>
                45–60 Minutes
              </h3>
              <div className="space-y-3">
                {videos[tabType]?.long?.map(v => (
                  <a href={v.url} key={v.id} target="_blank" rel="noreferrer" className="group block p-5 bg-zinc-900 border border-zinc-800 hover:border-lime-500 transition-colors">
                    <h4 className="font-bold text-zinc-100 group-hover:text-lime-400 transition-colors line-clamp-1">{v.title}</h4>
                    <div className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mt-2">{v.duration} • {v.published}</div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-zinc-300">
                <span className="w-2 h-2 bg-orange-500"></span>
                Under 40 Minutes
              </h3>
              <div className="space-y-3">
                {videos[tabType]?.short?.map(v => (
                  <a href={v.url} key={v.id} target="_blank" rel="noreferrer" className="group block p-5 bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition-colors">
                    <h4 className="font-bold text-zinc-100 group-hover:text-orange-400 transition-colors line-clamp-1">{v.title}</h4>
                    <div className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mt-2">{v.duration} • {v.published}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Plan */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">Progression</h2>
            <div className="h-1 w-20 bg-lime-500"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {monthlyPlan.map((m, i) => (
              <div key={i} className="p-8 bg-zinc-900 border-t-2 border-zinc-800 hover:border-t-lime-500 transition-colors relative">
                <div className="text-6xl font-black italic text-zinc-800 absolute top-4 right-4 user-select-none pointer-events-none">0{i+1}</div>
                <div className="relative z-10">
                  <div className="text-xs font-black text-lime-400 mb-2 uppercase tracking-widest">Phase {i+1}</div>
                  <h3 className="font-black text-2xl uppercase mb-3 text-white">{m.month.split(' — ')[1]}</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-medium">{m.goal}</p>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-300 p-4 border border-zinc-800 bg-zinc-950">
                    {m.schedule}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Busy Day Fallback */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white flex items-center gap-3">
              <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              Express Finishers
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {fallbackWorkouts.map(fb => (
              <a key={fb.title} href={fb.url} target="_blank" rel="noreferrer" className="block p-6 bg-zinc-900 border border-zinc-800 hover:bg-orange-500 hover:border-orange-500 group transition-all">
                <div className="text-xs text-orange-500 group-hover:text-black font-black mb-3 uppercase tracking-widest">{fb.type}</div>
                <h3 className="font-black text-lg text-white group-hover:text-black uppercase leading-tight mb-2">{fb.title}</h3>
                <div className="text-sm font-bold text-zinc-500 group-hover:text-orange-900 tracking-wider">~{fb.duration}</div>
              </a>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center p-6 gap-4">
          <div className="text-2xl font-black uppercase italic tracking-tighter text-zinc-700">Cult Fit Planner</div>
          <p className="font-bold uppercase tracking-widest text-xs text-zinc-600">Forged by Routine</p>
        </div>
      </footer>
    </div>
  );
}
