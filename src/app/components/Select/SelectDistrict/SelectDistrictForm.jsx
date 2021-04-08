import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectDistrict from './index';
import { useField, useFormikContext } from "formik";

const SelectDistrictForm = ({ name, ...props }) => {

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
            <SelectDistrict
                value={field.value}
                onChange={handleChange}
                onClick={handleClick}
                province_id={values.province_id}
                {...props}
            />

            {touched && error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectDistrictForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectDistrictForm;