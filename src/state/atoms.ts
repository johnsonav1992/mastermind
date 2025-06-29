import { atom } from 'jotai';
import type { FeedbackPeg, GameState, Length, Peg } from '../types/types';
import {
	MAX_GUESSES,
	SECRET_CODE_LENGTH
} from '../constants/secretCodeConstants';

export const defaultPlayerRows = Array.from<Length, Peg[]>(
	Array(MAX_GUESSES),
	() =>
		Array.from<Length, Peg>({ length: SECRET_CODE_LENGTH }, () => ({
			color: 'black',
			isFilled: false
		}))
);

export const defaultFeedbackRows = Array.from<Length, FeedbackPeg[]>(
	Array(MAX_GUESSES),
	() =>
		Array.from<Length, FeedbackPeg>({ length: SECRET_CODE_LENGTH }, () => ({
			correctColorAndPosition: false,
			correctColorWrongPosition: false
		}))
);

export const gameStateAtom = atom<GameState>('notStarted');

export const secretCodeAtom = atom<Peg[]>(
	Array.from<Length, Peg>({ length: SECRET_CODE_LENGTH }, () => ({
		color: 'black',
		isFilled: false
	}))
);

export const playerRowsAtom = atom<Peg[][]>(defaultPlayerRows);
export const feedbackRowsAtom = atom<FeedbackPeg[][]>(defaultFeedbackRows);
export const activeGuessingRowIndexAtom = atom(MAX_GUESSES - 1);
