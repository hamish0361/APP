import React, { useCallback, useEffect, useMemo, useState } from 'react';

import _ from 'lodash';
import clsx from 'clsx';

import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShelves } from 'app/modules/Warehouse/warehouse-redux/shelveSlice';
import { useFormikContext, useField } from 'formik';

import './CustomShelveSelect.scss';

const CustomShelveSelect = ({ label, ...props }) => {
    const [inputValue, setInputValue] = useState('');
    const [field, meta] = useField(props);
    const { values, setFieldValue } = useFormikContext();
    const { data } = useSelector(state => state.warehouse.shelve.list);
    const dispatch = useDispatch();

    useEffect(() => {
        if (values.area_id) {

            let params = { search: `area_id:${values.area_id}`, searchJoin: 'and', searchField: `area_id:=` };

            if (inputValue) {
                params.search += `;id:${inputValue}`;
                params.searchField += `;id:like`;
            }

            dispatch(fetchShelves(params));
        }
    }, [values.area_id, inputValue]); // eslint-disable-line

    const options = useMemo(() => {
        return data.map(shelve => {
            return { value: shelve.id, label: shelve.id };
        })
    }, [data]);

    const handleInputValueChange = (v) => {
        dispatchToState(v);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchToState = useCallback(_.debounce((v) => {
        setInputValue(v)
    }, 700), []); // eslint-disable-line

    const onChange = (selectedOption) => {
        setFieldValue(field.name, selectedOption.value);
    }

    const selectValue = useMemo(() => {
        if (values[field.name])
            return { value: values[field.name], label: values[field.name] }

        return undefined;
    }, [values, field]);

    return (
        <div className="w-100 custom-shelve-select">
            <label className={clsx(meta.error && "is-invalid", 'w-100')}>
                {label}
                <Select className="react-cm-select" value={selectValue} options={options} onInputChange={handleInputValueChange} onChange={onChange} />
            </label>
            {meta.error ? (
                <div className="invalid-feedback">{meta.error}</div>
            ) : null}
        </div>
    );
};

CustomShelveSelect.propTypes = {

};

export default CustomShelveSelect;