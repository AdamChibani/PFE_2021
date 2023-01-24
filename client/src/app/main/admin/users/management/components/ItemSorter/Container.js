import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import ItemTypes from './ItemTypes';
import { useTranslation } from 'react-i18next';

const styles = () => ({
	container: {
		width: '400px',
		background: '#f3f3f3',
		padding: '2rem 2rem 1rem 2rem',
	}
});

function selectBackgroundColor(isActive, canDrop) {
	if (isActive) {
		return '#a7d8a9';
	} else if (canDrop) {
		return '#bdbdbd';
	} else {
		return '#f3f3f3';
	}
}

const Container = ({ list, colId, moveCard, classes }) => {
	const { t } = useTranslation();

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.CATEGORY,
		drop: () => ({ colId }),
		canDrop: item => {
			if (item.colId === colId) return false;
			return true;
		},
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	});
	const isActive = canDrop && isOver;
	const backgroundColor = selectBackgroundColor(isActive, canDrop);

	const renderCard = (card, index) => {
		if (!card) return <></>;
		return (
			<Card
				key={card.categoryId}
				index={index}
				colId={colId}
				id={card.categoryId}
				text={card.categoryName}
				moveCard={moveCard}
			/>
		);
	};

	return (
		<div
			ref={drop}
			className={clsx({
				[classes.container]: true,
				['flex justify-center items-center']: list.length <= 0
			})}
			style={{ backgroundColor }}
		>
			{list.length > 0 ? (
				list.map((card, i) => renderCard(card, i))
			) : (
				<div className="opacity-50 italic">{t('App:drop_items_here')}</div>
			)}
		</div>
	);
};

export default withStyles(styles, { withTheme: true })(Container);
