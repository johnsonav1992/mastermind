import { useAtom, useSetAtom } from 'jotai';
import CodeGuessingArea from '../CodeGuessingArea/CodeGuessingArea';
import PegBucket from '../PegBucket/PegBucket';
import SecretCodeArea from '../SecretCodeArea/SecretCodeArea';
import { gameStateAtom, secretCodeAtom } from '../../state/atoms';
import { generateSecretCode } from '../../utils/secretCodeUtils';
import { css } from '../../../styled-system/css';

const GameBoard = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const setSecretCode = useSetAtom(secretCodeAtom);

	const startGame = () => {
		setGameState('playing');
		setSecretCode(generateSecretCode());
	};

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				alignItems: 'center'
			})}
		>
			<div
				className={css({
					backgroundColor: '#7b4a12',
					width: '250px',
					padding: '20px 10px',
					borderRadius: '10px',
					boxShadow: 'inset 0 0 10px #42210b',
					display: 'flex',
					flexDirection: 'column',
					gap: '6px',
					border: '6px solid #3a1d0d'
				})}
			>
				<SecretCodeArea />
				<CodeGuessingArea />
			</div>
			{gameState === 'notStarted' ? (
				<button
					onClick={startGame}
					className={css({
						padding: '0.75rem 1.5rem',
						fontSize: '1rem',
						fontWeight: 'bold',
						backgroundColor: '#4CAF50',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
						transition: 'background-color 0.3s ease',
						_hover: {
							backgroundColor: '#45a049'
						}
					})}
				>
					Start Game
				</button>
			) : (
				<PegBucket />
			)}
		</div>
	);
};

export default GameBoard;
