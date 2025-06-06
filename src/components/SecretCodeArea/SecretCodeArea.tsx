import { useAtomValue } from 'jotai';
import { pegColors } from '../../constants/pegColors';
import styles from './SecretCodeArea.module.css';
import { secretCodeAtom } from '../../state/atoms';
import { emptyPegStyle, pegStyle } from '../../styles/globalStyles';

const SecretCodeArea = () => {
	const secretCode = useAtomValue(secretCodeAtom);
	const isGameInProgress = false;

	return (
		<div className={styles.codeRow}>
			{isGameInProgress ? (
				<div className={styles.codeCover} />
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
