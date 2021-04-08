import EmptyData from 'app/components/EmptyData';
import 'assets/css/order.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

TrackingCard.propTypes = {
    trackingList: PropTypes.array,
    onNewCick: PropTypes.func,
    onViewClick: PropTypes.func,
    onCreate: PropTypes.func
};

function TrackingCard({
    trackingList = [],
    onNewCick,
    onViewClick,
    intl,
    onCreate
}) {
    const handleViewEdit = id => {
        onViewClick(id);
    };

    return (
        <Card className="h-100">
            <CardHeader
                title={intl.formatMessage({ id: 'ORDER.TRACKING_LIST' })}
            >
                <CardHeaderToolbar>
                    <Button color="primary" onClick={onNewCick}>
                        <FormattedMessage id="GLOBAL.BUTTON.CREATE" />
                    </Button>
                    <Button className="ml-2" color="primary" onClick={onCreate}>
                        <FormattedMessage id="TRACKING.BUTTON.CREATE_FAST" />
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            {trackingList?.length > 0 ? (
                <div className="pb-4">
                    <div className="tracking-card__header py-5">
                        <span className="col-6">
                            <FormattedMessage id="GLOBAL.NO" />
                        </span>
                        <span className="col-6">
                            <FormattedMessage id="ORDER.CODE_TRACKING" />
                        </span>
                    </div>
                    <div className="order-card">
                        {trackingList?.map((transaction, index) => (
                            <div
                                key={index}
                                className="tracking-card__item py-5"
                                style={{
                                    backgroundColor:
                                        index % 2 !== 1 ? '#e2e3ef' : '-'
                                }}
                                onClick={() => handleViewEdit(transaction.id)}
                            >
                                <div className="col-6 order-title">
                                    {index + 1}
                                </div>
                                <div className="col-6">
                                    <span
                                        className={`label font-weight-bold label-lg label-inline mr-2 ${
                                            transaction.checked
                                                ? 'label-light-success'
                                                : 'label-light-danger'
                                        }`}
                                    >
                                        {transaction.id}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <CardBody>
                    <EmptyData />
                </CardBody>
            )}
        </Card>
    );
}

export default TrackingCard;
