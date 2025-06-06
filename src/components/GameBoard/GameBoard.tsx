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
						fontSize: '1.25rem',
						fontWeight: 'bold',
						backgroundImage: 'linear-gradient(45deg, #FFD700, #FFA500)',
						color: 'black',
						border: '3px solid #3a1d0d',
						borderRadius: '8px',
						cursor: 'pointer',
						boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
						transition: 'all 0.2s ease',
						_hover: {
							backgroundImage: 'linear-gradient(45deg, #FFE44D, #FFB52E)',
							transform: 'translateY(-2px)'
						},
						_active: {
							transform: 'translateY(1px)'
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
