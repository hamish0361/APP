import React, { useCallback, useEffect, useState } from 'react';

import trackingApi from 'apis/order/trackingApi';
import moment from 'moment';

import { Card, CardBody } from '_metronic/_partials/controls';
import Loading from 'app/components/Loading';

const momentFormatter = "YYYY-MM-DD"

const TrackingWillComingToday = props => {

    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDataBox();
    }, []); // eslint-disable-line

    const getDataBox = useCallback(() => {
        setLoading(true);
        return trackingApi.fetchTracking({
            search: `expected_delivery:${moment().format(momentFormatter)}`,
        }).then(res => {
            setTotal(res.total);
        }).finally(() => {
            setLoading(false);
        })
    }, []); // eslint-disable-line

    return (
        <Card className="tracking-will-coming-today dashboard-info-box wave wave-animate-slow wave-warning">
            <CardBody>
                {loading && <Loading local />}
                <div className="title">Tracking sẽ đến hôm nay</div>
                <div className="total">{total}</div>
            </CardBody>
        </Card>
    );
};

export default TrackingWillComingToday;