import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Select from 'react-select';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

function TopFilter({ onSearch, intl }) {
    const optionFilter = [
        {
            value: '',
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.ALL'
            })}`
        },
        {
            value: 'id',
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.JANCODE'
            })}`
        },
        {
            value: 'name',
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.NAME'
            })}`
        },
        {
            value: 'origin.name',
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.ORIGIN'
            })}`
        },
        {
            value: 'unit.name',
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.UNIT'
            })}`
        },
        {
            value: 'price',
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.PRICE'
            })}`
        },
        {
            value: 'tax.name',
            label: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.TAX'
            })}`
        }
    ];
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
                    case 'origin.name':
                        onSearch({
                            search: `origin.name:${value}`,
                            searchFields: 'origin.name:like'
                        });
                        break;
                    case 'unit.name':
                        onSearch({
                            search: `unit.name:${value}`,
                            searchFields: 'unit.name:like'
                        });
                        break;
                    case 'price':
                        onSearch({
                            search: `price:${value}`,
                            searchFields: 'price:like'
                        });
                        break;
                    case 'tax.name':
                        onSearch({
                            search: `tax.name:${value}`,
                            searchFields: 'tax.name:like'
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
        if (type.value === '') {
            onSearch({ search: `` });
        }
    };

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
                <div className="col-lg-10 col-md-10">
                    <input
                        value={values.search}
                        type="text"
                        name="Search"
                        className="form-control"
                        placeholder={intl.formatMessage({
                            id: 'GLOBAL.SEARCH.PLACEHOLER_INPUT'
                        })}
                        onChange={handleSearch}
                    />
                </div>
            </div>
        </>
    );
}

export default TopFilter;
