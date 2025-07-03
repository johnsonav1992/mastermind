import { colorNames, pegColors } from '../../constants/pegColors';
import { css } from '../../../styled-system/css';
import type { PegColors } from '../../types/types';
import { pegStyle } from '../../styles/globalStyles';
import type { DragEvent } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
	playerRowsAtom,
	activeGuessingRowIndexAtom,
	gameStateAtom,
	feedbackRowsAtom,
	secretCodeAtom
} from '../../state/atoms';
import {
	checkGameState,
	compareGuessedCodeToSecretCode,
	getFeedbackPegsForCurrentGuessingRow
} from '../../utils/secretCodeUtils';

const PegBucket = () => {
	const [playerRows, setPlayerRows] = useAtom(playerRowsAtom);
	const [, setFeedbackRows] = useAtom(feedbackRowsAtom);
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const [activeGuessingRowIndex, setActiveGuessingRowIndex] = useAtom(
		activeGuessingRowIndexAtom
	);
	const secretCode = useAtomValue(secretCodeAtom);

	const handleDragStart = (e: DragEvent<HTMLDivElement>, color: PegColors) => {
		e.dataTransfer.setData('pegColor', color);
	};

	const handlePegTap = (color: PegColors) => {
		if (gameState !== 'playing' || activeGuessingRowIndex < 0) return;

		const currentRow = playerRows[activeGuessingRowIndex];
		const nextEmptyPegIndex = currentRow.findIndex((peg) => !peg.isFilled);

		if (nextEmptyPegIndex === -1) return;

		setPlayerRows((prevRows) => {
			const updatedRows = prevRows.map((row, rIndex) =>
				rIndex === activeGuessingRowIndex
					? row.map((peg, pIndex) =>
							pIndex === nextEmptyPegIndex
								? { ...peg, color, isFilled: true }
								: peg
						)
					: row
			);

			const updatedCurrentRow = updatedRows[activeGuessingRowIndex];
			const isRowComplete = updatedCurrentRow.every((peg) => peg.isFilled);

			if (isRowComplete) {
				setActiveGuessingRowIndex(activeGuessingRowIndex - 1);

				const howdYaDo = compareGuessedCodeToSecretCode(
					updatedCurrentRow,
					secretCode
				);
				const didYaWinOrLoseYet = checkGameState(
					howdYaDo,
					activeGuessingRowIndex
				);

				setGameState(didYaWinOrLoseYet);

				setFeedbackRows((prevFeedbackRows) =>
					prevFeedbackRows.map((row, rIndex) =>
						rIndex === activeGuessingRowIndex
							? getFeedbackPegsForCurrentGuessingRow(howdYaDo)
							: row
					)
				);
			}

			return updatedRows;
		});
	};

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				background: '#f5e6c8',
				borderRadius: '10px',
				padding: '1rem',
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
				minWidth: '90px',
				height: 'fit-content',
				justifyContent: 'flex-start'
			})}
		>
			<h3 style={{ marginBottom: 12, fontWeight: 600 }}>Choose a Peg</h3>
			<div
				className={css({
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gridTemplateRows: 'repeat(2, auto)',
					gap: '18px',
					marginTop: '0',
					alignItems: 'center',
					justifyItems: 'center'
				})}
			>
				{colorNames.map((color) => (
					<div
						key={color}
						className={`${pegStyle} ${css({
							cursor: 'pointer',
							transition: 'transform 0.1s ease, box-shadow 0.1s ease',
							_hover: {
								transform: 'scale(1.05)',
								boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
							},
							_active: {
								transform: 'scale(0.95)',
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
							}
						})}`}
						style={{ backgroundColor: pegColors[color] }}
						onDragStart={(e) => handleDragStart(e, color)}
						onClick={() => handlePegTap(color)}
						draggable
					/>
				))}
			</div>
		</div>
	);
};

export default PegBucket;
