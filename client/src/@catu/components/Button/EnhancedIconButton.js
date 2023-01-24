import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

function OptionComponent(props) {
	const [loading, setLoading] = useState(false);
	const { title, action, icon, row } = props;
	const handler = ev => {
		ev.stopPropagation();
		setLoading(true);
		action(row).then(() => {
			setLoading(false);
		});
	};
	return (
		<Tooltip title={title}>
			<IconButton onClick={handler} disabled={loading}>
				{loading ? <CircularProgress size={24} /> : <Icon>{icon}</Icon>}
			</IconButton>
		</Tooltip>
	);
}

export default OptionComponent;