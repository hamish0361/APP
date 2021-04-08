import EmptyData from 'app/components/EmptyData';
import 'assets/css/order.scss';
import formatNumber from 'helper/formatNumber';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, CardHeader } from '_metronic/_partials/controls';

function TransactionCard({ transactions, intl }) {
    return (
        <Card className="h-100">
            <CardHeader
                title={intl.formatMessage({ id: 'ORDER.TRANSACTION' })}
            />
            <div className="pb-4">
                <div className="transaction-card__header">
                    <span className="col-4 border-bottom py-5">
                        <FormattedMessage id="ORDER.EXECUTION_DATE" />
                    </span>
                    <span className="col-2 border-bottom py-5">
                        <FormattedMessage id="ORDER.AMOUNT" />
                    </span>
                    <span className="col-4 border-bottom py-5">
                        <FormattedMessage id="ORDER.PERFORMER" />
                    </span>
                    <span className="col-2 pr-0 border-bottom py-5">
                        <FormattedMessage id="ORDER.CONTENT" />
                    </span>
                </div>
                {transactions?.length > 0 ? (
                    <div className="order-card">
                        {transactions?.map((transaction, index) => (
                            <div
                                key={index}
                                className="transaction-card__item py-5"
                                style={{
                                    backgroundColor:
                                        index % 2 !== 1 ? '#e2e3ef' : '-'
                                }}
                            >
                                <div className="col-4 order-title">
                                    {transaction.create_at || '-'}
                                </div>
                                <div className="col-2 order-title">
                                    {formatNumber(transaction.amount) || '-'}
                                </div>
                                <div className="col-4 order-title">
                                    {transaction.prepared_by_id || '-'}
                                </div>
                                <div className="col-2 pr-0 order-title">
                                    {transaction.description || '-'}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyData />
                )}
            </div>
        </Card>
    );
}

export default TransactionCard;
