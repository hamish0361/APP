import EmptyData from 'app/components/EmptyData';
import 'assets/css/order.scss';
import formatNumber from 'helper/formatNumber';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';

function BoxCard({ intl }) {
    const { boxList } = useSelector(
        ({ warehouse }) => ({ boxList: warehouse.box.list.data }),
        shallowEqual
    );

    return (
        <Card className="h-100">
            <CardHeader title={intl.formatMessage({ id: 'ORDER.BOX' })} />
            {boxList?.length > 0 ? (
                <div className="pb-4">
                    <div className="box-card__header py-5">
                        <span className="col-4">
                            <FormattedMessage id="warehouse.sfa.id" />
                        </span>
                        <span className="col-4">
                            <FormattedMessage id="ORDER.WEIGHT" />
                        </span>
                        <span className="col-4">
                            <FormattedMessage id="ORDER.VOLUME" />
                        </span>
                    </div>
                    <div className="order-card">
                        {boxList?.map((box, index) => (
                            <div
                                key={index}
                                className="box-card__item py-5"
                                style={{
                                    backgroundColor:
                                        index % 2 !== 1 ? '#e2e3ef' : ''
                                }}
                            >
                                <div className="col-4 order-title">
                                    {box?.sfa_id || '-'}
                                </div>
                                <div className="col-4 order-title">
                                    {formatNumber(box?.weight)}{' '}
                                    {intl.formatMessage({
                                        id: 'ORDER.UNIT.KG'
                                    })}
                                </div>
                                <div className="col-4 order-title">
                                    {formatNumber(box?.volume)}{' '}
                                    {intl.formatMessage({
                                        id: 'ORDER.UNIT.M3'
                                    })}
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

export default BoxCard;
