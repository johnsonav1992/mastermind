import { pegColors } from '../../constants/pegColors';
import { css } from '../../../styled-system/css';
import type { PegColors } from '../../types/types';
import { pegStyle } from '../../styles/globalStyles';
import type { DragEvent } from 'react';

const colorNames = Object.keys(pegColors) as PegColors[];

interface PegBucketProps {
	onPegSelect?: (color: PegColors) => void;
}

const handleDragStart = (e: DragEvent<HTMLDivElement>, color: PegColors) => {
	e.dataTransfer.setData('pegColor', color);
};

const PegBucket = ({ onPegSelect }: PegBucketProps) => {
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
						className={pegStyle}
						style={{ backgroundColor: pegColors[color] }}
						onClick={() => onPegSelect?.(color)}
						onDragStart={(e) => handleDragStart(e, color)}
						draggable
					/>
				))}
			</div>
		</div>
	);
};

export default PegBucket;
