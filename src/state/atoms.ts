import { atom } from 'jotai';
import type { Length, Peg } from '../types/types';
import { SECRET_CODE_LENGTH } from '../constants/secretCodeConstants';

export const gameStateAtom = atom<'notStarted' | 'playing' | 'won' | 'lost'>(
	'notStarted'
);

export const secretCodeAtom = atom<Peg[]>(
	Array.from<Length, Peg>({ length: SECRET_CODE_LENGTH }, () => ({
		color: 'black',
		isFilled: false
	}))
);
