import { useAtom } from 'jotai';
import { emptyPegStyle, pegStyle } from '../../styles/globalStyles';
import styles from './CodeGuessingArea.module.css';
import { playerRowsAtom } from '../../state/atoms';

const CodeGuessingArea = () => {
	const [playerRows, setPlayerRows] = useAtom(playerRowsAtom);

	return (
		<>
			{playerRows.map((row, rowIndex) => (
				<div className={styles.row} key={rowIndex}>
					<div className={styles.feedback}>
						<div className={styles.feedbackPeg} />
						<div className={styles.feedbackPeg} />
						<div className={styles.feedbackPeg} />
						<div className={styles.feedbackPeg} />
					</div>
					<div className={styles.guess}>
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
