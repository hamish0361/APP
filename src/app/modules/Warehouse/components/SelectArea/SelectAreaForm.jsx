import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectArea from './index';
import { useField, useFormikContext } from "formik";

const SelectAreaForm = ({ name, ...props }) => {

    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();
    const { error } = meta;

    const handleClick = () => {
        setFieldTouched(field.name);
    }

    const handleChange = (v) => {
        setFieldValue(name, v);
    }

    return (
        <div className={clsx(error && 'is-invalid')}>
            <SelectArea
                value={field.value}
                onChange={handleChange}
                onClick={handleClick}
                {...props}
            />

            {error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectAreaForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectAreaForm;