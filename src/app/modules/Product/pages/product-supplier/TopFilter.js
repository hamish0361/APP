import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Select from 'react-select';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

function TopFilter({ onSearch, intl }) {
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
            if (onSearch && value.length > 0) {
                switch (values.type) {
                    case 'id':
                        onSearch({
                            search: `id:${value}`,
                            searchFields: 'id:like'
                        });
                        break;
                    case 'name':
                        onSearch({
                            search: `name:${value}`,
                            searchFields: 'name:like'
                        });
                        break;
                    case 'link':
                        onSearch({
                            search: `link:${value}`,
                            searchFields: 'link:like'
                        });
                        break;
                    case 'email':
                        onSearch({
                            search: `email:${value}`,
                            searchFields: 'email:like'
                        });
                        break;
                    case 'address':
                        onSearch({
                            search: `address:${value}`,
                            searchFields: 'address:like'
                        });
                        break;
                    case 'note':
                        onSearch({
                            search: `note:${value}`,
                            searchFields: 'note:like'
                        });
                        break;
                    default:
                        onSearch({
                            search: `${value}`
                        });
                        break;
                }
            } else {
                onSearch({
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
            label: `${intl.formatMessage({ id: 'SUPPLIER.TOPFILTER.ALL' })}`
        },
        {
            value: 'id',
            label: `${intl.formatMessage({ id: 'SUPPLIER.TOPFILTER.ID' })}`
        },
        {
            value: 'name',
            label: `${intl.formatMessage({ id: 'SUPPLIER.TOPFILTER.NAME' })}`
        },
        {
            value: 'link',
            label: `${intl.formatMessage({ id: 'SUPPLIER.TOPFILTER.LINK' })}`
        },
        {
            value: 'email',
            label: `${intl.formatMessage({ id: 'SUPPLIER.TOPFILTER.EMAIL' })}`
        },
        {
            value: 'address',
            label: `${intl.formatMessage({ id: 'SUPPLIER.TOPFILTER.ADDRESS' })}`
        },
        {
            value: 'note',
            label: `${intl.formatMessage({ id: 'SUPPLIER.TOPFILTER.NOTE' })}`
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
