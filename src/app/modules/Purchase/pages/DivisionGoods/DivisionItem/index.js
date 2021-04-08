import React from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import { Card, CardBody } from '_metronic/_partials/controls';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';

DivisionItem.propTypes = {
    purchase: PropTypes.object,
    onClickDetail: PropTypes.func
};

function DivisionItem({ purchase, onClickDetail }) {
    return (
        <Card className="purchase-item">
            <CardBody>
                <div className="purchase-info">
                    <div
                        className="purchase-head"
                        onClick={() => onClickDetail(purchase?.id)}
                    >
                        <div className="purchase-info--id">
                            {purchase?.id}
                            <span className="svg-icon svg-icon-primary svg-icon-2x redirect-icon">
                                <SVG
                                    src={toAbsoluteUrl(
                                        '/media/svg/icons/Navigation/Arrow-right.svg'
                                    )}
                                ></SVG>
                            </span>
                        </div>
                    </div>

                    <div className="purchase-info--arrival_date">
                        <FormattedMessage id="PURCHASE.DIVISION_GOODS.EXPECTED_DELIVERY" />
                        : <b>{purchase?.expected_delivery}</b>
                    </div>
                    <div className="purchase-info--tracking">
                        <FormattedMessage id="PURCHASE.DIVISION_GOODS.PAYMENT_DUE_DATE" />
                        : <b>{purchase?.payment_due_date}</b>
                    </div>
                    <div className="purchase-info--tracking">
                        <FormattedMessage id="ORDER.STATUS" />:{' '}
                        <b>{purchase?.status?.name}</b>
                    </div>
                </div>

                <div className="purchase-list-box">
                    {purchase?.items?.map((item, index) => (
                        <div className="purchase-box-item" key={index}>
                            <div className="purchase-box-item--id mr-4">
                                {item.product_id}
                            </div>
                            <div className="purchase-box-item">
                                <span className="text-danger">
                                    {item.quantity_in_order_product_purchase}
                                </span>
                                /
                                <span className="text-success">
                                    {item.quantity}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}

export default DivisionItem;
