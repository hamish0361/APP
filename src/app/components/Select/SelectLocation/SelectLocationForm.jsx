import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectLocation from './index';
import { useField, useFormikContext } from "formik";

const SelectLocationForm = ({ name, ...props }) => {

    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();
    const { error, touched } = meta;

    const handleClick = () => {
        setFieldTouched(field.name);
    }

    const handleChange = (v) => {
        setFieldValue(name, v);
    }

    return (
        <div className={clsx(touched && error && 'is-invalid')}>
            <SelectLocation
                value={field.value}
                onChange={handleChange}
                onClick={handleClick}
                {...props}
            />

            {touched && error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectLocationForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectLocationForm;