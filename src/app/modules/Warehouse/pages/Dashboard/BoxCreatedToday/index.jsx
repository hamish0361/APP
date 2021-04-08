import React, { useCallback, useEffect, useState } from 'react';

import warehouseApi from 'apis/warehouse';
import moment from 'moment';

import { Card, CardBody } from '_metronic/_partials/controls';
import Loading from 'app/components/Loading';

const momentFormatter = "YYYY-MM-DD"

const BoxCreatedToday = props => {

    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDataBox();
    }, []); // eslint-disable-line

    const getDataBox = useCallback(() => {
        setLoading(true);
        return warehouseApi.box.fetchBoxs({
            search: `created_at:${moment().format(momentFormatter)}`,
            searchFields: `created_at:like`
        }).then(res => {
            setTotal(res.total);
        }).finally(() => {
            setLoading(false);
        })
    }, []); // eslint-disable-line

    return (
        <Card className="box-created-today dashboard-info-box wave wave-animate wave-success">
            <CardBody>
                {loading && <Loading local />}
                <div className="title">Thùng đã tạo hôm nay</div>
                <div className="total">{total}</div>
            </CardBody>
        </Card>
    );
};

export default BoxCreatedToday;