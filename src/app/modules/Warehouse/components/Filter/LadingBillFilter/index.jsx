import React, { useCallback, useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useSelector } from 'react-redux';

import _ from 'lodash';
import SelectCustomer from 'app/components/Select/SelectCustomer';
import DatePicker from 'app/components/DatePicker';
import useTrans from 'helper/useTrans';

const LadingBillFilter = ({ onSearch, searchAll = true }, ref) => {

    const [searchText, setSearchText] = useState('');

    const [trans] = useTrans();

    const fields = [
        { id: 'shipment_method_id', title: trans("warehouse.shipment_method.title") },
        { id: 'customer_id', title: trans("common.customer") },
        { id: 'desired_date', title: trans("warehouse.lading_bill.desired_date") },
    ]

    const [searchField, setSearchField] = useState(searchAll ? '' : fields?.[0]?.id);
    const shipmentMethods = useSelector(state => state.warehouse.shipmentMethod.list.data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchSearch = useCallback(_.debounce((_searchText, _searchField) => {
        if (_searchField.length && _searchText.length) {
            onSearch && onSearch({ search: `${_searchField}:${_searchText}`, searchFields: `${_searchField}:like` });
        } else {
            onSearch && onSearch({ search: _searchText });
        }
    }, 700), []);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSearchText('');
            setSearchField(searchAll ? '' : fields?.[0]?.id);
        }
    }))

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);

        dispatchSearch(e.target.value, searchField);
    }

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);

        if (searchText.length) {
            setSearchText('');
            dispatchSearch('', e.target.value);
        }
    }

    const handleCustomerChange = (customer_id) => {
        setSearchText(customer_id);

        dispatchSearch(customer_id, searchField);
    }

    const getSearchFieldCpn = useMemo(() => {
        if (searchField === 'shipment_method_id')
            return (
                <select onChange={handleSearchTextChange} className="form-control">
                    <option value="">{trans("common.all")}</option>
                    {shipmentMethods.map((shipmentMethod, idx) => (
                        <option value={shipmentMethod.id} key={`shipmentMethod-idx-${idx}`}>{shipmentMethod.name}</option>
                    ))}
                </select>
            )

        if (searchField === 'customer_id')
            return <SelectCustomer showLabel={false} onChange={handleCustomerChange} value={searchText} />

        if (searchField === 'desired_date')
            return <DatePicker value={searchText} onChange={handleCustomerChange} formater="YYYY-MM-DD" />

        return (
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleSearchTextChange}
                value={searchText}
            />
        )
    }, [searchField, searchText, shipmentMethods]); // eslint-disable-line

    return (
        <div className="form-group row custom-filter-warehouse">
            <div className="col-lg-4 col-md-4 col-sm-4 p-3">
                <select name="searchField" id="searchField" className="form-control" onChange={handleSearchFieldChange} value={searchField}>
                    {searchAll ? (<option value="">{trans("common.all")}</option>) : ''}
                    {(fields || []).map((f, idx) => (
                        <option value={f.id} key={`search-field-${idx}`}>{f.title}</option>
                    ))}
                </select>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8 p-3">
                {getSearchFieldCpn}
            </div>
        </div>
    );
};

export default forwardRef(LadingBillFilter);