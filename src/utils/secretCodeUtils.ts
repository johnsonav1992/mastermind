import type { Peg, PegColors } from '../types/types';

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
): { correctColorAndPosition: number; correctColorWrongPosition: number } => {
	let correctColorAndPosition = 0;
	let correctColorWrongPosition = 0;

	const secretCodeColors = secretCode.map((peg) => peg.color);
	const guessedCodeColors = guessedCode.map((peg) => peg.color);

	guessedCodeColors.forEach((color, index) => {
		if (color === secretCodeColors[index]) {
			correctColorAndPosition++;
		} else if (secretCodeColors.includes(color)) {
			correctColorWrongPosition++;
		}
	});

	return { correctColorAndPosition, correctColorWrongPosition };
};

export const getFeedbackPegsForRow = (feedbackResult: {
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
