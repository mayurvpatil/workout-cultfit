import { useState } from 'react';
import { videos, weeklyPlan, monthlyPlan, fallbackWorkouts, workoutGroups } from './data/videos';

export default function App() {
  const groupLabelByKey = Object.fromEntries(workoutGroups.map(group => [group.key, group.label]));
  const [pickerType, setPickerType] = useState('push');
  const [pickerDuration, setPickerDuration] = useState('long');
  const [randomVideo, setRandomVideo] = useState(null);
  const [lastGeneratedIndexByKey, setLastGeneratedIndexByKey] = useState({});
  const [selectedDay, setSelectedDay] = useState(() => {
    const jsDayToPlanDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = jsDayToPlanDay[new Date().getDay()];
    return weeklyPlan.some(day => day.day === today) ? today : weeklyPlan[0]?.day;
  });
  
  const [tabType, setTabType] = useState('push');

  const mapPlanTypeToPicker = (planType) => {
    const normalized = planType.toLowerCase();
    if (normalized.includes('push')) return 'push';
    if (normalized.includes('pull')) return 'pull';
    if (normalized.includes('core')) return 'core';
    return null;
  };

  const getCompactPlanType = (planType) => {
    const normalized = planType.toLowerCase();
    if (normalized.includes('core')) return 'Core';
    if (normalized.includes('rest')) return 'Rest';
    return planType;
  };

  const handleDaySelection = (dayName) => {
    setSelectedDay(dayName);

    const planForDay = weeklyPlan.find(day => day.day === dayName);
    if (!planForDay) return;

    const mappedType = mapPlanTypeToPicker(planForDay.type);
    if (!mappedType) return;

    setPickerType(mappedType);
    setTabType(mappedType);
    setRandomVideo(null);
  };

  const handleGenerate = () => {
    const list = videos[pickerType]?.[pickerDuration];
    if (!list || list.length === 0) {
      setRandomVideo(null);
      return;
    }

    const listKey = `${pickerType}:${pickerDuration}`;
    const lastIndex = lastGeneratedIndexByKey[listKey] ?? -1;
    const nextIndex = (lastIndex + 1) % list.length;

    setLastGeneratedIndexByKey(prev => ({ ...prev, [listKey]: nextIndex }));
    setRandomVideo(list[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-zinc-100 font-sans selection:bg-lime-500 selection:text-black relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl"></div>
        <div className="absolute top-40 -right-16 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl"></div>
      </div>
      {/* Header */}
      <header className="px-3 py-3 sm:p-5 border-b border-zinc-800/70 bg-[#0a0d12]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-start sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase italic tracking-tight flex items-center gap-2 text-white leading-none">
              CultFit <span className="text-lime-400">Planner</span>
            </h1>
            <p className="text-zinc-400 text-[10px] sm:text-sm mt-1 uppercase tracking-[0.12em] sm:tracking-[0.22em] font-semibold flex flex-wrap items-center gap-2 sm:gap-3">
              Push 
              <span className="w-1 h-1 rounded-full bg-lime-500"></span> 
              Pull 
              <span className="w-1 h-1 rounded-full bg-lime-500"></span> 
              Core/Legs
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/mayurvpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 border border-cyan-400/40 bg-cyan-400/10 rounded-md text-[10px] sm:text-xs font-bold tracking-wide text-cyan-200 uppercase hover:bg-cyan-400/20 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/mayurvpatil"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 border border-zinc-500/60 bg-zinc-800/70 rounded-md text-[10px] sm:text-xs font-bold tracking-wide text-zinc-200 uppercase hover:bg-zinc-700 transition-colors"
              >
                GitHub
              </a>
            </div>
            <div className="hidden sm:flex px-3 py-1 border border-lime-500/30 bg-lime-500/10 rounded-full text-xs font-bold tracking-widest text-lime-300 uppercase items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
              Ready to train
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 py-6 sm:p-5 space-y-10 sm:space-y-12 sm:py-8">
        {/* Weekly Plan */}
        <section>
          <div className="flex flex-col gap-1.5 mb-5">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">Weekly Split</h2>
            <div className="h-1 w-20 bg-lime-500"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Selected Day: <span className="text-lime-400">{selectedDay}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {weeklyPlan.map(day => {
              const isSelected = selectedDay === day.day;
              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => handleDaySelection(day.day)}
                  className={`p-3.5 sm:p-4 border transition-all duration-300 flex flex-col justify-center relative overflow-hidden group text-left rounded-xl min-h-[96px] ${
                    isSelected
                      ? 'bg-lime-500/12 border-lime-400/70 shadow-[0_0_0_1px_rgba(163,230,53,0.15)]'
                      : 'bg-zinc-900/70 border-zinc-700/60 hover:border-lime-500/50 hover:-translate-y-0.5'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  <div className={`text-xs font-bold mb-2 uppercase tracking-widest relative z-10 ${isSelected ? 'text-lime-300' : 'text-zinc-500'}`}>{day.day}</div>
                  <div
                    title={day.type}
                    className={`font-black text-base sm:text-lg uppercase tracking-wide relative z-10 transition-colors whitespace-nowrap ${isSelected ? 'text-lime-400' : 'text-zinc-100 group-hover:text-lime-400'}`}
                  >
                    {getCompactPlanType(day.type)}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Picker */}
        <section className="bg-gradient-to-br from-zinc-900/95 to-zinc-950 p-4 sm:p-7 border border-zinc-700/70 rounded-2xl relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col gap-1.5 mb-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black uppercase italic tracking-tight text-white">Quick Start</h2>
            <p className="text-zinc-400 text-[11px] sm:text-sm font-medium uppercase tracking-[0.12em] sm:tracking-[0.2em]">Get random workout video</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 relative z-10">
            <select value={pickerType} onChange={e => setPickerType(e.target.value)} className="w-full px-4 py-3 bg-zinc-950/90 border border-zinc-700 font-bold uppercase tracking-wider shadow-sm outline-none focus:border-lime-500 rounded-lg text-zinc-200">
              {workoutGroups.map(group => (
                <option key={group.key} value={group.key}>{group.label}</option>
              ))}
            </select>
            <select value={pickerDuration} onChange={e => setPickerDuration(e.target.value)} className="w-full px-4 py-3 bg-zinc-950/90 border border-zinc-700 font-bold uppercase tracking-wider shadow-sm outline-none focus:border-lime-500 rounded-lg text-zinc-200">
              <option value="long">45–60 Minutes</option>
              <option value="short">Under 40 Minutes</option>
            </select>
            <button onClick={handleGenerate} className="w-full px-6 py-3 bg-lime-500 text-black font-black uppercase tracking-widest hover:bg-lime-400 rounded-lg transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_20px_rgba(163,230,53,0.25)]">
              Get Video
            </button>
          </div>

          {randomVideo && (
            <div className="p-[1px] max-w-xl bg-gradient-to-br from-lime-400 via-emerald-500 to-cyan-500 relative z-10 animate-fade-in-up rounded-xl">
              <div className="bg-zinc-950/95 p-5 sm:p-6 flex flex-col rounded-xl">
                <div className="inline-block px-3 py-1 bg-lime-500/20 text-lime-400 border border-lime-500/30 text-xs font-black uppercase tracking-widest mb-3 self-start">
                  {groupLabelByKey[pickerType] || pickerType} / {pickerDuration === 'long' ? '45-60m' : '<40m'}
                </div>
                <h3 className="font-black text-xl sm:text-2xl uppercase italic leading-tight mb-2 text-white">{randomVideo.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-400 font-bold uppercase tracking-wide mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {randomVideo.duration}
                  </span>
                  <span>•</span>
                  <span>{randomVideo.published}</span>
                </div>
                <a href={randomVideo.url} target="_blank" rel="noreferrer" className="block text-center bg-white text-black font-black uppercase tracking-widest py-3 rounded-lg hover:bg-zinc-200 transition">
                  Watch Workout
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Library */}
        <section>
          <div className="flex flex-col gap-1.5 mb-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">The Vault</h2>
            <div className="h-1 w-20 bg-lime-500"></div>
          </div>
          
          <div className="flex border-b border-zinc-800/70 mb-6 overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
            {workoutGroups.map(group => (
              <button 
                key={group.key} 
                onClick={() => setTabType(group.key)} 
                className={`snap-start px-4 sm:px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-[0.12em] sm:tracking-widest transition-all whitespace-nowrap rounded-t-lg ${
                  tabType === group.key 
                    ? 'text-lime-300 border-b-2 border-lime-400 bg-lime-500/10' 
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-900/80'
                }`}
              >
                {group.label} Group
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-zinc-300">
                <span className="w-2 h-2 bg-lime-500"></span>
                45–60 Minutes
              </h3>
              <div className="space-y-3">
                {videos[tabType]?.long?.map(v => (
                  <a href={v.url} key={v.id} target="_blank" rel="noreferrer" className="group block p-4 bg-zinc-900/70 border border-zinc-700/60 rounded-xl hover:border-lime-500 transition-all hover:-translate-y-0.5">
                    <h4 className="font-bold text-zinc-100 group-hover:text-lime-400 transition-colors line-clamp-1">{v.title}</h4>
                    <div className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mt-2">{v.duration} • {v.published}</div>
                  </a>
                ))}
                {videos[tabType]?.long?.length === 0 && (
                  <div className="p-4 bg-zinc-900/70 border border-zinc-700/60 rounded-xl text-zinc-500 text-sm font-semibold uppercase tracking-wider">
                    No 45-60 minute videos in this group yet.
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-zinc-300">
                <span className="w-2 h-2 bg-orange-500"></span>
                Under 40 Minutes
              </h3>
              <div className="space-y-3">
                {videos[tabType]?.short?.map(v => (
                  <a href={v.url} key={v.id} target="_blank" rel="noreferrer" className="group block p-4 bg-zinc-900/70 border border-zinc-700/60 rounded-xl hover:border-orange-500 transition-all hover:-translate-y-0.5">
                    <h4 className="font-bold text-zinc-100 group-hover:text-orange-400 transition-colors line-clamp-1">{v.title}</h4>
                    <div className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mt-2">{v.duration} • {v.published}</div>
                  </a>
                ))}
                {videos[tabType]?.short?.length === 0 && (
                  <div className="p-4 bg-zinc-900/70 border border-zinc-700/60 rounded-xl text-zinc-500 text-sm font-semibold uppercase tracking-wider">
                    No under-40-minute videos in this group yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Plan */}
        <section>
          <div className="flex flex-col gap-1.5 mb-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">Progression</h2>
            <div className="h-1 w-20 bg-lime-500"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monthlyPlan.map((m, i) => (
              <div key={i} className="p-6 bg-zinc-900/70 border-t-2 border-zinc-700/70 hover:border-t-lime-500 rounded-xl transition-colors relative">
                <div className="text-6xl font-black italic text-zinc-800 absolute top-4 right-4 user-select-none pointer-events-none">0{i+1}</div>
                <div className="relative z-10">
                  <div className="text-xs font-black text-lime-400 mb-2 uppercase tracking-widest">Phase {i+1}</div>
                  <h3 className="font-black text-xl sm:text-2xl uppercase mb-3 text-white">{m.month.split(' — ')[1]}</h3>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed font-medium">{m.goal}</p>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-300 p-3 border border-zinc-700 bg-zinc-950/80 rounded-lg">
                    {m.schedule}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Busy Day Fallback */}
        <section>
          <div className="flex flex-col gap-1.5 mb-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white flex items-center gap-3">
              <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              Express Finishers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {fallbackWorkouts.map(fb => (
              <a key={fb.title} href={fb.url} target="_blank" rel="noreferrer" className="block p-5 bg-zinc-900/70 border border-zinc-700/60 rounded-xl hover:bg-orange-500 hover:border-orange-500 group transition-all hover:-translate-y-0.5">
                <div className="text-xs text-orange-500 group-hover:text-black font-black mb-3 uppercase tracking-widest">{fb.type}</div>
                <h3 className="font-black text-lg text-white group-hover:text-black uppercase leading-tight mb-2">{fb.title}</h3>
                <div className="text-sm font-bold text-zinc-500 group-hover:text-orange-900 tracking-wider">~{fb.duration}</div>
              </a>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="footer py-7 sm:py-8 border-t border-zinc-800/70 bg-[#0a0d12]/90 mt-10 sm:mt-12">
        <div className="container max-w-6xl mx-auto p-4 text-center text-zinc-400 text-xs sm:text-sm leading-relaxed">
          <p>
            All videos from{' '}
            <a href="https://www.youtube.com/@cult.official" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition-colors">
              @cult.official on YouTube
            </a>
          </p>
          <p className="footer-disclaimer">
            This is a personal workout planner, not the official Cult Fit app. All video credit goes to{' '}
            <a href="https://www.youtube.com/@cult.official" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition-colors">
              @cult.official
            </a>{' '}
            on YouTube.
          </p>
        </div>
      </footer>
    </div>
  );
}
