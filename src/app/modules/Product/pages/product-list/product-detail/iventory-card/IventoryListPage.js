import CustomTable from './CustomTable';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import PropTypes from 'prop-types';
import Loading from 'app/components/Loading';
// import Loading from 'app/components/Loading';

IventoryListPage.propTypes = {
    params: PropTypes.object,
    pagination: PropTypes.object,
    list: PropTypes.array,
    onChangePage: PropTypes.func,
    loadingIventory: PropTypes.bool
};

function IventoryListPage({
    params = null,
    pagination = '',
    list = null,
    onChangePage,
    intl,
    loadingIventory
}) {
    const history = useHistory();

    const handleViewEditRow = row => {
        const sfaID = row?.sfa_id;
        const id = row?.id;
        history.push(`/warehouse/inbound/step-2/${sfaID}/${id}`);
    };

    const columns = [
        {
            id: 'id',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.IVENTORY.ID_SKU'
            })}`
        },
        {
            id: 'sfa_id',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.IVENTORY.ID_SKU'
            })}`
        },
        {
            id: 'id',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.IVENTORY.ID_SKU'
            })}`
        },
        {
            id: 'duplicate',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.IVENTORY.QUANTITY_BOX'
            })}`
        },
        {
            id: 'weight',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.IVENTORY.WEIGHT'
            })}`
        },
        {
            id: 'volume',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.IVENTORY.VOLUME'
            })}`
        },
        {
            id: 'created_at',
            title: ` ${intl.formatMessage({
                id: 'PRODUCT.DETAIL.IVENTORY.CREATE_AT'
            })}`
        }
    ];
    return (
        <>
            <Card>
                {loadingIventory && <Loading local={true} />}
                <CardHeader
                    title={intl.formatMessage({
                        id: 'PRODUCT.DETAIL.INVENTORY.TITLE'
                    })}
                ></CardHeader>
                <CardBody>
                    <CustomTable
                        columns={columns}
                        rows={list}
                        page={params.page}
                        lastpage={pagination.lastPage}
                        onViewEdit={handleViewEditRow}
                        onPageChange={onChangePage}
                        isDelete={false}
                        intl={intl}
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default IventoryListPage;
