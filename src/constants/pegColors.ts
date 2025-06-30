import type { PegColors } from '../types/types';

export const pegColors = {
	blue: '#207bae',
	red: '#c81a38',
	green: '#19b66a',
	yellow: '#fce653',
	black: '#000000',
	white: '#FFFFFF'
};

export const colorNames = Object.keys(pegColors) as PegColors[];

export const feedbackPegColors = {
	correctColorAndPosition: pegColors.black,
	correctColorWrongPosition: pegColors.white
};
