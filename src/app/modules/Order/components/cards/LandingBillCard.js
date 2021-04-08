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
        <Card className="h-100">
            <CardHeader
                title={intl.formatMessage({ id: 'ORDER.LADING_BILL' })}
            />

            <div className="pb-4">
                <div className="landing-bill-card__header">
                    <span className="col-2 order-title font-weight-bold border-bottom py-5">
                        <FormattedMessage id="ORDER.CODE" />
                    </span>
                    <span className="col-5 order-title font-weight-bold border-bottom py-5">
                        <FormattedMessage id="ORDER.TOTAL_MONEY" />
                    </span>
                    <span className="col-5 order-title font-weight-bold border-bottom py-5">
                        <FormattedMessage id="ORDER.CREATED_DATE" />
                    </span>
                </div>
                {ladingBillList?.length > 0 ? (
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
                                <div className="col-2 order-title">
                                    {bill.id || '-'}
                                </div>
                                <div className="col-5 order-title">
                                    {formatNumber(bill.balance) || '-'}
                                </div>
                                <div className="col-5 order-title">
                                    {bill.created_at || '-'}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <CardBody>
                        <EmptyData />
                    </CardBody>
                )}
            </div>
        </Card>
    );
}

export default LadingBillCard;
