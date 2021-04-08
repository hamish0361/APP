import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import SelectGoodsDeliveryStatus from './index';
import { useField, useFormikContext } from "formik";

const SelectGoodsDeliveryStatusForm = ({ name, ...props }) => {

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
            <SelectGoodsDeliveryStatus
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

SelectGoodsDeliveryStatusForm.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    withFeedbackLabel: PropTypes.bool
};

export default SelectGoodsDeliveryStatusForm;