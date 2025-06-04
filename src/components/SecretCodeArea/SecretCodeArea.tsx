import { useAtomValue } from 'jotai';
import { pegColors } from '../../constants/pegColors';
import styles from './SecretCodeArea.module.css';
import { secretCodeAtom } from '../../state/atoms';

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
							className={`peg ${!peg.isFilled ? 'empty' : ''}`}
							style={{ backgroundColor: pegColors[peg.color] }}
						></div>
					))}
				</>
			)}
		</div>
	);
};

export default SecretCodeArea;
