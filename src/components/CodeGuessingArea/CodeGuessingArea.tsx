import { useAtomValue } from 'jotai';
import { emptyPegStyle, pegStyle } from '../../styles/globalStyles';
import { css } from '../../../styled-system/css';
import { playerRowsAtom } from '../../state/atoms';

const CodeGuessingArea = () => {
	const playerRows = useAtomValue(playerRowsAtom);

	return (
		<>
			{playerRows.map((row, rowIndex) => (
				<div
					className={css({
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '2rem',
						backgroundColor: '#5c331260',
						padding: '6px 4px',
						borderRadius: '6px',
						boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.4)'
					})}
					key={rowIndex}
				>
					<div
						className={css({
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 10px)',
							gridTemplateRows: 'repeat(2, 10px)',
							gap: '4px',
							paddingRight: '4px'
						})}
					>
						{Array.from({ length: 4 }).map((_, index) => (
							<div
								key={index}
								className={css({
									width: '10px',
									height: '10px',
									backgroundColor: '#ddd',
									borderRadius: '50%',
									boxShadow: 'inset 0 0 2px #000'
								})}
							/>
						))}
					</div>
					<div
						className={css({
							display: 'flex',
							gap: '10px',
							paddingLeft: '4px'
						})}
					>
						{row.map((peg, pegIndex) => (
							<div
								key={pegIndex}
								className={`${pegStyle} ${peg.isFilled ? '' : emptyPegStyle}`}
								style={{ backgroundColor: peg.color }}
							/>
						))}
					</div>
				</div>
			))}
		</>
	);
};

export default CodeGuessingArea;
