import levenshtein from 'js-levenshtein';
import { shuffle } from '@pacote/shuffle';
import { LocalStorage } from 'node-persist';
import { StorageItem } from '../types';

export const weeksUntilNow = (date: Date): number => 
  Math.round((new Date().getTime() - date.getTime()) / 604800000);

export const areEquivalents = (realDescription: string, currentDescription: string): boolean => {
  const distance = levenshtein(realDescription, currentDescription);
  const diffPercent = Math.round(currentDescription.length / 100 * 27);

  return distance <= diffPercent;
};

export const getWordsForToday = async (storage: LocalStorage): Promise<StorageItem[]> => {
  const items: StorageItem[] = [];
  const storageData = await storage.data() as StorageItem[];

  for (const item of storageData) {
    const { value: { phaseDate, phase } } = item;
    const weeks = weeksUntilNow(new Date(phaseDate));

    if (weeks === phase || phase === 1) {
      items.push(item);
    }
  }

  return items;
};

export const getRandomWords = async (storage: LocalStorage): Promise<StorageItem[]> => {
  const data = await storage.data() as StorageItem[];

  return shuffle(data);
};
