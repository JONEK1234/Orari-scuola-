import React from 'react';
import { DaySchedule, Book, getBooksForDay, BOOKS, WEEK_SCHEDULE } from '../data/schoolData';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Info, 
  BookOpen, 
  ChevronRight, 
  CheckCheck,
} from 'lucide-react';

interface TodayBooksViewProps {
  currentDaySchedule: DaySchedule;
  isWeekend: boolean;
  actualDayName: string;
  selectedSchedule: DaySchedule;
  onSelectDay: (daySchedule: DaySchedule) => void;
  onOpenBookModal: (book: Book) => void;
  packedBookIds: Set<string>;
  onTogglePacked: (bookId: string) => void;
  onResetPacked: () => void;
}

export const TodayBooksView: React.FC<TodayBooksViewProps> = ({
  currentDaySchedule,
  isWeekend,
  actualDayName,
  selectedSchedule,
  onSelectDay,
  onOpenBookModal,
  packedBookIds,
  onTogglePacked,
  onResetPacked,
}) => {
  const booksForSelectedDay = getBooksForDay(selectedSchedule);
  const isAutoToday = selectedSchedule.dayIndex === currentDaySchedule.dayIndex;
  
  // Calculate how many books are packed
  const packedCount = booksForSelectedDay.filter(b => packedBookIds.has(b.id)).length;
  const isAllPacked = booksForSelectedDay.length > 0 && packedCount === booksForSelectedDay.length;

  return (
    <div className="space-y-6">
      {/* Day Selector Navigation with compact exit time */}
      <div className="bg-white dark:bg-zinc-900 p-2 sm:p-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {WEEK_SCHEDULE.map((day) => {
            const isSelected = day.dayIndex === selectedSchedule.dayIndex;
            const isCurrentSchoolDay = day.dayIndex === currentDaySchedule.dayIndex;

            return (
              <button
                key={day.dayName}
                onClick={() => onSelectDay(day)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 shrink-0 ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{day.dayName}</span>
                {isCurrentSchoolDay && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900'
                        : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    Oggi
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-3 text-xs text-zinc-500 dark:text-zinc-400 ml-auto pr-1">
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Uscita: <strong>ore {selectedSchedule.exitTime}</strong></span>
          </span>
          {!isAutoToday && (
            <button
              onClick={() => onSelectDay(currentDaySchedule)}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              Torna a Oggi
            </button>
          )}
        </div>
      </div>

      {/* All Packed Celebration Alert */}
      {isAllPacked && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 flex items-center justify-between shadow-xs animate-in fade-in duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                Ottimo! Lo zaino per {selectedSchedule.dayName} è pronto!
              </h4>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                Tutti i libri richiesti per oggi sono stati inseriti.
              </p>
            </div>
          </div>
          <button
            onClick={onResetPacked}
            className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline font-medium ml-4 shrink-0"
          >
            Azzera spunte
          </button>
        </div>
      )}

      {/* Main Books Grid for the Day */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            <span>I Libri di {selectedSchedule.dayName}</span>
          </h3>
          <span className="text-xs text-zinc-500 font-medium">
            Clicca sulla scheda per vedere i dettagli e la copertina
          </span>
        </div>

        {booksForSelectedDay.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
            <Info className="w-8 h-8 text-zinc-400 mx-auto" />
            <h4 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Nessun libro principale per questa giornata
            </h4>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Controlla le materie di seguito: per oggi potrebbero bastare i quaderni di appunti o il materiale di laboratorio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {booksForSelectedDay.map((book) => {
              const isPacked = packedBookIds.has(book.id);
              // Find which hour slots this book is used in today
              const relevantHours = selectedSchedule.slots
                .filter(s => s.bookId === book.id)
                .map(s => s.time);

              return (
                <div
                  key={book.id}
                  className={`group relative rounded-2xl p-4 transition-all duration-200 border bg-white dark:bg-zinc-900 ${
                    isPacked 
                      ? 'border-emerald-300 dark:border-emerald-800/70 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-xs' 
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Cover Thumbnail */}
                    <div 
                      onClick={() => onOpenBookModal(book)}
                      className="cursor-pointer relative w-24 sm:w-28 aspect-3/4 rounded-xl overflow-hidden shrink-0 shadow-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-100 group-hover:scale-[1.02] transition-transform"
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-[11px] font-medium bg-black/60 px-2 py-0.5 rounded">
                          Ingrandisci
                        </span>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${book.colorScheme.badgeBg} ${book.colorScheme.badgeText}`}>
                            {book.subject}
                          </span>
                          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Ore: {relevantHours.join(', ')}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h4 
                          onClick={() => onOpenBookModal(book)}
                          className="cursor-pointer text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          {book.title}
                        </h4>

                        {/* Author & Publisher */}
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                          {book.authors}
                        </p>
                        <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">
                          {book.publisher}
                        </p>
                      </div>

                      {/* Interactive Backpack Toggle Button */}
                      <div className="pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <button
                          onClick={() => onTogglePacked(book.id)}
                          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            isPacked
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                          }`}
                        >
                          {isPacked ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Circle className="w-4 h-4 opacity-50" />
                          )}
                          <span>{isPacked ? 'Nello zaino ✓' : 'Metti nello zaino'}</span>
                        </button>

                        <button
                          onClick={() => onOpenBookModal(book)}
                          className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 flex items-center"
                          title="Dettagli libro"
                        >
                          <span>Scheda</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Day Schedule Timeline */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <span>Tabella oraria di {selectedSchedule.dayName}</span>
          </h4>
          <span className="text-xs text-zinc-500">
            Fine lezioni: ore {selectedSchedule.exitTime}
          </span>
        </div>

        <div className="space-y-2">
          {selectedSchedule.slots.map((slot, index) => {
            const hasBook = !!slot.bookId && !!BOOKS[slot.bookId];
            const book = slot.bookId ? BOOKS[slot.bookId] : null;

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs sm:text-sm ${
                  hasBook
                    ? 'bg-zinc-50/70 dark:bg-zinc-800/40 border-zinc-200/90 dark:border-zinc-700/60'
                    : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800/60'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <span className="font-mono font-bold text-zinc-500 dark:text-zinc-400 w-12 text-xs">
                    {slot.time}
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {slot.subject}
                    </span>
                    {slot.roomOrNote && (
                      <span className="ml-2 text-xs text-zinc-400 hidden sm:inline">
                        ({slot.roomOrNote})
                      </span>
                    )}
                  </div>
                </div>

                {hasBook && book ? (
                  <button
                    onClick={() => onOpenBookModal(book)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Libro:</span>
                    <span className="font-semibold">{book.shortSubject}</span>
                  </button>
                ) : (
                  <span className="text-xs text-zinc-400">
                    Solo quaderno
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
