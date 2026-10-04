export interface Book {
  id: string;
  subject: string;
  shortSubject: string;
  title: string;
  subtitle?: string;
  volume?: string;
  authors: string;
  publisher: string;
  onlinePlatform?: string;
  image: string;
  colorScheme: {
    bgLight: string;
    border: string;
    text: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
  };
  scheduleDays: ('Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì')[];
  description: string;
  topics: string[];
}

export interface HourSlot {
  time: string;
  subject: string;
  bookId?: string;
  roomOrNote?: string;
}

export interface DaySchedule {
  dayName: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì';
  dayIndex: number; // 1 for Monday to 5 for Friday
  exitTime: string;
  slots: HourSlot[];
}

export const BOOKS: Record<string, Book> = {
  gestione: {
    id: 'gestione',
    subject: 'Gestione',
    shortSubject: 'Gestione',
    title: 'Gestione & Valorizzazione Agroterritoriale',
    subtitle: 'Con elementi di: Selvicoltura, Legislazione, Mercati agricoli, Valutazione',
    authors: 'M.N. Forgiarini, L. Damiani, G. Puglisi',
    publisher: 'REDA Edizioni',
    onlinePlatform: 'digitale.capitello.it',
    image: '/images/IMG-20261004-211017.jpg',
    colorScheme: {
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      text: 'text-emerald-800 dark:text-emerald-300',
      accent: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/50',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
    },
    scheduleDays: ['Lunedì', 'Mercoledì', 'Giovedì'],
    description: 'Testo di riferimento per la comprensione delle dinamiche agroterritoriali, gestione forestale, mercati dei prodotti agricoli e perizia estimativa.',
    topics: [
      'Gestione aziendale e agroterritoriale',
      'Selvicoltura ed ecosistemi boschivi',
      'Legislazione forestale e rurale',
      'Mercati agricoli e valorizzazione',
      'Valutazione estimativa'
    ]
  },
  economia: {
    id: 'economia',
    subject: 'Economia',
    shortSubject: 'Economia',
    title: 'Economia agraria e legislazione di settore agraria e forestale',
    volume: 'Vol. 1 - Per il terzo anno',
    subtitle: 'Indirizzo Agricoltura, sviluppo rurale, valorizzazione dei prodotti del territorio e gestione delle risorse forestali e montane',
    authors: 'Ferdinando Battini',
    publisher: 'EDAGRICOLE Scolastico / Rizzoli Education',
    onlinePlatform: 'DDI - Didattica Digitale Integrata',
    image: '/images/IMG-20261004-211003.jpg',
    colorScheme: {
      bgLight: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800/60',
      text: 'text-amber-800 dark:text-amber-300',
      accent: 'bg-amber-600 hover:bg-amber-700 text-white',
      badgeBg: 'bg-amber-100 dark:bg-amber-900/50',
      badgeText: 'text-amber-800 dark:text-amber-300',
    },
    scheduleDays: ['Lunedì', 'Martedì', 'Giovedì'],
    description: 'Manuale ministeriale per lo studio dell\'economia agraria, forme di impresa rurale, catasto e quadro normativo forestale e montano.',
    topics: [
      'Economia generale e agraria',
      'Fattori della produzione in agricoltura',
      'Contabilità e bilancio agrario',
      'Politica Agricola Comune (PAC)',
      'Legislazione agraria e forestale'
    ]
  },
  matematica: {
    id: 'matematica',
    subject: 'Matematica',
    shortSubject: 'Matematica',
    title: 'A - Elementi di matematica',
    subtitle: 'Con teoria, esercizi graduati e applicazioni reali per le scienze agrarie',
    authors: 'Massimo Bergamini, Anna Trifone, Graziella Barozzi',
    publisher: 'ZANICHELLI Editore',
    onlinePlatform: 'Tutto il testo in digitale',
    image: '/images/IMG-20261004-211012.jpg',
    colorScheme: {
      bgLight: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800/60',
      text: 'text-blue-800 dark:text-blue-300',
      accent: 'bg-blue-600 hover:bg-blue-700 text-white',
      badgeBg: 'bg-blue-100 dark:bg-blue-900/50',
      badgeText: 'text-blue-800 dark:text-blue-300',
    },
    scheduleDays: ['Mercoledì', 'Giovedì', 'Venerdì'],
    description: 'Corso completo di matematica con algebra, piano cartesiano, funzioni numeriche, trigonometria elementare e statistica descrittiva.',
    topics: [
      'Algebra ed equazioni di II grado',
      'Geometria analitica e funzioni',
      'Modelli matematici per l\'agronomia',
      'Statistica e probabilità',
      'Esercizi di realtà'
    ]
  },
  tecniche_produzione: {
    id: 'tecniche_produzione',
    subject: 'Tecniche di Produzione',
    shortSubject: 'Tecniche Prod.',
    title: 'Trasformazioni e produzioni agroalimentari',
    volume: 'Seconda edizione',
    subtitle: 'Per Trasformazione dei prodotti e Gestione dell\'ambiente e del territorio - Agenda 2030',
    authors: 'Valerio Antolini, Patrizia Cappelli, Beatrice Fabbri, Vanna Vannucchi',
    publisher: 'ZANICHELLI Scienze',
    onlinePlatform: '2 capitoli in PDF, 240 esercizi interattivi',
    image: '/images/IMG-20261004-211009.jpg',
    colorScheme: {
      bgLight: 'bg-rose-50 dark:bg-rose-950/30',
      border: 'border-rose-200 dark:border-rose-800/60',
      text: 'text-rose-800 dark:text-rose-300',
      accent: 'bg-rose-600 hover:bg-rose-700 text-white',
      badgeBg: 'bg-rose-100 dark:bg-rose-900/50',
      badgeText: 'text-rose-800 dark:text-rose-300',
    },
    scheduleDays: ['Lunedì', 'Martedì', 'Mercoledì'],
    description: 'Guida tecnologica alle filiere di trasformazione dei prodotti agroalimentari, conservazione, sicurezza igienica ed economia circolare.',
    topics: [
      'Filiera lattiero-casearia e formaggi',
      'Enologia e processi di vinificazione',
      'Olearia e conservazione degli alimenti',
      'Sostenibilità e Agenda 2030',
      'Norme HACCP e tracciabilità'
    ]
  }
};

export const WEEK_SCHEDULE: DaySchedule[] = [
  {
    dayName: 'Lunedì',
    dayIndex: 1,
    exitTime: '14:00',
    slots: [
      { time: '08:00', subject: 'AGRICOLTURA SOSTENIBILE', roomOrNote: 'Quaderno di appunti' },
      { time: '09:00', subject: 'AGRONOMIA', roomOrNote: 'Dispense del docente' },
      { time: '10:00', subject: 'GESTIONE', bookId: 'gestione' },
      { time: '11:00', subject: 'TECNICHE DI PRODUZIONE', bookId: 'tecniche_produzione' },
      { time: '12:00', subject: 'ECONOMIA', bookId: 'economia' },
      { time: '13:00', subject: 'ECONOMIA', bookId: 'economia' },
    ]
  },
  {
    dayName: 'Martedì',
    dayIndex: 2,
    exitTime: '15:00',
    slots: [
      { time: '08:00', subject: 'LABORATORIO DI BIOLOGIA', roomOrNote: 'Camice & quaderno di laboratorio' },
      { time: '09:00', subject: 'SCIENZE MOTORIE', roomOrNote: 'Tuta & scarpe da ginnastica' },
      { time: '10:00', subject: 'ECONOMIA', bookId: 'economia' },
      { time: '11:00', subject: 'INGLESE', roomOrNote: 'Quaderno / Vocabolario' },
      { time: '12:00', subject: 'ITALIANO E STORIA', roomOrNote: 'Quaderno & antologia' },
      { time: '13:00', subject: 'TECNICHE DI PRODUZIONE', bookId: 'tecniche_produzione' },
      { time: '14:00', subject: 'RELIGIONE', roomOrNote: 'Quaderno di riflessione' },
    ]
  },
  {
    dayName: 'Mercoledì',
    dayIndex: 3,
    exitTime: '15:00',
    slots: [
      { time: '08:00', subject: 'LABORATORIO DI BIOLOGIA', roomOrNote: 'Camice & quaderno di laboratorio' },
      { time: '09:00', subject: 'AGRONOMIA', roomOrNote: 'Dispense del docente' },
      { time: '10:00', subject: 'GESTIONE', bookId: 'gestione' },
      { time: '11:00', subject: 'ITALIANO E STORIA', roomOrNote: 'Quaderno & testi' },
      { time: '12:00', subject: 'ITALIANO E STORIA', roomOrNote: 'Quaderno & testi' },
      { time: '13:00', subject: 'TECNICHE DI PRODUZIONE', bookId: 'tecniche_produzione' },
      { time: '14:00', subject: 'MATEMATICA', bookId: 'matematica' },
    ]
  },
  {
    dayName: 'Giovedì',
    dayIndex: 4,
    exitTime: '15:00',
    slots: [
      { time: '08:00', subject: 'ECONOMIA', bookId: 'economia' },
      { time: '09:00', subject: 'LABORATORIO DI BIOLOGIA', roomOrNote: 'Camice & quaderno di laboratorio' },
      { time: '10:00', subject: 'ITALIANO E STORIA', roomOrNote: 'Quaderno & testi' },
      { time: '11:00', subject: 'ITALIANO E STORIA', roomOrNote: 'Quaderno & testi' },
      { time: '12:00', subject: 'INGLESE', roomOrNote: 'Quaderno' },
      { time: '13:00', subject: 'MATEMATICA', bookId: 'matematica' },
      { time: '14:00', subject: 'GESTIONE', bookId: 'gestione' },
    ]
  },
  {
    dayName: 'Venerdì',
    dayIndex: 5,
    exitTime: '13:00',
    slots: [
      { time: '08:00', subject: 'AGRICOLTURA SOSTENIBILE', roomOrNote: 'Quaderno di appunti' },
      { time: '09:00', subject: 'ITALIANO E STORIA', roomOrNote: 'Quaderno & testi' },
      { time: '10:00', subject: 'MATEMATICA', bookId: 'matematica' },
      { time: '11:00', subject: 'SCIENZE MOTORIE', roomOrNote: 'Tuta & scarpe da ginnastica' },
      { time: '12:00', subject: 'AGRONOMIA', roomOrNote: 'Dispense del docente' },
    ]
  }
];

export function getTodaySchoolDay(currentDate: Date = new Date()): {
  daySchedule: DaySchedule;
  isWeekend: boolean;
  actualDayName: string;
  actualDayIndex: number;
  isAfterSchoolHours: boolean;
  nextSchoolDayName: string;
} {
  const dayIndex = currentDate.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currentTimeDec = hours + minutes / 60;

  const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const actualDayName = dayNames[dayIndex];

  let targetDayIndex: number;
  let isWeekend = false;
  let isAfterSchoolHours = false;

  if (dayIndex === 0 || dayIndex === 6) {
    // Sabato o Domenica -> "se è sabato e domenica non risulta niente c'è risultano direttamente i libri di lunedì"
    isWeekend = true;
    targetDayIndex = 1; // Lunedì
  } else {
    targetDayIndex = dayIndex;
    const currentSchedule = WEEK_SCHEDULE.find(d => d.dayIndex === dayIndex);
    if (currentSchedule) {
      const exitHour = parseInt(currentSchedule.exitTime.split(':')[0], 10);
      if (currentTimeDec >= exitHour) {
        isAfterSchoolHours = true;
      }
    }
  }

  const daySchedule = WEEK_SCHEDULE.find(d => d.dayIndex === targetDayIndex) || WEEK_SCHEDULE[0];

  return {
    daySchedule,
    isWeekend,
    actualDayName,
    actualDayIndex: dayIndex,
    isAfterSchoolHours,
    nextSchoolDayName: isWeekend ? 'Lunedì' : daySchedule.dayName,
  };
}

export function getBooksForDay(daySchedule: DaySchedule): Book[] {
  const bookIds = new Set<string>();
  daySchedule.slots.forEach(slot => {
    if (slot.bookId && BOOKS[slot.bookId]) {
      bookIds.add(slot.bookId);
    }
  });

  return Array.from(bookIds).map(id => BOOKS[id]);
}
