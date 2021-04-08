import React from 'react';

import clsx from 'clsx';

import Select from '../BaseSelect';
import { useField, useFormikContext } from "formik";

import './index.scss';

export default function SelectForm({
    name,
    ...props
}) {

    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();
    const { error, touched } = meta;

    const handleClick = () => {
        setFieldTouched(field.name);
    }

    const handleChange = (v) => {
        setFieldValue(field.name, v.value);
    }

    return (
        <div className={clsx(touched && error && 'is-invalid')}>
            <Select
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