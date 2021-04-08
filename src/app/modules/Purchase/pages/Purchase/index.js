import Loading from 'app/components/Loading';
import OrderTable from '../../components/OrderTable';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { fetchOrderStatus } from 'app/modules/Order/order-redux/orderStatusSlice';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Card, CardBody } from '_metronic/_partials/controls';
import { fetchPurchase, resetPurchase } from '../../redux/purchaseSlice';
import TopFilter from './TopFilter';
import { FormattedMessage, injectIntl } from 'react-intl';
import formatNumber from 'helper/formatNumber';

function OrderPurchasePage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const purchase = useSelector(state => state.purchase.list);
    const { purchaseList, pagination, isLoading } = purchase;
    const [params, setParams] = useState({
        page: 1,
        search: '',
        appends: 'supplier',
        with: 'items',
        searchFields: '',
        orderBy: 'created_at',
        sortedBy: 'desc'
    });

    const columns = [
        { id: 'id', title: intl.formatMessage({ id: 'ORDER.CODE' }) },
        { id: 'order_id', title: intl.formatMessage({ id: 'ORDER.CODE' }) },
        { id: 'product', title: intl.formatMessage({ id: 'ORDER.PRODUCT' }) },
        { id: 'buyer', title: intl.formatMessage({ id: 'PURCHASE.BUYER' }) },
        { id: 'supplier', title: intl.formatMessage({ id: 'ORDER.SUPPLIER' }) },
        { id: 'status', title: intl.formatMessage({ id: 'ORDER.STATUS' }) },
        {
            id: 'additional_cost',
            title: intl.formatMessage({ id: 'ORDER.ADDITIONAL_COST' })
        },
        { id: 'balance', title: intl.formatMessage({ id: 'ORDER.BALANCE' }) },
        {
            id: 'order',
            title: intl.formatMessage({ id: 'PURCHASE.ORDER_LIST' })
        },
        { id: 'date', title: intl.formatMessage({ id: 'ORDER.CREATED_DATE' }) }
    ];

    useEffect(() => {
        dispatch(fetchPurchase(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const paramsStatus = {
        search: 'directors.type_id:Purchase'
    };

    useEffect(() => {
        dispatch(resetPurchase());
        dispatch(fetchOrderStatus(paramsStatus));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };

    const handleViewEditRow = id => {
        history.push(`/mua-hang/don-mua-hang/${id}/chi-tiet`);
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        setParams({
            ...params,
            page: 1,
            search,
            searchFields
        });
    };

    const handleSort = (orderBy, sortedBy) => {
        setParams({
            ...params,
            page: 1,
            orderBy,
            sortedBy
        });
    };

    const rows = purchaseList?.map(item => {
        return {
            id: item.id,
            order_id: item.id,
            product: item.items?.map((item, index) => (
                <p key={index}>{item.product_id}</p>
            )),
            buyer: item?.buyer_id,
            supplier: (
                <div>
                    <p>{item.supplier?.name || '-'}</p>
                    <p>{item.supplier?.address || '-'}</p>
                </div>
            ),
            status: item.status?.name || '-',
            additional_cost: formatNumber(item.additional_cost),
            balance: formatNumber(item.balance),
            order: item.items?.map((item, index) => (
                <p key={index}>{item.id}</p>
            )),
            date: item.created_at || '-'
        };
    });
    return (
        <>
            {isLoading && <Loading />}
            <TopHeader title={intl.formatMessage({ id: 'PURCHASE.TITLE' })}>
                <Button
                    style={{ minWidth: '100px' }}
                    color="primary"
                    onClick={() => {
                        history.push('/mua-hang/don-mua-hang/tao-don');
                    }}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </Button>
            </TopHeader>
            <div className="px-8 pb-8">
                <Card>
                    <CardBody>
                        <TopFilter onSearch={handleSubmitSearch} intl={intl} />
                        <OrderTable
                            columns={columns}
                            rows={rows}
                            page={params.page}
                            lastpage={pagination.lastPage}
                            onViewEdit={handleViewEditRow}
                            onPageChange={handlePageChange}
                            onSort={handleSort}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(OrderPurchasePage));
