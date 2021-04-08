import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Select from 'react-select';

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
            value: 'note',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.NOTE' })
        },
        {
            value: 'customer',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.CUSTOMER' })
        },
        {
            value: 'status',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.STATUS' })
        },
        {
            value: 'tracking',
            label: intl.formatMessage({ id: 'GLOBAL.FILTER.TRACKING' })
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
                            search: `director.type.id:shipment;id:${value}`,
                            searchFields: 'id:=;director.type.id:='
                        });
                        break;
                    case 'customer':
                        onSearch({
                            search: `director.type.id:shipment;customer_id:${value}`,
                            searchFields: 'customer_id:=;director.type.id:='
                        });
                        break;
                    case 'note':
                        onSearch({
                            search: `director.type.id:shipment;note:${value}`,
                            searchFields: 'note:like;director.type.id:='
                        });
                        break;
                    case 'tracking':
                        onSearch({
                            search: `director.type.id:shipment;trackings.id:${value}`,
                            searchFields: `items.product_id:=;trackings.id:like`
                        });
                        break;
                    default:
                        onSearch({
                            search: `director.type.id:shipment;${value}`,
                            searchFields: `director.type.id:=`
                        });
                        break;
                }
            } else {
                onSearch({
                    search: `director.type.id:shipment`
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
            onSearch({ search: `director.type.id:shipment` });
        }
    };

    const handleSelectStatus = status => {
        if (status.value === 'all') {
            onSearch({
                search: `director.type.id:shipment`,
                searchFields: `director.status.name:like`
            });
        } else {
            onSearch({
                search: `director.type.id:shipment;director.status.id:${status.value}`,
                searchFields: `director.type.id:=;director.status.id:=`
            });
        }
    };

    const statusOptions = statusList.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

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
        </>
    );
}

export default TopFilter;
