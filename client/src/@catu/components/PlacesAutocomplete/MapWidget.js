import React from 'react';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import GoogleMap from 'google-map-react';
import loadGoogleMapsJS from './_loadGoogleMapsJS';

function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">adjust</Icon>
		</Tooltip>
	);
}

function MapWidget(props) {
	const styles = [
		{ featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
		{ featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f2f2f2' }] },
		{ featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
		{ featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] },
		{ featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
		{ featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
		{ featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
		{ featureType: 'water', elementType: 'all', stylers: [{ color: '#039be5' }, { visibility: 'on' }] }
	];

	const { markers } = props;
	const defaultCenter = [markers[0].lat, markers[0].lng];

	return (
		<Card
			className={'w-full rounded-8 shadow-none border-1 ' + (props.className || '')}
			style={{ height: props.height || '350px' }}
		>
			<GoogleMap
				// bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
				defaultZoom={11}
				defaultCenter={defaultCenter}
				center={defaultCenter}
				options={{ styles }}
			>
				{markers.map(marker => (
					<Marker key={marker.label} text={marker.label} lat={marker.lat} lng={marker.lng} />
				))}
			</GoogleMap>
		</Card>
	);
}

export default MapWidget;
