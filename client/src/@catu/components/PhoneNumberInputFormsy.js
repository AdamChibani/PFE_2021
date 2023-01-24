import React from 'react';
import {TextField} from '@material-ui/core';
import {withFormsy} from 'formsy-react';
import _ from '@lodash';
import ReactPhoneInput from 'react-phone-input-mui';

function PhoneNumberInputFormsy(props) {
    const importedProps = _.pick(props, [
        'autoComplete',
        'autoFocus',
        'children',
        'className',
        'defaultCountry',
        'disabled',
        'disableToolbar',
        'dropdownClass',
        'FormHelperTextProps',
        'format',
        'fullWidth',
        'id',
        'inputClass',
        'inputExtraProps',
        'InputLabelProps',
        'inputProps',
        'InputProps',
        'inputRef',
        'label',
        'loading',
        'margin',
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
        'variant',
    ]);

    // An error message is returned only if the component is invalid
    const errorMessage = props.errorMessage
    const value = props.value;
    //console.log(value);
    function changeValue(value) {
        //console.log(event);
        props.setValue(value);
        if ( props.onChange ) {
            props.onChange(value);
        }
    }

    return (

        <ReactPhoneInput
            {...importedProps}
            value={value}
            onChange={changeValue}
            component={TextField}
            error={Boolean(errorMessage)}
            disabled={importedProps.loading}
            containerStyle={{
                width: '100%'
            }}
        />
    );
}

export default React.memo(withFormsy(PhoneNumberInputFormsy));
