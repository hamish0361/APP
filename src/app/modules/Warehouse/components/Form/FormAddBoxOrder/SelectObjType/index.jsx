import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { useField, useFormikContext } from "formik";
import Select from 'react-select';
import useTrans from 'helper/useTrans';

const SelectObjType = ({ name, showLabel = true, ...props }) => {

    const [value, setValue] = useState();
    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();
    const { error, touched } = meta;
    const [trans] = useTrans();

    const options = [
        { value: 'user', label: trans("warehouse.order.owner_type.customer") },
        { value: 'order', label: trans("warehouse.order.owner_type.order") },
    ]

    useEffect(() => {
        if (value?.value !== field?.value) {
            let newValue = options.filter(i => i.value === field.value)?.[0];

            setValue(newValue);
        }
    }, [field.value]); // eslint-disable-line

    const handleClick = () => {
        setFieldTouched(field.name);
    }

    const handleSelect = (optionSelected) => {
        setValue(optionSelected);
        setFieldValue(field.name, optionSelected.value);

        if(optionSelected.value === 'user') {
            setFieldValue('objectable_id', 'sale.se');
        }
    }

    return (
        <div className={clsx(touched && error && 'is-invalid')}>
            <div className="select-customer">
                <div className="form-group">
                    {showLabel && <label htmlFor="">{trans("warehouse.order.owner_type.title")}</label>}
                    <Select
                        value={value}
                        placeholder={trans("common.select_here")}
                        options={options}
                        onChange={handleSelect}
                        onClick={handleClick}
                        {...props}
                    />
                </div>
            </div>

            {touched && error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};

SelectObjType.propTypes = {

};

export default SelectObjType;