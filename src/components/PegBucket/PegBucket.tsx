import { pegColors } from '../../constants/pegColors';
import styles from './PegBucket.module.css';
import type { PegColors } from '../../types/types';
import { pegStyle } from '../../styles/globalStyles';

const colorNames = Object.keys(pegColors) as PegColors[];

interface PegBucketProps {
	onPegSelect?: (color: PegColors) => void;
}

const PegBucket = ({ onPegSelect }: PegBucketProps) => {
	return (
		<div className={styles.pegBucket}>
			<h3 style={{ marginBottom: 18 }}>Choose a Peg</h3>
			<div className={styles.pegList}>
				{colorNames.map((color) => (
					<button
						key={color}
						className={styles.pegButton}
						onClick={() => onPegSelect?.(color)}
					>
						<div
							className={pegStyle}
							style={{ backgroundColor: pegColors[color] }}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default PegBucket;
