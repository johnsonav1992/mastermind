import { useAtom, useSetAtom } from 'jotai';
import CodeGuessingArea from '../CodeGuessingArea/CodeGuessingArea';
import PegBucket from '../PegBucket/PegBucket';
import SecretCodeArea from '../SecretCodeArea/SecretCodeArea';
import styles from './GameBoard.module.css';
import { gameStateAtom, secretCodeAtom } from '../../state/atoms';
import { generateSecretCode } from '../../utils/secretCodeUtils';

const GameBoard = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const setSecretCode = useSetAtom(secretCodeAtom);

	const startGame = () => {
		setGameState('playing');
		setSecretCode(generateSecretCode());
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				alignItems: 'center'
			}}
		>
			<div className={styles.gameBoardOuter}>
				<SecretCodeArea />
				<CodeGuessingArea />
			</div>
			{gameState === 'notStarted' ? (
				<button
					onClick={startGame}
					style={{
						padding: '0.75rem 1.5rem',
						fontSize: '1rem',
						fontWeight: 'bold',
						backgroundColor: '#4CAF50',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
						transition: 'background-color 0.3s ease'
					}}
					onMouseOver={(e) =>
						(e.currentTarget.style.backgroundColor = '#45a049')
					}
					onMouseOut={(e) =>
						(e.currentTarget.style.backgroundColor = '#4CAF50')
					}
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
