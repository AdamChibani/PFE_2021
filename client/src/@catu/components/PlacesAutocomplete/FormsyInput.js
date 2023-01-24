import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import _ from '@lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { withFormsy } from 'formsy-react';
import loadGoogleMapsJS from './_loadGoogleMapsJS';

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

	const { errorMessage, value } = props;

	let defautValue = '';
	if (value) {
		defautValue = value.address || value.formattedAddress || ''
	}
	console.log('defautValue', defautValue);
	const [address, setAddress] = useState(defautValue);
	const [jsApiLoaded, setJsApiLoaded] = useState(false);
	
	useEffect(() => {
		console.log('defautValue changed');
		if (defautValue !== address) {
			setAddress(defautValue);
		}
	}, [defautValue]);
	
	if (!jsApiLoaded) {
		setJsApiLoaded(true);
		loadGoogleMapsJS()
			.then(() => setJsApiLoaded(true))
			.catch(error => {
				setJsApiLoaded(false);
				if (process.env.NODE_ENV !== 'production') console.error(error);
			});
	}

	const handleChange = adrs => {
		console.log(`handleChange( ${adrs} )`);
		setAddress(adrs);
		if (adrs === '') { updateParent(null); }
	};

	const updateParent = response => {
		console.log(`updateParent()`, response);
		props.setValue(response);
		if (typeof props.onChange === 'function') {
			props.onChange(response);
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
				if (process.env.NODE_ENV !== 'production') console.log('Success', response);
				updateParent(response);
			})
			.catch(error => { if (process.env.NODE_ENV !== 'production') console.error(error); });
	};

	return (
		<PlacesAutocomplete
			value={address}
			onChange={handleChange}
			onSelect={handleSelect}
			googleCallbackName="_loadGoogleMapsJS"
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
				return (
					<Autocomplete
						autoComplete
						includeInputInList
						freeSolo
						disableOpenOnFocus
						value={address}
						renderInput={params => {
							return (
								<TextField
									{...importedProps}
									{...getInputProps({
										placeholder: props.placeholder || props.label,
										className: 'location-search-input'
									})}
									{...params}
									value={address}
									label={props.label}
									variant={props.variant || 'outlined'}
									error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
									helperText={errorMessage}
								/>
							);
						}}
						onInputChange={(e, value, reason) => {
							if (reason === 'clear') updateParent(null);
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
export default React.memo(withFormsy(LocationSearchInput));