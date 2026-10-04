import React, { useState, useEffect } from 'react';
import { 
  getTodaySchoolDay, 
  getBooksForDay, 
  DaySchedule, 
  Book, 
  WEEK_SCHEDULE,
  BOOKS 
} from './data/schoolData';
import { Header, ActiveTab } from './components/Header';
import { TodayBooksView } from './components/TodayBooksView';
import { AllBooksView } from './components/AllBooksView';
import { FullScheduleView } from './components/FullScheduleView';
import { BookModal } from './components/BookModal';
import { Backpack, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';

export default function App() {
  // Navigation tab: 'books' opens by default as requested
  const [activeTab, setActiveTab] = useState<ActiveTab>('books');

  // School day calculations
  const [todayInfo, setTodayInfo] = useState(() => getTodaySchoolDay());
  const [selectedSchedule, setSelectedSchedule] = useState<DaySchedule>(() => todayInfo.daySchedule);

  // Selected book for details modal
  const [activeModalBook, setActiveModalBook] = useState<Book | null>(null);

  // Checked books in backpack (persisted in localStorage)
  const [packedBookIds, setPackedBookIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('classe3a_packed_books');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('classe3a_dark_mode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('classe3a_dark_mode', JSON.stringify(darkMode));
    } catch {}
  }, [darkMode]);

  // Save packed books
  const togglePacked = (bookId: string) => {
    setPackedBookIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      try {
        localStorage.setItem('classe3a_packed_books', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const resetPacked = () => {
    setPackedBookIds(new Set());
    try {
      localStorage.removeItem('classe3a_packed_books');
    } catch {}
  };

  // Re-check date periodically or on focus
  useEffect(() => {
    const handleFocus = () => {
      const info = getTodaySchoolDay();
      setTodayInfo(info);
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleSelectDaySchedule = (daySchedule: DaySchedule) => {
    setSelectedSchedule(daySchedule);
  };

  const handleGoToDayByName = (dayName: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì') => {
    const found = WEEK_SCHEDULE.find((d) => d.dayName === dayName);
    if (found) {
      setSelectedSchedule(found);
      setActiveTab('today');
    }
  };

  const todayBooks = getBooksForDay(todayInfo.daySchedule);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Header with Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        todayBooksCount={todayBooks.length}
        actualDayName={todayInfo.actualDayName}
        isWeekend={todayInfo.isWeekend}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'today' && (
          <TodayBooksView
            currentDaySchedule={todayInfo.daySchedule}
            isWeekend={todayInfo.isWeekend}
            actualDayName={todayInfo.actualDayName}
            selectedSchedule={selectedSchedule}
            onSelectDay={handleSelectDaySchedule}
            onOpenBookModal={(book) => setActiveModalBook(book)}
            packedBookIds={packedBookIds}
            onTogglePacked={togglePacked}
            onResetPacked={resetPacked}
          />
        )}

        {activeTab === 'books' && (
          <AllBooksView
            onOpenBookModal={(book) => setActiveModalBook(book)}
            onGoToDay={handleGoToDayByName}
          />
        )}

        {activeTab === 'schedule' && (
          <FullScheduleView
            onSelectDay={(dayIndex) => {
              const day = WEEK_SCHEDULE.find((d) => d.dayIndex === dayIndex);
              if (day) {
                setSelectedSchedule(day);
                setActiveTab('today');
              }
            }}
            onOpenBookModal={(book) => setActiveModalBook(book)}
            currentDayName={todayInfo.daySchedule.dayName}
          />
        )}
      </main>

      {/* Book Detailed Inspection Modal */}
      <BookModal
        book={activeModalBook}
        onClose={() => setActiveModalBook(null)}
        isPacked={activeModalBook ? packedBookIds.has(activeModalBook.id) : false}
        onTogglePacked={togglePacked}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-12 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 font-medium">
            <span>Istituto d'Istruzione Superiore</span>
            <span>•</span>
            <span>Classe 3A Indirizzo Agrario</span>
          </div>
          <div className="text-zinc-400 dark:text-zinc-500">
            Libri: Gestione, Economia, Matematica, Tecniche di Produzione
          </div>
        </div>
      </footer>
    </div>
  );
}
