import React from 'react';
import { useTranslation } from 'react-i18next';

function SecondaryText(props) {
	const { t } = useTranslation();
	const { text } = props;

	return (
		<i style={{color:"grey"}}>{text}</i>
	);
}

export default SecondaryText;
