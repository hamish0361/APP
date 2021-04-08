import EmptyData from 'app/components/EmptyData';
import formatNumber from 'helper/formatNumber';
import React from 'react';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';

function DetailtListCurrency({ currencyList, intl }) {
    return (
        <Card className="h-100">
            <CardHeader
                title={intl.formatMessage({
                    id: 'AUTH_SERVICE.DECENTRALIZATION.BALANCE'
                })}
            />
            {currencyList.length > 0 ? (
                <CardBody>
                    <>
                        {currencyList.map((currency, index) => (
                            <div key={index} className="form-group ">
                                <label>{currency.currency?.name}</label>
                                <div>
                                    <div className="form-control bg-light">
                                        {formatNumber(currency.balance)}{' '}
                                        {currency.currency?.symbol}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                </CardBody>
            ) : (
                <CardBody className="d-flex flex-column justify-content-space-between">
                    <EmptyData />
                </CardBody>
            )}
        </Card>
    );
}

export default React.memo(DetailtListCurrency);
