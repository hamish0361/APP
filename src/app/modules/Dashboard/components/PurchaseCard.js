import EmptyData from 'app/components/EmptyData';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, CardHeader } from '_metronic/_partials/controls';

PurchaseCard.propTypes = {
    purchases: PropTypes.array
};

function PurchaseCard({ purchases, intl }) {
    return (
        <>
            <Card className="h-100">
                <CardHeader
                    title={intl.formatMessage({
                        id: 'DASHBOARD.PURCHASE.TITLE'
                    })}
                />

                <div className="border mx-8 mt-8" style={{ overflowX: 'auto' }}>
                    <div style={{ minWidth: '900px' }}>
                        <div className="d-flex">
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.PURCHASE.ID" />
                            </span>
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '40%' }}
                            >
                                <FormattedMessage id="DASHBOARD.PURCHASE.SUPPLIER" />
                            </span>
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.PURCHASE.STATUS" />
                            </span>
                            <span
                                className="font-size-h6 text-dark font-weight-bolder border-bottom py-5 px-8"
                                style={{ width: '20%' }}
                            >
                                <FormattedMessage id="DASHBOARD.PURCHASE.CREATED_DATE" />
                            </span>
                        </div>
                        {purchases?.length > 0 ? (
                            <div
                                style={{
                                    maxHeight: '273px',
                                    overflowY: 'auto'
                                }}
                            >
                                {purchases?.map((purchase, index) => (
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
                                            className="font-size-h6 px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {purchase.id || '-'}
                                        </div>
                                        <div
                                            className="font-size-h6 px-8"
                                            style={{ width: '40%' }}
                                        >
                                            <div>{purchase.supplier?.name}</div>
                                            <div>
                                                {purchase.supplier?.address}
                                            </div>
                                        </div>
                                        <div
                                            className="font-size-h6 px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {purchase.status?.name || '-'}
                                        </div>
                                        <div
                                            className="font-size-h6 px-8"
                                            style={{ width: '20%' }}
                                        >
                                            {purchase.created_at || '-'}
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

export default PurchaseCard;
