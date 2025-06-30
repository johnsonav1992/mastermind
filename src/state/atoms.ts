import { atom, useSetAtom } from 'jotai';
import type { FeedbackPeg, GameState, Length, Peg } from '../types/types';
import {
	MAX_GUESSES,
	SECRET_CODE_LENGTH
} from '../constants/secretCodeConstants';
import { generateSecretCode } from '../utils/secretCodeUtils';

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

export const useStartNewGame = () => {
	const setGameState = useSetAtom(gameStateAtom);
	const setSecretCode = useSetAtom(secretCodeAtom);
	const setPlayerRows = useSetAtom(playerRowsAtom);
	const setFeedbackRows = useSetAtom(feedbackRowsAtom);
	const setActiveGuessingRowIndex = useSetAtom(activeGuessingRowIndexAtom);

	return () => {
		setGameState('playing');
		setSecretCode(generateSecretCode());
		setPlayerRows(defaultPlayerRows);
		setFeedbackRows(defaultFeedbackRows);
		setActiveGuessingRowIndex(MAX_GUESSES - 1);
	};
};
