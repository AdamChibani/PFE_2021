import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import _ from '@lodash';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function LocationSearchInput(props) {
	const importedProps = _.pick(props, [
		'autoComplete',
		'autoFocus',
		'children',
		'className',
		'defaultValue',
		'disabled',
		'FormHelperTextProps',
		'fullWidth',
		'id',
		'InputLabelProps',
		'inputProps',
		'InputProps',
		'inputRef',
		'label',
		'multiline',
		'name',
		'onBlur',
		'onChange',
		'onFocus',
		'placeholder',
		'required',
		'rows',
		'rowsMax',
		'select',
		'SelectProps',
		'type',
		'variant'
	]);

	const [address, setAddress] = useState('');

	const handleChange = address => {
		setAddress(address);
		if (typeof props.handleChange === 'function') {
			props.handleChange(address);
		}
	};

	const handleSelect = address => {
		geocodeByAddress(address)
			.then(async results => {
				return { result: results[0], ltLg: await getLatLng(results[0]) };
			})
			.then(({ result, ltLg }) => {
				const province = result.address_components.find(e => e.types.includes('administrative_area_level_1'));
				const city = result.address_components.find(e => e.types.includes('administrative_area_level_2'));
				const postalCode = result.address_components.find(e => e.types.includes('postal_code'));
				const response = {
					address,
					center: {
						lat: ltLg.lat,
						lng: ltLg.lng
					},
					province: province && province.long_name ? province.long_name : null,
					city: city && city.long_name ? city.long_name : null,
					postalCode: postalCode && postalCode.long_name ? postalCode.long_name : null,
					placeId: result.place_id,
					formattedAddress: result.formatted_address,
					geocode: {
						address_components: result.address_components,
						formatted_address: result.formatted_address,
						place_id: result.place_id,
						plus_code: result.plus_code,
						types: result.types,
						geometry: {
							location: {
								lat: ltLg.lat,
								lng: ltLg.lng
							},
							location_type: result.geometry.location_type,
							viewport: result.geometry.viewport // TODO verify
						}
					}
				};
				console.log('Success', response);
				if (typeof props.handleSelect === 'function') {
					props.handleSelect(response);
				}
			})
			.catch(error => console.error('Error', error));
	};

	return (
		<PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
				return (
					<Autocomplete
						autoComplete
						includeInputInList
						freeSolo
						disableOpenOnFocus
						renderInput={params => {
							return (
								<TextField
									{...importedProps}
									{...getInputProps({
										placeholder: props.placeholder || props.label,
										className: 'location-search-input'
									})}
									{...params}
									label={props.label}
									variant={props.variant || 'outlined'}
									fullWidth
								/>
							);
						}}
						options={suggestions}
						filterOptions={opt => opt}
						getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
						renderOption={option => {
							const { formattedSuggestion } = option;
							const className = option.active ? 'suggestion-item--active' : 'suggestion-item';
							return (
								<Grid container alignItems="center" {...getSuggestionItemProps(option, { className })}>
									<Grid item className="mr-10">
										<LocationOnIcon />
									</Grid>
									<Grid item xs>
										{formattedSuggestion.mainText}
										<Typography variant="body2" color="textSecondary">
											{formattedSuggestion.secondaryText}
										</Typography>
									</Grid>
								</Grid>
							);
						}}
					/>
				);
			}}
		</PlacesAutocomplete>
	);
}

export default LocationSearchInput;
