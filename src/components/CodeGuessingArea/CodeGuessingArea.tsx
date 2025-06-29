import { useAtom, useAtomValue } from 'jotai';
import {
	emptyPegStyle,
	pegStyle,
	emptyFeedbackPegStyle
} from '../../styles/globalStyles';
import { css } from '../../../styled-system/css';
import {
	activeGuessingRowIndexAtom,
	feedbackRowsAtom,
	playerRowsAtom,
	secretCodeAtom
} from '../../state/atoms';
import type { PegColors } from '../../types/types';
import { feedbackPegColors, pegColors } from '../../constants/pegColors';
import {
	compareGuessedCodeToSecretCode,
	getFeedbackPegsForRow
} from '../../utils/secretCodeUtils';

const CodeGuessingArea = () => {
	const [playerRows, setPlayerRows] = useAtom(playerRowsAtom);
	const [feedbackRows, setFeedbackRows] = useAtom(feedbackRowsAtom);
	const [activeGuessingRowIndex, setActiveGuessingRowIndex] = useAtom(
		activeGuessingRowIndexAtom
	);
	const secretCode = useAtomValue(secretCodeAtom);

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
			const updatedRows = prevRows.map((row, rIndex) =>
				rowIndex === rIndex
					? row.map((peg, pIndex) =>
							pegIndex === pIndex ? { ...peg, color, isFilled: true } : peg
						)
					: row
			);

			const currentRow = updatedRows[rowIndex];
			const isRowComplete = currentRow.every((peg) => peg.isFilled);

			if (isRowComplete) {
				setActiveGuessingRowIndex(rowIndex - 1);

				const howdYaDo = compareGuessedCodeToSecretCode(currentRow, secretCode);

				setFeedbackRows((prevFeedbackRows) =>
					prevFeedbackRows.map((row, rIndex) =>
						rIndex === rowIndex ? getFeedbackPegsForRow(howdYaDo) : row
					)
				);
			}

			return updatedRows;
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
						{feedbackRows[rowIndex].map((feedbackPeg, index) => (
							<div
								key={index}
								className={`${css({
									width: '10px',
									height: '10px',
									borderRadius: '50%',
									position: 'relative',
									overflow: 'hidden'
								})} ${feedbackPeg.isFilled ? '' : emptyFeedbackPegStyle}`}
								style={{
									backgroundColor: feedbackPeg.isFilled
										? feedbackPegColors[
												feedbackPeg.correctColorAndPosition
													? 'correctColorAndPosition'
													: 'correctColorWrongPosition'
											]
										: undefined
								}}
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
