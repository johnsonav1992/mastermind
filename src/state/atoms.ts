import { atom } from 'jotai';
import type { PegColors } from '../types/types';

export const gameStateAtom = atom<'notStarted' | 'playing' | 'won' | 'lost'>(
  'notStarted'
);
export const secretCodeAtom = atom<PegColors[]>([]);
