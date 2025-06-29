import { useAtomValue } from 'jotai';
import { pegColors } from '../../constants/pegColors';
import { gameStateAtom, secretCodeAtom } from '../../state/atoms';
import { emptyPegStyle, pegStyle } from '../../styles/globalStyles';
import { css } from '../../../styled-system/css';

const SecretCodeArea = () => {
	const secretCode = useAtomValue(secretCodeAtom);
	const gameState = useAtomValue(gameStateAtom);
	const isGameInProgress =
		gameState === 'playing' || gameState === 'notStarted';

	return (
		<div
			className={css({
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '10px',
				marginBottom: '16px',
				borderRadius: '6px',
				border: '2px solid #3a1d0d',
				width: '150px',
				height: '40px',
				marginLeft: '68px'
			})}
		>
			{isGameInProgress ? (
				<div
					className={css({
						width: '150px',
						height: '36px',
						backgroundColor: '#5c3312',
						borderRadius: '4px',
						boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.4)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					})}
				/>
			) : (
				<>
					{secretCode.map((peg, i) => (
						<div
							key={i}
							className={`${pegStyle} ${!peg.isFilled ? emptyPegStyle : ''}`}
							style={{ backgroundColor: pegColors[peg.color] }}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default SecretCodeArea;
