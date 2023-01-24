import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const styles = () => ({
	card: {
		border: '2px dashed gray',
		padding: '1.2rem',
		marginBottom: '1rem',
		backgroundColor: 'white',
		cursor: 'move',
		opacity: 1,
	}
});

const Card = ({ id, text, colId, index, moveCard, classes }) => {
	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: ItemTypes.CATEGORY,
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			if (item.colId === colId) moveCard(dragIndex, hoverIndex, item.colId, colId);
			item.index = hoverIndex;
		}
	});
	const [{ isDragging }, drag] = useDrag({
		item: { type: ItemTypes.CATEGORY, id, index, colId },
		end(item, monitor) {
			const dropCol = monitor.getDropResult();
			if (dropCol && dropCol.colId) moveCard(index, null, colId, dropCol.colId);
		},
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<div className={classes.card} ref={ref} style={{ opacity }}>
			{text}
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(Card);
