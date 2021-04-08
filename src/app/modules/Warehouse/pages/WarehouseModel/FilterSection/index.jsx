import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

import queryString from 'query-string';
import { fetchShelveFromArea, fetchShelvesForWHModel, whModelAction } from 'app/modules/Warehouse/warehouse-redux/whModelSlice';

import { Card, CardBody } from '_metronic/_partials/controls';
import SelectArea from 'app/modules/Warehouse/components/SelectArea';
import SelectShelve from 'app/components/Select/SelectShelve';
import SelectPallet from 'app/components/Select/SelectPallet';
import SelectLocation from 'app/components/Select/SelectLocation';

const FilterSection = props => {

    const filter = useSelector(state => state.warehouse.whModel.filter);
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.search) {
            let searchParsed = queryString.parse(location.search);

            let newFilter = searchParsed;

            if(newFilter) {
                dispatch(whModelAction.changeFilter(newFilter));
                dispatch(fetchShelvesForWHModel());
            }
        } else {
            dispatch(fetchShelveFromArea());
        }
    }, [location]); // eslint-disable-line

    const handleChangeFilter = (newFP) => {
        dispatch(whModelAction.changeFilter(newFP));
    }

    const handleResetFilter = () => {
        dispatch(whModelAction.resetFilter());
        dispatch(fetchShelveFromArea());
        history.replace(`${match.url}`);
    }

    const handleFilter = () => {
        dispatch(fetchShelvesForWHModel());

        let parsedFilter = filter;

        history.replace(`${match.url}?${queryString.stringify(parsedFilter)}`);
    }

    return (
        <Card>
            <CardBody>
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <SelectArea value={filter['area_id'] || ''} onChange={(v) => handleChangeFilter({ 'area_id': v })} />
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <SelectShelve value={filter['id'] || ''} onChange={(v) => handleChangeFilter({ 'id': v })} />
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <SelectLocation value={filter['locations.id'] || ''} onChange={(v) => handleChangeFilter({ 'locations.id': v })} />
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <SelectPallet value={filter['locations.pallets.id'] || ''} onChange={(v) => handleChangeFilter({ 'locations.pallets.id': v })} />
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="">SKU</label>
                            <input
                                value={filter['locations.pallets.pivotBoxes.box_id'] || ''}
                                className="form-control"
                                onChange={(e) => { handleChangeFilter({ 'locations.pallets.pivotBoxes.box_id': e.target.value }) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <button className="btn btn-secondary" onClick={handleResetFilter}>Bỏ lọc</button>
                    <button className="btn btn-primary ml-3" onClick={handleFilter}>Lọc</button>
                </div>
            </CardBody>
        </Card>
    );
};

FilterSection.propTypes = {

};

export default FilterSection;