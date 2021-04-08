import Loading from 'app/components/Loading';
import formatNumber from 'helper/formatNumber';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import OrderTable from '../../components/OrderTable';
import TopHeader from '../../components/TopHeader';
import { fetchOrder, resetOrder } from '../../order-redux/orderSlice';
import { fetchOrderStatus } from '../../order-redux/orderStatusSlice';
import TopFilter from './TopFilter';

function AuctionPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const order = useSelector(state => state.order.list);
    const { orderList, pagination, isLoading } = order;
    const [params, setParams] = useState({
        page: 1,
        search: 'director.type.id:auction',
        searchJoin: 'and',
        searchFields: '',
        orderBy: 'updated_at',
        sortedBy: 'desc'
    });

    const columns = [
        {
            id: 'id',
            title: intl.formatMessage({ id: 'ORDER.AUCTION.TABLE_ID' })
        },
        {
            id: 'order_id',
            title: intl.formatMessage({ id: 'ORDER.AUCTION.TABLE_ID' })
        },
        {
            id: 'customer',
            title: intl.formatMessage({ id: 'common.customer' })
        },
        {
            id: 'product',
            title: intl.formatMessage({ id: 'ORDER.AUCTION.TABLE_PRODUCT' })
        },
        {
            id: 'balance',
            title: intl.formatMessage({ id: 'ORDER.AUCTION.TABLE_PRICE' })
        },
        {
            id: 'status',
            title: intl.formatMessage({ id: 'ORDER.AUCTION.TABLE_STATUS' })
        },
        {
            id: 'note',
            title: intl.formatMessage({ id: 'ORDER.AUCTION.TABLE_NOTE' }),
            width: '22%'
        },
        {
            id: 'updated_at',
            title: intl.formatMessage({
                id: 'ORDER.AUCTION.TABLE_UPDATE_DATE'
            }),
            isSort: true
        }
    ];

    const paramsStatus = {
        search: 'directors.type_id:Auction'
    };

    useEffect(() => {
        dispatch(resetOrder());
        dispatch(fetchOrderStatus(paramsStatus));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchOrder(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const rows = orderList.map(order => {
        return {
            id: order.id || '-',
            order_id: order.id || '-',
            customer: order.customer_id || '-',
            product: order.items?.product || '-',
            balance: formatNumber(order?.balance) || '-',
            status: order.status ? order.status.name : '-',
            note: order.note || '-',
            updated_at: order.updated_at || '-'
        };
    });

    const handleViewEditRow = id => {
        history.push(`/ban-hang/don-dau-gia/${id}/chi-tiet`);
    };

    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };

    // filter
    const handleSubmitSearch = ({ search, searchFields }) => {
        setParams({
            ...params,
            page: 1,
            search,
            searchFields,
            orderBy: 'updated_at',
            sortedBy: 'asc'
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

    return (
        <>
            {isLoading && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'ORDER.AUCTION.TITLE' })}
            />
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

export default injectIntl(connect(null, null)(AuctionPage));
