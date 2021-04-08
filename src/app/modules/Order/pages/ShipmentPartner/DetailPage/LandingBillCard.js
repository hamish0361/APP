import EmptyData from 'app/components/EmptyData';
import 'assets/css/order.scss';
import formatNumber from 'helper/formatNumber';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';

function LadingBillCard({ intl }) {
    const { ladingBillList } = useSelector(
        ({ warehouse }) => ({ ladingBillList: warehouse.ladingBill.list.data }),
        shallowEqual
    );
    return (
        <>
            <Card className="h-100">
                <CardHeader
                    title={intl.formatMessage({ id: 'ORDER.LADING_BILL' })}
                />
                {ladingBillList?.length > 0 ? (
                    <div className="pb-4">
                        <div className="landing-bill-card__header py-5">
                            <span className="col-3 order-title">
                                <FormattedMessage id="ORDER.CODE" />
                            </span>
                            <span className="col-6 order-title">
                                <FormattedMessage id="ORDER.SHIPMENT_METHOD" />
                            </span>
                            <span className="col-3 order-title">
                                <FormattedMessage id="ORDER.TOTAL_MONEY" />
                            </span>
                        </div>
                        <div className="order-card">
                            {ladingBillList?.map((bill, index) => (
                                <div
                                    key={index}
                                    className="landing-bill-card__item py-5"
                                    style={{
                                        backgroundColor:
                                            index % 2 !== 1 ? '#e2e3ef' : '-'
                                    }}
                                >
                                    <div className="col-3 order-title">
                                        {bill.id || '-'}
                                    </div>
                                    <div className="col-6 order-title">
                                        {bill.shipment_method_id || '-'}
                                    </div>
                                    <div className="col-3 order-title">
                                        {formatNumber(bill.balance) || '-'}
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
        </>
    );
}

export default LadingBillCard;
