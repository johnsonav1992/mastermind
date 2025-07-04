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
	gameStateAtom,
	playerRowsAtom,
	secretCodeAtom
} from '../../state/atoms';
import type { PegColors } from '../../types/types';
import {
	feedbackPegColors,
	pegColors,
	colorNames
} from '../../constants/pegColors';
import {
	checkGameState,
	compareGuessedCodeToSecretCode,
	getFeedbackPegsForCurrentGuessingRow
} from '../../utils/secretCodeUtils';
import type { DragEvent, DragEventHandler } from 'react';

const CodeGuessingArea = () => {
	const [playerRows, setPlayerRows] = useAtom(playerRowsAtom);
	const [feedbackRows, setFeedbackRows] = useAtom(feedbackRowsAtom);
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const [activeGuessingRowIndex, setActiveGuessingRowIndex] = useAtom(
		activeGuessingRowIndexAtom
	);
	const secretCode = useAtomValue(secretCodeAtom);

	const onDragOverPegHole: DragEventHandler = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	const onDropIntoPegHole = (
		e: DragEvent<HTMLDivElement>,
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
				const didYaWinOrLoseYet = checkGameState(
					howdYaDo,
					activeGuessingRowIndex
				);

				setGameState(didYaWinOrLoseYet);

				setFeedbackRows((prevFeedbackRows) =>
					prevFeedbackRows.map((row, rIndex) =>
						rIndex === rowIndex
							? getFeedbackPegsForCurrentGuessingRow(howdYaDo)
							: row
					)
				);
			}

			return updatedRows;
		});
	};

	const handlePegClick = (rowIndex: number, pegIndex: number) => {
		if (gameState !== 'playing' || rowIndex !== activeGuessingRowIndex) return;

		const peg = playerRows[rowIndex][pegIndex];

		if (!peg.isFilled) return;

		const currentColorIndex = colorNames.indexOf(peg.color);
		const nextColorIndex = (currentColorIndex + 1) % colorNames.length;
		const nextColor = colorNames[nextColorIndex];

		setPlayerRows((prevRows) => {
			const updatedRows = prevRows.map((row, rIndex) =>
				rowIndex === rIndex
					? row.map((p, pIndex) =>
							pegIndex === pIndex ? { ...p, color: nextColor } : p
						)
					: row
			);

			return updatedRows;
		});
	};

	const handleSubmitRow = (rowIndex: number) => {
		const currentRow = playerRows[rowIndex];
		const isRowComplete = currentRow.every((peg) => peg.isFilled);

		if (!isRowComplete) return;

		setActiveGuessingRowIndex(rowIndex - 1);

		const howdYaDo = compareGuessedCodeToSecretCode(currentRow, secretCode);
		const didYaWinOrLoseYet = checkGameState(howdYaDo, activeGuessingRowIndex);

		setGameState(didYaWinOrLoseYet);

		setFeedbackRows((prevFeedbackRows) =>
			prevFeedbackRows.map((row, rIndex) =>
				rIndex === rowIndex
					? getFeedbackPegsForCurrentGuessingRow(howdYaDo)
					: row
			)
		);
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
						pointerEvents:
							rowIndex !== activeGuessingRowIndex || gameState !== 'playing'
								? 'none'
								: 'auto',
						position: 'relative'
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
						{row.map((peg, pegIndex) => {
							const isClickable =
								peg.isFilled &&
								rowIndex === activeGuessingRowIndex &&
								gameState === 'playing';

							return (
								<div
									key={pegIndex}
									className={`${pegStyle} ${peg.isFilled ? '' : emptyPegStyle} ${css(
										{
											cursor: isClickable ? 'pointer' : 'default',
											_hover: {
												cursor: isClickable ? 'pointer' : 'default',
												transform: 'none',
												boxShadow:
													'inset 0 0 3px #000, 0 1px 2px #222, 3px 3px 6px rgba(0, 0, 0, 0.5)'
											}
										}
									)}`}
									style={{
										backgroundColor: pegColors[peg.color]
									}}
									onDragOver={onDragOverPegHole}
									onDrop={(e) => onDropIntoPegHole(e, rowIndex, pegIndex)}
									onClick={() => handlePegClick(rowIndex, pegIndex)}
								/>
							);
						})}
					</div>
					{(() => {
						const isRowComplete = row.every((peg) => peg.isFilled);
						const isActiveRow = rowIndex === activeGuessingRowIndex;
						const shouldShowSubmit =
							isRowComplete && isActiveRow && gameState === 'playing';

						return shouldShowSubmit ? (
							<div
								className={css({
									position: 'absolute',
									top: '50%',
									right: '-35px',
									transform: 'translate(50%, -50%)',
									pointerEvents: 'auto',
									width: '24px',
									height: '24px',
									borderRadius: '50%',
									backgroundColor: '#22c55e',
									display: { base: 'flex', md: 'none' },
									alignItems: 'center',
									justifyContent: 'center',
									color: 'white',
									fontSize: '14px',
									cursor: 'pointer',
									transition: 'transform 0.1s ease',
									_hover: {
										transform: 'translate(50%, -50%) scale(1.1)'
									},
									_active: {
										transform: 'translate(50%, -50%) scale(0.95)'
									}
								})}
								onClick={() => handleSubmitRow(rowIndex)}
							>
								✓
							</div>
						) : null;
					})()}
				</div>
			))}
		</>
	);
};

export default CodeGuessingArea;
