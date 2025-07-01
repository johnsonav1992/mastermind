export type Length = { length: number };

export type GameState = 'notStarted' | 'playing' | 'won' | 'lost';

export type PegColors = 'white' | 'black' | 'red' | 'green' | 'blue' | 'yellow';
export type FeedbackColors = Extract<PegColors, 'white' | 'black'>;

export type Peg = {
	color: PegColors;
	isFilled?: boolean;
};

export type FeedbackPeg = {
	isFilled?: boolean;
	correctColorAndPosition: boolean;
	correctColorWrongPosition: boolean;
};

export type HowdYaDoResult = {
	correctColorAndPosition: number;
	correctColorWrongPosition: number;
};
