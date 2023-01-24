import React, { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { withStyles } from '@material-ui/core/styles';
import Container from './Container';
import update from 'immutability-helper';

const styles = () => ({
	root: {
		display: 'flex',
		justifyContent: 'space-around',
		marginBottom: '20px',
	}
});

function ItemsSortComponent(props) {
	const { classes, data } = props;

	const [columns, setColumns] = useState([]);

	useEffect(() => {
		let temp = [];
		for (let item of data) {
			if (!Array.isArray(temp[item.column])) temp[item.column] = [];
			temp[item.column].push(item);
		}
		setColumns(temp);
	}, [data]);

	useEffect(() => {
		if (typeof props.onChange === "function") {
			props.onChange(columns);
		}
	}, [columns]);

	const moveCard = useCallback(
		(dragIndex, hoverIndex, dragCol, hoverCol) => {
			console.log({ dragIndex, hoverIndex, dragCol, hoverCol });
			if (dragCol === hoverCol) {
				const dragCard = columns[dragCol][dragIndex];
				const col = update(columns[dragCol], {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard]
					]
				});
				setColumns(columns.map((element, key) => {
					if (key === dragCol) {
						return col
					}
					return element
				}));
			} else {
				const hCal = update(columns[hoverCol], {
					$push: [columns[dragCol][dragIndex]] //c[1][1]
				});
				const dCal = update(columns[dragCol], {
					$splice: [[dragIndex, 1]]
				});
				setColumns(
					columns.map((element, key) => {
						if (key === dragCol) return dCal;
						else if (key === hoverCol) return hCal;
						return element;
					})
				);
			}
		},
		[columns]
	);

	return (
		<DndProvider backend={Backend}>
			<div className={classes.root}>
				{columns.map((colum, key) => (
					<Container id={key} key={key} colId={key} list={colum} moveCard={moveCard} />
				))}
			</div>
		</DndProvider>
	);
}

export default withStyles(styles, { withTheme: true })(ItemsSortComponent);
