import React, { useCallback, useState, forwardRef, useImperativeHandle, useMemo } from 'react';

import _ from 'lodash';
import useTrans from 'helper/useTrans';
import SelectDeliveryPartners from 'app/components/Select/SelectDeliveryPartner';
import SelectGoodsDeliveryStatus from 'app/components/Select/SelectGoodsDeliveryStatus';

const GoodsDeliveryFilter = ({ onSearch, searchAll = true }, ref) => {

    const [trans] = useTrans();

    const fields = [
        { id: 'partner_id', title: trans("warehouse.delivery_partner.title") },
        { id: 'status_id', title: trans("warehouse.goods_delivery_status.title") },
    ]

    const [searchField, setSearchField] = useState(searchAll ? '' : fields?.[0]?.id);
    const [searchText, setSearchText] = useState('');

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
        if (searchField === 'partner_id')
            return <SelectDeliveryPartners showLabel={false} onChange={handleCustomerChange} value={searchText} />

        if (searchField === 'status_id')
            return <SelectGoodsDeliveryStatus value={searchText} onChange={handleCustomerChange} showLabel={false} />

        return (
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleSearchTextChange}
                value={searchText}
            />
        )
    }, [searchField, searchText]); // eslint-disable-line

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

export default forwardRef(GoodsDeliveryFilter);