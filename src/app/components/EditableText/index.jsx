import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { toAbsoluteUrl } from '_metronic/_helpers';

import SVG from 'react-inlinesvg';

import './index.scss';
import clsx from 'clsx';

const EditableText = ({ value, onChange, text, suffix, ...props }) => {

    const [isEdit, setIsEdit] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef?.current) inputRef.current.focus();
    }, [inputRef, isEdit]);

    const toggleEdit = () => setIsEdit(!isEdit);

    const dispatchInputChange = (e) => {
        if (e.charCode === 13) {
            if (e.target.value !== value) onChange && onChange(e.target.value);

            toggleEdit();
        }
    }

    return !isEdit ? (
        <span className="ediable-text">
            {text || value}
            <span className="svg-icon svg-icon-md svg-icon-primary cursor-pointer" onClick={toggleEdit}>
                <SVG
                    src={toAbsoluteUrl(
                        '/media/svg/icons/Communication/Write.svg'
                    )}
                ></SVG>
            </span>
        </span>
    ) : (
        <span className={clsx("editable-input", suffix && "has-suffix")}>
            <input
                defaultValue={value || ''}
                className="form-control ediable-text-input"
                onKeyPress={dispatchInputChange}
                ref={inputRef}
                {...props}
            />
            {!!suffix && (
                <span className="suffix">
                    {suffix}
                </span>
            )}
        </span>
    )
};

EditableText.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
};

export default EditableText;