import { useAtom, useAtomValue } from 'jotai';
import { emptyPegStyle, pegStyle } from '../../styles/globalStyles';
import { css } from '../../../styled-system/css';
import { activeGuessingRowIndexAtom, playerRowsAtom } from '../../state/atoms';
import type { PegColors } from '../../types/types';
import { pegColors } from '../../constants/pegColors';

const CodeGuessingArea = () => {
	const [playerRows, setPlayerRows] = useAtom(playerRowsAtom);
	const activeGuessingRowIndex = useAtomValue(activeGuessingRowIndexAtom);

	const onDragOverPegHole: React.DragEventHandler = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	const onDropIntoPegHole = (
		e: React.DragEvent<HTMLDivElement>,
		rowIndex: number,
		pegIndex: number
	) => {
		e.preventDefault();
		const color = e.dataTransfer.getData('pegColor') as PegColors;

		setPlayerRows((prevRows) => {
			return prevRows.map((row, rIndex) =>
				rowIndex === rIndex
					? row.map((peg, pIndex) =>
							pegIndex === pIndex ? { ...peg, color, isFilled: true } : peg
						)
					: row
			);
		});
	};

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
						boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.4)',
						pointerEvents: rowIndex !== activeGuessingRowIndex ? 'none' : 'auto'
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
								className={`${pegStyle} ${peg.isFilled ? '' : emptyPegStyle} ${css(
									{
										_hover: {
											cursor: 'default !important',
											boxShadow:
												'inset 0 0 3px #000, 0 1px 2px #222, 3px 3px 6px rgba(0, 0, 0, 0.5) !important',
											transform: 'none !important',
											transition: 'none !important'
										}
									}
								)}`}
								style={{
									backgroundColor: pegColors[peg.color],
									cursor: 'default'
								}}
								onDragOver={onDragOverPegHole}
								onDrop={(e) => onDropIntoPegHole(e, rowIndex, pegIndex)}
							/>
						))}
					</div>
				</div>
			))}
		</>
	);
};

export default CodeGuessingArea;
