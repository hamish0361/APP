import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import useTrans from 'helper/useTrans';

import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import LinearProgress from 'app/components/Progress/Linear';

import './index.scss';

const InvoiceStatus = props => {

    const invoice = useSelector(state => state.warehouse.invoice.detail.data);
    const [trans] = useTrans();

    const containerStatus = useMemo(() => {

        let result = {
            volumePercent: 0,
            weightPercent: 0,
            volumeLabel: '',
            weightLabel: ''
        };

        if (!invoice) return result;

        result.volumePercent = invoice.volume * 100 / invoice.max_volume;
        result.volumeLabel = `${invoice.volume} / ${invoice.max_volume}`;

        result.weightPercent = invoice.weight * 100 / invoice.max_weight;
        result.weightLabel = `${invoice.weight} / ${invoice.max_weight}`;

        return result;

    }, [invoice]);

    return (
        <Card className="invoice-status">
            <CardHeader title={trans("warehouse.invoice.status.title")}></CardHeader>
            <CardBody>
                <div className="status-item">
                    <label htmlFor="">{trans("warehouse.invoice.status.volume")}</label>
                    <LinearProgress value={containerStatus.volumePercent} color="primary" label={containerStatus.volumeLabel} />
                </div>
                <div className="status-item">
                    <label htmlFor="">{trans("warehouse.invoice.status.weight")}</label>
                    <LinearProgress value={containerStatus.weightPercent} color="secondary" label={containerStatus.weightLabel} />
                </div>
            </CardBody>
        </Card>
    );
};

export default InvoiceStatus;