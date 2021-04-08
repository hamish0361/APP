import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { dashboardAction, fetchDashboardBoxes } from 'app/modules/Warehouse/warehouse-redux/dashboardSlice';
import moment from 'moment';
import queryString from 'query-string';
import _ from 'lodash';
import useTrans from 'helper/useTrans';

import { Card, CardBody } from '_metronic/_partials/controls';
import SelectSFA from 'app/components/Select/SelectSFA';
import SelectCustomer from 'app/components/Select/SelectCustomer';
import SelectSFATracking from 'app/components/Select/SelectSFATracking';
import SelectLadingBill from 'app/components/Select/SelectLadingBill';
import SelectInvoice from 'app/components/Select/SelectInvoice';
import DatePicker from "react-datepicker";
import Button from 'app/components/Button';

import './index.scss';

const dateFormatter = 'YYYY-MM-DD';

const FilterList = props => {

    const loading = useSelector(state => state.warehouse.dashboard.loading);
    const filter = useSelector(state => state.warehouse.dashboard.filter);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [trans] = useTrans();

    useEffect(() => {
        if (location.search) {
            let searchParsed = queryString.parse(location.search);

            let newFilter = searchParsed;

            if (searchParsed.startDate || searchParsed.endDate) {
                newFilter = {
                    ..._.omit(searchParsed, ['startDate', 'endDate']),
                    date: { startDate: searchParsed.startDate, endDate: searchParsed.endDate }
                }
            }

            dispatch(dashboardAction.changeFilter(newFilter));
        }

        dispatch(fetchDashboardBoxes());
    }, []); // eslint-disable-line

    const handleChangeFilter = (key, value) => {
        dispatch(dashboardAction.changeFilter({ [key]: value }))
    }

    const handleDateChange = (key, date) => {
        let newDate = { ...filter?.date };
        newDate[key] = moment(date).format('YYYY-MM-DD');
        dispatch(dashboardAction.changeFilter({ date: newDate }))
    }

    const handleReset = () => {
        if (filter !== {}) {
            history.replace(match.url);
            dispatch(dashboardAction.resetFilter());
            dispatch(fetchDashboardBoxes());
        }
    }

    const handleFilter = () => {

        dispatch(dashboardAction.resetBoxes());
        dispatch(fetchDashboardBoxes());

        let parsedFilter = filter;

        if (filter.date) {
            parsedFilter = {
                ..._.omit(filter, 'date'),
                startDate: filter.date.startDate,
                endDate: filter.date.endDate
            }
        }

        history.replace(`${match.url}?${queryString.stringify(parsedFilter)}`);
    }

    return (
        <Card className="dashboard-filter">
            <CardBody>
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <SelectSFA
                            value={filter.sfa_id}
                            onChange={(v) => handleChangeFilter('sfa_id', v)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="">{trans("warehouse.sku.title")}</label>
                            <input
                                value={filter.id || ''}
                                onChange={(e) => handleChangeFilter('id', e.target.value)}
                                className="form-control"
                                placeholder={trans("warehouse.sku.title")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="">{trans("warehouse.jancode.title")}</label>
                            <input
                                value={filter['items.product_id'] || ''}
                                onChange={(e) => handleChangeFilter('items.product_id', e.target.value)}
                                className="form-control"
                                placeholder={trans("warehouse.jancode.title")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <SelectSFATracking
                            value={filter['sfa.tracking']}
                            onChange={(v) => handleChangeFilter('sfa.tracking', v)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <SelectCustomer
                            value={filter['owners.objectable_id']}
                            onChange={(v) => handleChangeFilter('owners.objectable_id', v)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <SelectLadingBill
                            value={filter['owners.pivotLadingBills.ladingBill.id']}
                            onChange={(v) => handleChangeFilter('owners.pivotLadingBills.ladingBill.id', v)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <SelectInvoice
                            value={filter['owners.pivotLadingBills.ladingBill.containers.id']}
                            onChange={(v) => handleChangeFilter('owners.pivotLadingBills.ladingBill.containers.id', v)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="">{trans("common.start_date")}</label>
                            <DatePicker
                                selected={filter?.date?.startDate ? moment(filter?.date?.startDate, dateFormatter).toDate() : undefined}
                                maxDate={filter?.date?.endDate ? moment(filter?.date?.endDate, dateFormatter).toDate() : null}
                                onChange={(date) => handleDateChange('startDate', date)}
                                dateFormat={'yyyy-MM-dd'}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="">{trans("common.end_date")}</label>
                            <DatePicker
                                selected={filter?.date?.endDate ? moment(filter?.date?.endDate, dateFormatter).toDate() : undefined}
                                minDate={filter?.date?.startDate ? moment(filter?.date?.startDate, dateFormatter).toDate() : null}
                                onChange={(date) => handleDateChange('endDate', date)}
                                dateFormat={'yyyy-MM-dd'}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <Button type="secondary" loading={loading} onClick={handleReset}>{trans("common.reset_filter")}</Button>
                    <Button className="ml-3" type="primary" loading={loading} onClick={handleFilter}>{trans("common.filter")}</Button>
                </div>
            </CardBody>
        </Card>
    );
};

FilterList.propTypes = {

};

export default FilterList;