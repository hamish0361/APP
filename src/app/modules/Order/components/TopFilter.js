import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

TopFilter.propTypes = {
    onSearch: PropTypes.func
};

const options = [
    { key: 'id', value: 'Jancode' },
    { key: 'customer', value: 'Customer' },
    { key: 'status', value: 'Status' },
    { key: 'note', value: 'Note' }
];

function TopFilter({ onSearch }) {
    const ref = useRef(null);
    const { statusList } = useSelector(
        ({ order }) => ({ statusList: order.status.list }),
        shallowEqual
    );

    const [values, setValues] = useState({
        type: 'id',
        status: '',
        search: ''
    });

    const handleStatusChange = e => {
        const { value } = e.target;
        if (value === 'all') {
            onSearch('');
        } else {
            onSearch({
                search: `director.type.id:wholesale;director.status.id:${e.target.value}`
            });
        }
        setValues({
            ...values,
            status: e.target.value
        });
    };

    const handleSearchChange = e => {
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
                    case 'customer':
                        onSearch({
                            search: `director.type.id:wholesale;customer_id:${value}`
                        });
                        break;
                    case 'id':
                        onSearch({
                            search: `director.type.id:wholesale;id:${value}`
                        });
                        break;
                    default:
                        onSearch({
                            search: `director.type.id:wholesale;note:${value}`,
                            searchFields: 'note:like'
                        });
                        break;
                }
            } else {
                onSearch({
                    search: `director.type.id:wholesale`
                });
            }
        }, 500);
    };

    const handleTypeChange = e => {
        setValues({
            type: e.target.value,
            search: ''
        });

        const params = {
            search: `director.type.id:wholesale`
        };
        onSearch(params);
    };

    return (
        <>
            <div className="form-group row">
                <div className="col-lg-2 col-md-2">
                    <select
                        name="type"
                        className="form-control"
                        placeholder="Filter by ..."
                        value={values.type}
                        onChange={handleTypeChange}
                    >
                        {options.map(option => (
                            <option key={option.key} value={option.key}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                </div>
                {values.type === 'status' ? (
                    <div className="col-lg-4 col-md-4">
                        <select
                            name="status"
                            className="form-control"
                            value={values.status}
                            onChange={handleStatusChange}
                        >
                            <option value="all">All</option>
                            {statusList.map(status => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="col-lg-3 col-md-6">
                        <input
                            type="text"
                            name="search"
                            value={values.search}
                            className="form-control"
                            placeholder="Search..."
                            onChange={handleSearchChange}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default TopFilter;
