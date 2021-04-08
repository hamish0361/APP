import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Select from 'react-select';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

function TopFilter({ onSearchSubmit, intl }) {
    const ref = useRef(null);
    const [values, setValues] = useState({
        type: '',
        search: ''
    });

    const handleSearch = e => {
        const value = e.target.value;
        setValues({
            ...values,
            search: value
        });
        if (ref.current) {
            clearTimeout(ref.current);
        }
        ref.current = setTimeout(() => {
            if (onSearchSubmit && value.length > 0) {
                switch (values.type) {
                    case 'id':
                        onSearchSubmit({
                            search: `id:${value}`,
                            searchFields: 'id:like'
                        });
                        break;
                    case 'percent':
                        onSearchSubmit({
                            search: `percent:${value}`,
                            searchFields: 'percent:like'
                        });
                        break;
                    default:
                        onSearchSubmit({
                            search: `${value}`
                        });
                        break;
                }
            } else {
                onSearchSubmit({
                    search: ``
                });
            }
        }, 500);
    };

    const handleSelectType = type => {
        setValues({
            ...values,
            type: type.value,
            search: ''
        });
    };

    const optionFilter = [
        {
            value: '',
            label: `${intl.formatMessage({ id: 'TAX.TOPFILTER.ALL' })}`
        },
        {
            value: 'id',
            label: `${intl.formatMessage({ id: 'TAX.TOPFILTER.ID' })}`
        },
        {
            value: 'percent',
            label: `${intl.formatMessage({ id: 'TAX.TOPFILTER.PERCENT' })}`
        }
    ];
    return (
        <>
            <div className="form-group row">
                <div className="col-lg-2 col-md-2">
                    <Select
                        defaultValue={optionFilter[0]}
                        options={optionFilter}
                        onChange={handleSelectType}
                    />
                </div>
                <div className="col-lg-10 col-md-6">
                    <input
                        value={values.search}
                        type="text"
                        name="search"
                        className="form-control"
                        placeholder={intl.formatMessage({
                            id: 'GLOBAL.PLACEHOLER.SELECT'
                        })}
                        onChange={handleSearch}
                    />
                </div>
            </div>
        </>
    );
}

export default TopFilter;
