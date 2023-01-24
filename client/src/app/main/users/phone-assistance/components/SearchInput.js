import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import * as Actions from '../store/actions';

function List() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const searchText = useSelector(({ cPackageApp }) => cPackageApp.searchText);

	return (
		<Input
			placeholder={t('search')}
			className="flex flex-1 mx-8"
			disableUnderline
			fullWidth
			value={searchText}
			inputProps={{
				'aria-label': t('search')
			}}
			onChange = { ({ target }) => dispatch(Actions.setSearchText(target.value)) }
		/>
	);
}

export default List;
