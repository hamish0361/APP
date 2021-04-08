import EmptyData from 'app/components/EmptyData';
import 'assets/css/order.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';

LogCard.prototype = {
    onLog: PropTypes.func
};

function LogCard({ onLog = null, intl }) {
    const [log, setLog] = useState('');

    const { logList } = useSelector(
        ({ notification }) => ({
            logList: notification.log.list
        }),
        shallowEqual
    );

    const handleChange = e => {
        setLog(e.target.value);
    };

    const handleLog = () => {
        if (onLog) {
            setLog('');
            onLog(log);
        }
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
            <CardHeader title={intl.formatMessage({ id: 'ORDER.LOG' })} />
            <CardBody className="d-flex flex-column justify-content-between">
                <div className="row order-log-card">
                    <div className="col-12">
                        {logList?.length > 0 ? (
                            logList.map((item, index) => (
                                <div key={index} className="d-flex">
                                    <b className="mr-2">{item.creator_id}</b>
                                    <p
                                        style={{ color: 'rgb(177 141 28)' }}
                                        className="mr-2"
                                    >
                                        {item.created_at}:
                                    </p>
                                    <p> {renderContent(item.content)}</p>
                                </div>
                            ))
                        ) : (
                            <EmptyData />
                        )}
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="input-group mb-3">
                        <input
                            value={log}
                            className="form-control"
                            placeholder="Nhập ghi chú tại đây"
                            onChange={handleChange}
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="input-group-text"
                                id="basic-addon2"
                                onClick={handleLog}
                                style={{
                                    backgroundColor: '#3699ff',
                                    color: 'white'
                                }}
                                disabled={!log}
                            >
                                <FormattedMessage id="GLOBAL.BUTTON.WRITE" />
                            </button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default LogCard;
