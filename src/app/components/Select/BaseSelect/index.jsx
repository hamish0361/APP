import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import _ from 'lodash';
import useTrans from 'helper/useTrans';
import clsx from 'clsx';
import merge2Objects from 'helper/merge2Objects';

import Select from 'react-select';

import './index.scss';
import usePrevious from 'helper/usePrevious';

const TMNBaseSelect = ({
    className = '',
    options = [],
    loading = false,
    onFetchData,
    value,
    typeSearch = 'id',
    label,
    onChange,
    dispatchFirstOption = false,
    defaultParams = {},
    disabled = false,
    isDisabled = false,
    ...props
}) => {
    const [prevSearch, setPrevSearch] = useState('');
    const [trans] = useTrans();
    const isDispatchedFirstOption = useRef(false);
    const prevDefaultParams = usePrevious(defaultParams);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []); // eslint-disable-line

    useEffect(() => {

        if(value && !optionSelected) {
            let params = merge2Objects(defaultParams, {
                search: typeSearch ? `${typeSearch}:${value}` : value,
                searchFields: typeSearch && `${typeSearch}:like`
            });

            onFetchData && onFetchData(params);
        } else {
            if (!_.isEqual(defaultParams, prevDefaultParams)) {
                onFetchData && onFetchData(defaultParams);
            }
        }
    }, [defaultParams, prevDefaultParams, onFetchData, value]); // eslint-disable-line

    useEffect(() => {
        if (options.length && dispatchFirstOption && !isDispatchedFirstOption.current) {
            onChange && onChange(options?.[0]);
            isDispatchedFirstOption.current = true;
        }
    }, [options, dispatchFirstOption, isDispatchedFirstOption, onChange]);

    const optionSelected = useMemo(() => {
        if (value === undefined || value === null) return '';

        return options.filter(c => c.value === value)[0] || ''
    }, [value, options]); // eslint-disable-line

    const handleInputSeachChange = value => {
        if (value)
            search({ value, type: typeSearch });
    };

    const handleSelect = option => {
        onChange && onChange(option);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const search = useCallback(
        _.debounce(({ value, type }) => {
            if (value === prevSearch) return;

            setPrevSearch(value);

            let params = merge2Objects(defaultParams, {
                search: type ? `${type}:${value}` : value,
                searchFields: type && `${type}:like`
            });

            onFetchData && onFetchData(params);
        }, 700),
        [prevSearch, defaultParams]
    );

    return (
        <div className={clsx("tomoni-base-select", className)}>
            <div className="form-group mb-0">
                {label && <label htmlFor="">{label}</label>}
                <Select
                    value={optionSelected}
                    placeholder={trans("common.select_here")}
                    options={options}
                    onInputChange={handleInputSeachChange}
                    onChange={handleSelect}
                    isLoading={loading}
                    isDisabled={disabled || isDisabled}
                    {...props}
                />
            </div>
        </div>
    );
};

export default TMNBaseSelect;