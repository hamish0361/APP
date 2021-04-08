import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectShipmentInfo from './index';
import { useField, useFormikContext } from "formik";

const SelectShipmentInfoForm = ({ value, isDisabled, customer_id, ...props }) => {

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
            <SelectShipmentInfo
                value={field.value}
                onChange={onChange}
                isDisabled={isDisabled}
                customer_id={customer_id}
                onClick={handleClick}
            />

            {touched && error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectShipmentInfoForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectShipmentInfoForm;