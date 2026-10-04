import React, { useEffect, useState } from 'react';
import { BookOpen, Backpack, CalendarDays, Moon, Sun, Clock } from 'lucide-react';
import { BOOKS } from '../data/schoolData';

export type ActiveTab = 'today' | 'books' | 'schedule';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  todayBooksCount: number;
  actualDayName: string;
  isWeekend: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  todayBooksCount,
  actualDayName,
  isWeekend,
  darkMode,
  onToggleDarkMode,
}) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Class Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-xs">
              <Backpack className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
                  Zaino 3A
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  Agrario
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
                Istituto d'Istruzione Superiore
              </p>
            </div>
          </div>

          {/* Current Date Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              Oggi è <strong>{actualDayName}</strong>
            </span>
            {timeString && <span className="text-zinc-400 font-mono">• {timeString}</span>}
            {isWeekend && (
              <span className="ml-1 text-[10px] bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-1.5 py-0.2 rounded font-semibold">
                Weekend
              </span>
            )}
          </div>

          {/* Dark Mode & Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              title={darkMode ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Tutti i Libri first as requested, then I Libri di Oggi, then Orario) */}
        <div className="flex items-center justify-start space-x-2 pb-3 overflow-x-auto">
          {/* Button 1: Tutti i Libri (First tab as requested) */}
          <button
            onClick={() => onTabChange('books')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'books'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tutti i Libri</span>
          </button>

          {/* Button 2: I Libri di Oggi */}
          <button
            onClick={() => onTabChange('today')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative shrink-0 ${
              activeTab === 'today'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Backpack className="w-4 h-4" />
            <span>I Libri di Oggi</span>
            <span
              className={`text-[11px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTab === 'today'
                  ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900'
                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
              }`}
            >
              {todayBooksCount}
            </span>
          </button>

          {/* Button 3: Orario Scolastico Completo */}
          <button
            onClick={() => onTabChange('schedule')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'schedule'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Orario Classe 3A</span>
          </button>
        </div>
      </div>
    </header>
  );
};
