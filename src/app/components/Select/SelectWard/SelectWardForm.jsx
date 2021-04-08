import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectWard from './index';
import { useField, useFormikContext } from "formik";

const SelectWardForm = ({ name, ...props }) => {

    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue, values } = useFormikContext();
    const { error, touched } = meta;

    const handleClick = () => {
        setFieldTouched(field.name);
    }

    const handleChange = (v) => {
        setFieldValue(name, v);
    }

    return (
        <div className={clsx(touched && error && 'is-invalid')}>
            <SelectWard
                value={field.value}
                onChange={handleChange}
                onClick={handleClick}
                district_id={values.district_id}
                {...props}
            />

            {touched && error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectWardForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectWardForm;