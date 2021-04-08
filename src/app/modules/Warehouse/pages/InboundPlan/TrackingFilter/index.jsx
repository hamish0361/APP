import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { fetchTracking } from 'app/modules/Purchase/redux/trackingSlice';
import useTrans from 'helper/useTrans';

import DatePicker from "react-datepicker";
import { Card, CardBody } from '_metronic/_partials/controls';
import { Pagination } from '@material-ui/lab';

import './index.scss';

const ListTrackingFilter = props => {

    const { pagination } = useSelector(state => state.purchase.tracking);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [params, setParams] = useState({
        page: 1,
        search: `expected_delivery:${moment().format('YYYY-MM-DD')}`, 
        searchField: undefined,
    });
    const dispatch = useDispatch();
    const [trans] = useTrans();

    useEffect(() => {
        dispatch(fetchTracking(params));
    }, [params]); // eslint-disable-line

    const dateChange = (val) => {
        setSelectedDate(val);
        setParams({ ...params, search: `expected_delivery:${moment(val).format('YYYY-MM-DD')}` })
    }

    const handlePageChange = (e, page) => {
        setParams({ ...params, page });
    }

    return (
        <Card className="list-tracking-filter">
            <CardBody>
                <div className="select-date">
                    <label htmlFor="">{trans("warehouse.inbound_plan.received_date")}</label>
                    <DatePicker
                        className="form-control"
                        style={{ width: "100%" }}
                        selected={selectedDate}
                        onChange={dateChange}
                        popperPlacement="bottom"
                    />
                </div>
                <div className="pagination">
                    <Pagination
                        count={pagination.lastPage}
                        page={params.page}
                        shape="rounded"
                        onChange={handlePageChange}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

ListTrackingFilter.propTypes = {

};

export default ListTrackingFilter;