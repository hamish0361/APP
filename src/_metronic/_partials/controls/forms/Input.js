import React, { useEffect, useMemo, useRef } from 'react';
import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import _ from 'lodash';

const getFieldCSSClasses = (touched, errors) => {
    const classes = ['form-control'];
    if (touched && errors) {
        classes.push('is-invalid');
    }

    if (touched && !errors) {
        classes.push('is-valid');
    }

    return classes.join(' ');
};

export function Input({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    withFeedbackLabel = true,
    customFeedbackLabel,
    type = 'text',
    autoFocus = false,
    ...props
}) {

    const inputRef = useRef();

    useEffect(() => {
        if (autoFocus && inputRef?.current) inputRef.current.focus();
    }, []); // eslint-disable-line

    const handleFocus = (e) => {
        if (type === 'number') e.target.select();
    }

    const autoComplete = useMemo(() => {

        if (type === 'password') return 'off';
        if (type === 'number') return 'off';

        return 'on';
    }, [type]);

    return (
        <>
            {label && <label>{label}</label>}
            <input
                type={type}
                className={getFieldCSSClasses(
                    touched[field.name],
                    errors[field.name]
                )}
                onFocus={handleFocus}
                autoComplete={autoComplete}
                value={(field.value === undefined || field.value === null) ? '' : field.value}
                {..._.omit(field, ['onBlur', 'value'])}
                {...props}
                ref={inputRef}
            />
            {withFeedbackLabel && (
                <FieldFeedbackLabel
                    error={errors[field.name]}
                    touched={touched[field.name]}
                    label={label}
                    type={type}
                    customFeedbackLabel={customFeedbackLabel}
                />
            )}
        </>
    );
}
