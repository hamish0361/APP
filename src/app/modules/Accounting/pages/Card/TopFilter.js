import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Select from 'react-select';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

function TopFilter({ onSearch, intl }) {
    const ref = useRef(null);

    const [values, setValues] = useState({
        type: 'name',
        status: '',
        search: ''
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
                switch (values.type) {
                    case 'name':
                        onSearch({
                            search: `name:${value}`
                        });
                        break;
                    case 'code':
                        onSearch({
                            search: ``
                        });
                        break;
                    case 'balance':
                        onSearch({
                            search: ``
                        });
                        break;
                    default:
                        onSearch({
                            search: `bank.name:${value}`,
                            searchFields: 'bank.name:like'
                        });
                        break;
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
            search: ''
        });
    };

    const options = [
        {
            value: 'code',
            label: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.ID'
            })}`
        },
        {
            value: 'name',
            label: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.NAME'
            })}`
        },

        {
            value: 'bank',
            label: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.BANK'
            })}`
        },
        {
            value: 'balance',
            label: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.BALANCE'
            })}`
        }
    ];

    return (
        <>
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
                        value={values.search}
                        className="form-control"
                        placeholder="Nhập tìm kiếm"
                        onChange={handleChangeSearch}
                    />
                </div>
            </div>
        </>
    );
}

export default TopFilter;
