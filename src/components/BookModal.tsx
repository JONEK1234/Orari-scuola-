import React from 'react';
import { Book } from '../data/schoolData';
import { X, BookOpen, Calendar, Check, ExternalLink, Bookmark } from 'lucide-react';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  isPacked?: boolean;
  onTogglePacked?: (id: string) => void;
}

export const BookModal: React.FC<BookModalProps> = ({
  book,
  onClose,
  isPacked,
  onTogglePacked,
}) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${book.colorScheme.badgeBg} ${book.colorScheme.badgeText}`}>
              {book.subject}
            </span>
            {book.volume && (
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md">
                {book.volume}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            title="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            {/* Book Cover Image */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[240px] aspect-3/4 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 group">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                    Copertina ufficiale
                  </span>
                </div>
              </div>

              {onTogglePacked && (
                <button
                  onClick={() => onTogglePacked(book.id)}
                  className={`mt-4 w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                    isPacked
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  <Check className={`w-4 h-4 ${isPacked ? 'opacity-100' : 'opacity-40'}`} />
                  <span>{isPacked ? 'Messo nello zaino ✓' : 'Segna come messo nello zaino'}</span>
                </button>
              )}
            </div>

            {/* Book Information */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
                  {book.title}
                </h3>
                {book.subtitle && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {book.subtitle}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-start">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200 w-24 shrink-0">Autori:</span>
                  <span className="text-zinc-700 dark:text-zinc-300">{book.authors}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200 w-24 shrink-0">Editore:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{book.publisher}</span>
                </div>
                {book.onlinePlatform && (
                  <div className="flex items-start">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200 w-24 shrink-0">Piattaforma:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">{book.onlinePlatform}</span>
                  </div>
                )}
              </div>

              {/* Days needed */}
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Giorni in cui serve questo libro:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'].map((day) => {
                    const isNeeded = book.scheduleDays.includes(day as any);
                    return (
                      <span
                        key={day}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          isNeeded
                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                            : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Description & Topics */}
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Argomenti principali:</span>
                </div>
                <ul className="grid grid-cols-1 gap-1 text-xs text-zinc-700 dark:text-zinc-300">
                  {book.topics.map((t, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 dark:bg-zinc-800/80 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-semibold transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
