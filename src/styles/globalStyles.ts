import { css } from '../../styled-system/css';

export const pegStyle = css({
	width: '24px',
	height: '24px',
	backgroundColor: 'black',
	borderRadius: '50%',
	boxShadow:
		'inset 0 0 3px #000, 0 1px 2px #222, 3px 3px 6px rgba(0, 0, 0, 0.5)',
	position: 'relative',
	overflow: 'hidden',
	_hover: {
		cursor: 'pointer',
		boxShadow:
			'inset 0 0 5px #000, 0 1px 2px #222, 3px 3px 6px rgba(0, 0, 0, 0.7)',
		transform: 'scale(1.2)',
		transition: 'transform 0.2s ease-in-out'
	},
	_after: {
		content: "''",
		position: 'absolute',
		width: '35%',
		height: '35%',
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		borderRadius: '50%',
		top: '15%',
		left: '15%',
		filter: 'blur(1px)'
	}
});

export const emptyPegStyle = css({
	backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
	boxShadow:
		'inset 0 2px 5px rgba(0, 0, 0, 0.7), inset 0 5px 10px rgba(0, 0, 0, 0.4), 3px 3px 5px rgba(0, 0, 0, 0.3)',
	border: '1px solid rgba(0, 0, 0, 0.5)',
	_after: {
		display: 'none'
	}
});
