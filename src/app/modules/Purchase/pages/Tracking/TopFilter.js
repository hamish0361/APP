import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Select from 'react-select';
import './index.scss';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

function TopFilter({ onSearch, intl }) {
    const options = [
        {
            value: 'all',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.ALL' })
        },
        {
            value: 'id',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.TRACKING' })
        }
    ];

    const ref = useRef(null);
    const [values, setValues] = useState({
        type: 'all',
        search: '',
        date: null
    });

    const handleChangeSearch = e => {
        const value = e.target.value;
        setValues({
            ...values,
            search: value
        });
        if (ref.current) {
            clearTimeout(ref.current);
        }
        ref.current = setTimeout(() => {
            if (onSearch && value.length > 0) {
                if (onSearch && value.length > 0) {
                    switch (values.type) {
                        case 'all':
                            onSearch({
                                search: value
                            });
                            break;
                        default:
                            onSearch({
                                search: `id:${value}`,
                                searchFields: 'id:like'
                            });
                            break;
                    }
                }
            } else {
                onSearch({
                    search: ''
                });
            }
        }, 500);
    };

    const handleSelectType = type => {
        setValues({
            ...values,
            type: type.value,
            search: '',
            searchFields: '',
            date: null
        });
        if (type.value === 'all') {
            onSearch({
                search: ''
            });
        }
    };

    return (
        <div className="form-group row">
            <div className="col-lg-2 col-md-3">
                <Select
                    defaultValue={options[0]}
                    options={options}
                    onChange={handleSelectType}
                />
            </div>
            <div className="col-lg-10 col-md-9">
                <input
                    type="text"
                    name="search"
                    value={values.search}
                    className="form-control"
                    placeholder={intl.formatMessage({
                        id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                    })}
                    onChange={handleChangeSearch}
                />
            </div>
        </div>
    );
}

export default TopFilter;
