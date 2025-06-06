import { pegColors } from '../../constants/pegColors';
import styles from './PegBucket.module.css';
import type { PegColors } from '../../types/types';
import { pegStyle } from '../../styles/globalStyles';
import type { DragEvent } from 'react';

const colorNames = Object.keys(pegColors) as PegColors[];

interface PegBucketProps {
	onPegSelect?: (color: PegColors) => void;
}

const handleDragStart = (e: DragEvent<HTMLButtonElement>, color: PegColors) => {
	e.dataTransfer.setData('pegColor', color);
};

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
						onDragStart={(e) => handleDragStart(e, color)} // this isn't triggering
						draggable
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
