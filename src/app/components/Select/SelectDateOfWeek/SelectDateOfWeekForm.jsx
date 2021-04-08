import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectDateOfWeek from './index';
import { useField, useFormikContext } from "formik";

const SelectDateOfWeekForm = ({ name, ...props }) => {

    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();
    const { error, touched } = meta;

    const handleClick = () => {
        setFieldTouched(field.name);
    }

    const handleChangeCustomer = (v) => {
        setFieldValue(field.name, v);
    }

    return (
        <div className={clsx(touched && error && 'is-invalid')}>
            <SelectDateOfWeek
                value={field.value}
                onChange={handleChangeCustomer}
                onClick={handleClick}
                {...props}
            />

            {touched && error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectDateOfWeekForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectDateOfWeekForm;