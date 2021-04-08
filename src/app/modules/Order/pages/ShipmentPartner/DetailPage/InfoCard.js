import usePrevious from 'helper/usePrevious';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

InfoCard.propTypes = {
    order: PropTypes.object,
    statusRes: PropTypes.object,
    onUpdate: PropTypes.func
};

function InfoCard({ order = {}, onUpdate = null, statusRes, intl }) {
    const [note, setNote] = useState('');
    const notePrev = usePrevious(order?.note || '');

    useEffect(() => {
        setNote(order?.note || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order?.note]);

    const handleInputChange = e => {
        setNote(e.target.value);
    };

    const handleUpdate = () => {
        if (onUpdate) onUpdate(note);
    };

    return (
        <Card className="h-100">
            <CardHeader title={intl.formatMessage({ id: 'ORDER.INFO' })}>
                <CardHeaderToolbar>
                    <Button
                        color="primary"
                        onClick={handleUpdate}
                        disabled={notePrev === note}
                    >
                        <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.ID" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {order?.id || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.CUSTOMER" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {order?.customer_id || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.STATUS" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {statusRes?.name || order?.status?.name}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.TYPE" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {order?.type?.name || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.NOTE" />
                        </span>
                    </div>
                    <div className="col-9">
                        <input
                            value={note}
                            className="form-control"
                            placeholder="Nhập ghi chú tại đây"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.ORDER_DATE" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {order?.create_at || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <span className="order-title">
                            <FormattedMessage id="ORDER.LAST_UPDATE" />
                        </span>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {order?.updated_at || ''}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default InfoCard;
