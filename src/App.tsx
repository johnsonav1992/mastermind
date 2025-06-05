import { css } from '@pigment-css/react';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				gap: '1rem'
			})}
		>
			<h1>Mastermind</h1>
			<p>Can you crack the code?</p>
			<GameBoard />
		</div>
	);
}

export default App;
