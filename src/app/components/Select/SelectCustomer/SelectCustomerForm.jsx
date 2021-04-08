import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectCustomer from './index';
import { useField, useFormikContext } from "formik";

const SelectCustomerForm = ({ name, ...props }) => {

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
            <SelectCustomer
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

SelectCustomerForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectCustomerForm;