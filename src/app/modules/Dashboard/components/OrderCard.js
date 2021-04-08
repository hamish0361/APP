import EmptyData from 'app/components/EmptyData';
import formatNumber from 'helper/formatNumber';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, CardHeader } from '_metronic/_partials/controls';

OrderCard.propTypes = {
    orders: PropTypes.array
};

function OrderCard({ orders, intl }) {
    return (
        <>
            <Card style={{ marginBottom: '0px' }} className="h-100">
                <CardHeader
                    title={intl.formatMessage({ id: 'DASHBOARD.ORDER.TITLE' })}
                />
                <div
                    className="border m-8"
                    style={{ height: '69%', overflowX: 'auto' }}
                >
                    <div style={{ minWidth: '900px' }}>
                        <div className="d-flex">
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.ORDER.ID" />
                            </span>
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.ORDER.PRICE" />
                            </span>
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.ORDER.STATUS" />
                            </span>
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.ORDER.TYPE" />
                            </span>
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.ORDER.UPDATE_DATE" />
                            </span>
                        </div>
                        {orders?.length > 0 ? (
                            <div
                                style={{
                                    height: '80%',
                                    maxHeight: '273px',
                                    overflowY: 'auto'
                                }}
                            >
                                {orders?.map((order, index) => (
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
                                        <div
                                            className="font-size-h6  px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {order.id || '-'}
                                        </div>
                                        <span
                                            className="font-size-h6 px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {formatNumber(
                                                order.cost?.balance
                                            ) || 0}
                                        </span>
                                        <span
                                            className="font-size-h6 px-2 px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {order.status?.name || '-'}
                                        </span>
                                        <span
                                            className="font-size-h6 px-2 px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {order.type?.name || '-'}
                                        </span>
                                        <span
                                            className="font-size-h6 px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {order.updated_at || '-'}
                                        </span>
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

export default OrderCard;
