import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import NumberFormat from 'react-number-format';

InfoCard.propTypes = {
    purchase: PropTypes.object,
    onUpdatePurchaseInfo: PropTypes.func
};

function InfoCard({ purchase = {}, intl, onUpdatePurchaseInfo }) {
    const [additional, setAdditional] = useState('');
    useEffect(() => {
        setAdditional(purchase?.additional_cost);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchase?.id]);

    const handleChange = e => {
        setAdditional(e.target.value);
    };
    const handleUpdateInfo = () => {
        onUpdatePurchaseInfo(additional);
    };
    return (
        <Card className="h-100">
            <CardHeader title={intl.formatMessage({ id: 'ORDER.INFO' })}>
                <CardHeaderToolbar>
                    <button
                        className="btn btn-primary "
                        onClick={handleUpdateInfo}
                    >
                        <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                    </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.ID" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {purchase?.id || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.BUYER" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {purchase?.buyer_id || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.STATUS" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {purchase?.status?.name || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.ORDER_DATE" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {purchase?.created_at || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="PURCHASE.DIVISION.ITEM.PAYMENT_DATE" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {purchase?.payment_due_date || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="PURCHASE.DIVISION.ITEM.EXPECTED_DATE" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {purchase?.expected_delivery || ''}
                        </div>
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="ORDER.ADDITIONAL_COST" />
                        </label>
                    </div>
                    <div className="col-9">
                        <NumberFormat
                            thousandSeparator={true}
                            className="form-control"
                            name="additional_cost"
                            placeholder={intl.formatMessage({
                                id: 'PRODUCT.CREATE.PLACEHOLER.ID'
                            })}
                            value={additional}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="TRACKING.BALANCE" />
                        </label>
                    </div>
                    <div className="col-9">
                        <div className="form-control bg-light">
                            {formatNumber(purchase?.balance)}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default InfoCard;
