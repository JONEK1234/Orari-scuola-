import React from 'react';
import { BOOKS, Book } from '../data/schoolData';
import { Calendar, ChevronRight } from 'lucide-react';

interface AllBooksViewProps {
  onOpenBookModal: (book: Book) => void;
  onGoToDay: (dayName: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì') => void;
}

export const AllBooksView: React.FC<AllBooksViewProps> = ({
  onOpenBookModal,
  onGoToDay,
}) => {
  const booksList = Object.values(BOOKS);

  return (
    <div className="space-y-4">
      {/* Direct Grid of Books - Minimalist, clean, no bulky header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {booksList.map((book) => (
          <div
            key={book.id}
            className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-4">
                {/* Book Cover */}
                <div 
                  onClick={() => onOpenBookModal(book)}
                  className="cursor-pointer relative w-24 sm:w-32 aspect-3/4 rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-100 dark:bg-zinc-800 transition-transform duration-200 group-hover:scale-102"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                    <span className="text-white text-[11px] font-semibold bg-black/70 px-2 py-0.5 rounded">
                      Ingrandisci
                    </span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${book.colorScheme.badgeBg} ${book.colorScheme.badgeText}`}>
                      {book.subject}
                    </span>
                    {book.volume && (
                      <span className="text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded">
                        {book.volume}
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => onOpenBookModal(book)}
                    className="cursor-pointer text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-snug line-clamp-2"
                  >
                    {book.title}
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    <span className="font-medium text-zinc-600 dark:text-zinc-300">Autori:</span> {book.authors}
                  </p>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">Editore:</span> {book.publisher}
                  </p>

                  {/* Days pills */}
                  <div className="pt-1.5">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Orario:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'].map((day) => {
                        const isNeeded = book.scheduleDays.includes(day as any);
                        return (
                          <button
                            key={day}
                            onClick={() => onGoToDay(day as any)}
                            disabled={!isNeeded}
                            className={`text-[10px] px-2 py-0.5 rounded font-medium transition-colors ${
                              isNeeded
                                ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 hover:opacity-80 cursor-pointer'
                                : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800/60 dark:text-zinc-600 cursor-not-allowed opacity-40'
                            }`}
                            title={isNeeded ? `Vedi libri di ${day}` : `Non previsto il ${day}`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics bullet summary */}
              <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Argomenti: </span>
                <span>{book.topics.slice(0, 3).join(' • ')}...</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 truncate max-w-[170px]">
                {book.onlinePlatform || 'Cartaceo + digitale'}
              </span>

              <button
                onClick={() => onOpenBookModal(book)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <span>Dettagli</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
