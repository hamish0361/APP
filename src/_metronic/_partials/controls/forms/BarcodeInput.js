import React, { useEffect, useMemo, useRef } from 'react';
import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import _ from 'lodash';
import { useScanBarcode } from 'helper/useScanBarcode';

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

export function BarcodeInput({
    field, // { name, value, onChange, onBlur }
    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    withFeedbackLabel = true,
    customFeedbackLabel,
    type = 'text',
    autoFocus = false,
    condition = () => true,
    submitOnEnter = false,
    disabled,
    canTypeOnInput = true,
    formatter,
    onScan,
    ...props
}) {
    const { touched, errors, setFieldValue, submitForm } = form;
    const inputRef = useRef();

    useScanBarcode({
        condition: (v) => {
            return !disabled && condition(v);
        },
        onEnter: (v, e) => handleScanEnter(v, e)
    });

    const handleScanEnter = (v, e) => {

        let value = v;

        if(formatter) value = formatter(v) || value;

        setFieldValue(field.name, value);
        onScan && onScan(value);

        if (submitOnEnter) submitForm();
        e.preventDefault();
    }

    /** Xử lý autofocus */
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
                disabled={disabled || !canTypeOnInput}
                autoComplete={autoComplete}
                value={field.value || ''}
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
