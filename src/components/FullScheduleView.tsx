import React, { useState } from 'react';
import { ZoomIn, Download, X } from 'lucide-react';

interface FullScheduleViewProps {
  onSelectDay: (dayIndex: number) => void;
  onOpenBookModal: (book: any) => void;
  currentDayName: string;
}

export const FullScheduleView: React.FC<FullScheduleViewProps> = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const photoUrl = '/images/orario_classe_3a.jpg';

  return (
    <div className="space-y-4">
      {/* Schedule Photo Container - Exact photo as requested */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2 sm:p-4 shadow-xs overflow-hidden flex flex-col items-center">
        <div 
          onClick={() => setIsFullScreen(true)}
          className="relative w-full max-w-4xl cursor-pointer group rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs"
        >
          <img
            src={photoUrl}
            alt="Orario Scolastico Ufficiale Classe 3A"
            className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-black/75 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5">
              <ZoomIn className="w-4 h-4" />
              <span>Clicca per ingrandire l'orario</span>
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-between pt-3 px-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Orario Ufficiale Classe 3A</span>
          <button
            onClick={() => setIsFullScreen(true)}
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Apri a schermo intero</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Modal View */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => setIsFullScreen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center">
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              title="Chiudi"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={photoUrl}
              alt="Orario Scolastico Completo Classe 3A"
              className="max-h-[90vh] w-auto max-w-full rounded-xl shadow-2xl object-contain bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
