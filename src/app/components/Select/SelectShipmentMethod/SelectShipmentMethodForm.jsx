import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectShipmentMethod from './index';
import { useField, useFormikContext } from "formik";

const SelectShipmentMethodForm = ({ value, isDisabled, customer_id, ...props }) => {

    const [field, meta, helpers] = useField(props);
    const { setFieldTouched } = useFormikContext();
    const { error, touched } = meta;

    const handleClick = () => {
        setFieldTouched(field.name);
    }

    const onChange = (v) => {
        helpers.setValue(v);
    }

    return (
        <div className={clsx(touched && error && 'is-invalid')}>
            <SelectShipmentMethod
                value={field.value}
                onChange={onChange}
                isDisabled={isDisabled}
                onClick={handleClick}
                {...props}
            />

            {error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectShipmentMethodForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectShipmentMethodForm;