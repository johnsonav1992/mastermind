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
