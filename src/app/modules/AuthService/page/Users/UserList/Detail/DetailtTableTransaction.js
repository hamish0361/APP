import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import CustomTable from '../../../../components/CustomTable';

function DetailtTableTransaction({ intl, onPageChange }) {
    const { transactionList, pagination } = useSelector(
        state => state.authService.transaction
    );

    const columns = [
        {
            id: 'created_at',
            title: ` ${intl.formatMessage({
                id:
                    'AUTH_SERVICE.DECENTRALIZATION.TRANSACTION.TOPFILTER.CREATE_AT'
            })}`
        },
        {
            id: 'amount',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.DECENTRALIZATION.TRANSACTION.TOPFILTER.AMOUNT'
            })}`
        },
        {
            id: 'description',
            title: `${intl.formatMessage({
                id:
                    'AUTH_SERVICE.DECENTRALIZATION.TRANSACTION.TOPFILTER.DESCRIPTION'
            })}`
        },
        {
            id: 'prepared_by_id',
            title: `${intl.formatMessage({
                id:
                    'AUTH_SERVICE.DECENTRALIZATION.TRANSACTION.TOPFILTER.PREPARED_BY_ID'
            })}`
        }
    ];

    return (
        <Card>
            <CardHeader
                title={intl.formatMessage({
                    id: 'AUTH_SERVICE.DECENTRALIZATION.TRANSACTION'
                })}
            />
            <CardBody>
                <CustomTable
                    columns={columns}
                    rows={transactionList}
                    page={pagination.current}
                    lastpage={pagination.lastPage}
                    onPageChange={onPageChange}
                    isAction={false}
                />
            </CardBody>
        </Card>
    );
}

export default React.memo(DetailtTableTransaction);
