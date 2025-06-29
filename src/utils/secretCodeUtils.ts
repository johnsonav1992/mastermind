import type { GameState, HowdYaDoResult, Peg, PegColors } from '../types/types';

export const generateSecretCode = (): Peg[] => {
	const colors: PegColors[] = [
		'red',
		'green',
		'blue',
		'yellow',
		'black',
		'white'
	];
	const secretCode: Peg[] = [];
	const codeLength = 4;

	for (let i = 0; i < codeLength; i++) {
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		secretCode.push({ color: randomColor, isFilled: true });
	}

	return secretCode;
};

export const compareGuessedCodeToSecretCode = (
	guessedCode: Peg[],
	secretCode: Peg[]
): HowdYaDoResult => {
	const guessedColors = guessedCode.map((peg) => peg.color);
	const secretColors = secretCode.map((peg) => peg.color);

	const correctColorAndPosition = guessedColors.filter(
		(color, position) => color === secretColors[position]
	).length;

	const unpairedGuessedColors: Record<string, number> = {};
	const unpairedSecretColors: Record<string, number> = {};

	guessedColors.forEach((color, position) => {
		if (color !== secretColors[position]) {
			unpairedGuessedColors[color] = (unpairedGuessedColors[color] || 0) + 1;
		}
	});

	secretColors.forEach((color, position) => {
		if (color !== guessedColors[position]) {
			unpairedSecretColors[color] = (unpairedSecretColors[color] || 0) + 1;
		}
	});

	const correctColorWrongPosition = Object.keys(unpairedGuessedColors).reduce(
		(total, color) =>
			total +
			Math.min(unpairedGuessedColors[color], unpairedSecretColors[color] || 0),
		0
	);

	return {
		correctColorAndPosition,
		correctColorWrongPosition
	};
};

export const getFeedbackPegsForCurrentGuessingRow = (feedbackResult: {
	correctColorAndPosition: number;
	correctColorWrongPosition: number;
}) => {
	return Array.from({ length: 4 }, (_, pegIndex) => ({
		isFilled:
			pegIndex <
			feedbackResult.correctColorAndPosition +
				feedbackResult.correctColorWrongPosition,
		correctColorAndPosition: pegIndex < feedbackResult.correctColorAndPosition,
		correctColorWrongPosition:
			pegIndex >= feedbackResult.correctColorAndPosition &&
			pegIndex <
				feedbackResult.correctColorAndPosition +
					feedbackResult.correctColorWrongPosition
	}));
};

export const checkGameState = (
	lastFeedback: HowdYaDoResult,
	activeGuessingRowIndex: number
): GameState => {
	if (lastFeedback.correctColorAndPosition === 4) return 'won';

	if (activeGuessingRowIndex <= 0) return 'lost';

	return 'playing';
};
