import ItemTable from './ItemTable';
import PropTypes from 'prop-types';
import React from 'react';
import { CardBody, CardHeader, Card } from '_metronic/_partials/controls';

OrderCard.propTypes = {
    orders: PropTypes.array
};

function OrderCard({ orders = [], intl }) {
    const columns = [
        { id: 'id', title: intl.formatMessage({ id: 'TRACKING.ID' }) },
        {
            id: 'order_id',
            title: intl.formatMessage({ id: 'TRACKING.ORDER_ID' })
        },
        {
            id: 'customer',
            title: intl.formatMessage({ id: 'TRACKING.CUSTOMER' })
        },
        { id: 'status', title: intl.formatMessage({ id: 'TRACKING.STATUS' }) },
        { id: 'type', title: intl.formatMessage({ id: 'TRACKING.TYPE' }) },
        {
            id: 'date',
            title: intl.formatMessage({ id: 'TRACKING.CREATE_DATE' })
        }
    ];

    const rows = orders.map(item => {
        return {
            id: item.id || '',
            order_id: item.id || '',
            customer: item.customer_id || '',
            status: item.status ? item.status.name : '',
            type: item.type ? item.type.name : '',
            date: item.created_at || ''
        };
    });
    return (
        <Card>
            <CardHeader
                title={intl.formatMessage({
                    id: 'TRACKING.DETAIL.ORDER.TITLE'
                })}
            />
            <CardBody>
                <ItemTable
                    columns={columns}
                    rows={rows}
                    isAction={false}
                    page={1}
                    lastpage={1}
                />
            </CardBody>
        </Card>
    );
}

export default OrderCard;
