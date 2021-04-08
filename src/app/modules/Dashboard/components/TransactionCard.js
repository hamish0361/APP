import EmptyData from 'app/components/EmptyData';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, CardHeader } from '_metronic/_partials/controls';

TransactionCard.propTypes = {
    transactions: PropTypes.array
};

function TransactionCard({ transactions, intl }) {
    return (
        <>
            <Card style={{ marginBottom: '0px' }} className="h-100">
                <CardHeader
                    title={intl.formatMessage({
                        id: 'DASHBOARD.TRANSACTION.TITLE'
                    })}
                />
                <div
                    className="border m-8"
                    style={{ height: '69%', overflowX: 'auto' }}
                >
                    <div style={{ minWidth: '900px' }}>
                        <div className="d-flex">
                            <span className="w-25 font-size-h6 text-dark font-weight-bolder border-bottom py-5  px-8">
                                <FormattedMessage id="DASHBOARD.TRANSACTION.EXECUTION_DATE" />
                            </span>
                            <span className="w-25 font-size-h6 text-dark font-weight-bolder border-bottom py-5  px-8">
                                <FormattedMessage id="DASHBOARD.TRANSACTION.AMOUNT" />
                            </span>
                            <span className="w-25 font-size-h6 text-dark font-weight-bolder border-bottom py-5  px-8">
                                <FormattedMessage id="DASHBOARD.TRANSACTION.CONTENT" />
                            </span>
                            <span className="w-25 font-size-h6 text-dark font-weight-bolder border-bottom py-5  px-8">
                                <FormattedMessage id="DASHBOARD.TRANSACTION.PERFORMER" />
                            </span>
                        </div>
                        {transactions?.length > 0 ? (
                            <div
                                style={{
                                    height: '80%',
                                    maxHeight: '273px',
                                    overflowY: 'auto'
                                }}
                            >
                                {transactions?.map((transaction, index) => (
                                    <div
                                        key={index}
                                        className="d-flex py-5"
                                        style={{
                                            backgroundColor:
                                                index % 2 !== 1
                                                    ? '#e2e3ef'
                                                    : '-'
                                        }}
                                    >
                                        <div className="w-25 font-size-h6 px-8">
                                            {transaction.create_at || '-'}
                                        </div>
                                        <div className="w-25 font-size-h6 px-8">
                                            {formatNumber(transaction.amount) ||
                                                '-'}
                                        </div>
                                        <div className="w-25 font-size-h6 px-8">
                                            {transaction.description || '-'}
                                        </div>
                                        <div className="w-25 font-size-h6 px-8">
                                            {transaction.prepared_by_id || '-'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyData />
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
}

export default TransactionCard;
