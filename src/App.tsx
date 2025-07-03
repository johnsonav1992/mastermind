import GameBoard from './components/GameBoard/GameBoard';
import { css } from '../styled-system/css';
import { useAtomValue } from 'jotai';
import { gameStateAtom } from './state/atoms';

function App() {
	const gameState = useAtomValue(gameStateAtom);

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				gap: '.5rem'
			})}
		>
			<h1
				className={css({
					fontSize: { base: '2rem', sm: '2.5rem', md: '3.5rem' },
					fontWeight: 'bold',
					color: '#5D1049',
					textAlign: 'center',
					marginBottom: { base: '0.5rem', md: '1rem' },
					textTransform: 'uppercase',
					letterSpacing: { base: '0.05em', md: '0.1em' },
					textShadow:
						'3px 3px 6px rgba(0, 0, 0, 0.4), 0 0 10px rgba(93, 16, 73, 0.3)',
					position: 'relative',
					padding: { base: '0.3rem 1rem', md: '0.5rem 1.5rem' },
					background: 'linear-gradient(45deg, #FFD700, #FFA500)',
					borderRadius: '10px',
					border: '3px solid #3a1d0d',
					transform: { base: 'rotate(-1deg)', md: 'rotate(-2deg)' },
					maxWidth: '90%',
					display:
						gameState === 'playing' ? { base: 'none', md: 'block' } : 'block'
				})}
			>
				Mastermind
			</h1>
			<p
				className={css({
					fontSize: { base: '1rem', md: '1.2rem' },
					color: '#5D1049',
					textAlign: 'center',
					marginBottom: '.5rem',
					fontStyle: 'italic',
					opacity: 0.8,
					letterSpacing: '0.03em',
					textShadow: '0px 0px 1px rgba(0, 0, 0, 0.1)',
					padding: '0.25rem 1rem',
					maxWidth: '95%'
				})}
			>
				{gameState === 'won'
					? '🎉 Congratulations! You cracked the code!'
					: gameState === 'lost'
						? '💀 Game Over! Better luck next time!'
						: 'Can you crack the code?'}
			</p>
			<GameBoard />
		</div>
	);
}

export default App;
