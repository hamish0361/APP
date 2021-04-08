import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';
import './index.scss';
import moment from 'moment';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

function TopFilter({ onSearch, intl }) {
    const ref = useRef(null);
    const { statusList } = useSelector(
        ({ order }) => ({ statusList: order.status.list }),
        shallowEqual
    );

    const options = [
        {
            value: 'all',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.ALL' })
        },
        {
            value: 'id',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.ORDER_ID' })
        },
        {
            value: 'product',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.PRODUCT' })
        },
        {
            value: 'status',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.STATUS' })
        },
        {
            value: 'createDate',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.CREATE_DATE' })
        }
    ];

    const [values, setValues] = useState({
        type: 'all',
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
                    case 'id':
                        onSearch({
                            search: `id:${value}`,
                            searchFields: 'id:like'
                        });
                        break;
                    case 'product':
                        onSearch({
                            search: `items.product_id:${value}`,
                            searchFields: 'items.product_id:like'
                        });
                        break;
                    default:
                        onSearch({
                            search: value
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
        if (type.value === 'all') {
            onSearch({ search: '' });
        }
    };

    const handleSelectStatus = status => {
        onSearch({
            search: `director.status.id:${status.value}`
        });
    };

    const [date, setDate] = useState(null);
    const handleDateChange = date => {
        setDate(date);
        const dateFormat = moment(date).format('yyyy-MM-DD');
        onSearch({
            search: `created_at:${dateFormat}`,
            searchFields: 'created_at:like'
        });
    };

    const statusOptions = statusList.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    return (
        <div className="form-group row">
            <div className="col-lg-2 col-md-3">
                <Select
                    defaultValue={options[0]}
                    options={options}
                    onChange={handleSelectType}
                />
            </div>
            {values.type === 'status' ? (
                <div className="col-lg-10 col-md-9">
                    <Select
                        placeholder={intl.formatMessage({
                            id: 'GLOBAL.SEARCH.PLACEHOLER_SELECT'
                        })}
                        options={statusOptions}
                        onChange={handleSelectStatus}
                    />
                </div>
            ) : values.type === 'createDate' ? (
                <div className="col-lg-10 col-md-9 container-date">
                    <DatePicker
                        className="form-control"
                        selected={date}
                        dateFormat="dd-MM-yyy"
                        onChange={handleDateChange}
                    />
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default TopFilter;
