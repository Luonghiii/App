import { translations, Language } from '../data/translations';

export const formatTimeAgo = (date: Date, lang: Language, now: Date): string => {
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const t = translations[lang];

  if (seconds < 60) return `${Math.max(0, seconds)} ${t.secondsAgo}`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${t.minutesAgo}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${t.hoursAgo}`;
  const days = Math.floor(hours / 24);
  return `${days} ${t.daysAgo}`;
};
