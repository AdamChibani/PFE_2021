import React, {useState} from 'react';
import {Slider} from '@material-ui/core';
import {withFormsy} from 'formsy-react';
import _ from '@lodash';

function SliderFormsy(props) {
    
    const importedProps = _.pick(props, [
        'autoComplete',
        'autoFocus',
        'children',
        'className',
        'disabled',
        'disableToolbar',
        'FormHelperTextProps',
        'format',
        'fullWidth',
        'id',
        'InputLabelProps',
        'inputProps',
        'InputProps',
        'inputRef',
        'label',
        'margin',
        'marks',
        'step',
        'max',
        'min',
        'multiline',
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
        'valueLabelDisplay',
        'variant',
    ]);

    // An error message is returned only if the component is invalid
    //const errorMessage = props.getErrorMessage();
    const [value_, setValue_] = useState(props.value) //Need to rerender the component


    function changeValue(event, value) {
        //console.log(value);
        setValue_(value)
    }

    function commitChange(ev,value) {
        props.setValue(value)
        if ( props.onChange ) {
            props.onChange(value);
        }
    }

    return (

        <Slider
            {...importedProps}
            disabled={ importedProps.loading }
            //error={Boolean(errorMessage)}
            value={value_}
            onChange={changeValue}
            onChangeCommitted={commitChange}
        />
    );
}

export default React.memo(withFormsy(SliderFormsy));
