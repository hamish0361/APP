import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from '_metronic/_partials/controls';
import EmptyData from 'app/components/EmptyData';

LogCard.propTypes = {
    logs: PropTypes.array
};

function LogCard({ logs, intl }) {
    const handleDate = date => {
        if (!date) return;

        const dateTimeArr = date.split(' ');
        const dateArr = dateTimeArr[0]?.split('-');
        const dateObj = {
            day: dateArr[0],
            time: dateTimeArr[1]
        };
        return dateObj;
    };

    const renderContent = content => {
        if (!content.includes('{')) return content;
        let obj = JSON.parse(content, function(key, value) {
            return value;
        });
        return (
            obj.product_id ||
            obj.wrote ||
            obj.director_id ||
            obj.supplier_id ||
            obj.discount_tax_percent ||
            obj.addtional ||
            obj.status
        );
    };

    return (
        <Card className="h-100">
            <CardHeader
                title={intl.formatMessage({ id: 'DASHBOARD.LOG.TITLE' })}
            />
            {logs?.length > 0 ? (
                <div className="dashboard-log mx-8 h-100 mt-8">
                    <div
                        className="border"
                        style={{ height: '100%', overflow: 'auto' }}
                    >
                        {logs.map((item, index) => (
                            <div
                                className="d-flex justify-content-between p-4 border-bottom"
                                key={index}
                            >
                                <div className="d-flex w-100">
                                    <div className="dashboard-log__date p-2 mr-2 font-size-h6">
                                        {handleDate(item.created_at).day}
                                    </div>
                                    <div className="w-100">
                                        <div
                                            className="d-flex justify-content-between w-100"
                                            style={{ minWidth: '100px' }}
                                        >
                                            <div className="font-size-h6 font-weight-bolder opacity-80">
                                                {item.creator_id}
                                            </div>
                                            <div className="dashboard-log__time">
                                                {
                                                    handleDate(item.created_at)
                                                        .time
                                                }
                                            </div>
                                        </div>
                                        <div>{renderContent(item.content)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <EmptyData />
            )}
        </Card>
    );
}

export default LogCard;
