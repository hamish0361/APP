import Loading from 'app/components/Loading';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import TopHeader from '../../components/TopHeader';
import { fetchOrder, resetOrder } from '../../order-redux/orderSlice';
import { fetchOrderStatus } from '../../order-redux/orderStatusSlice';
import TopFilter from './TopFilter';
import { FormattedMessage, injectIntl } from 'react-intl';
import OrderTable from '../../components/OrderTable';

function ShipmentPartnerPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const order = useSelector(state => state.order.list);
    const { orderList, pagination, isLoading } = order;
    const [params, setParams] = useState({
        page: 1,
        search: 'director.type.id:shipment',
        searchJoin: 'and',
        searchFields: '',
        orderBy: 'updated_at',
        sortedBy: 'desc',
        with: 'trackings'
    });

    const columns = [
        {
            id: 'id',
            title: intl.formatMessage({ id: 'ORDER.SHIPMENT.TABLE_ID' })
        },
        {
            id: 'order_id',
            title: intl.formatMessage({ id: 'ORDER.SHIPMENT.TABLE_ID' })
        },
        {
            id: 'customer',
            title: intl.formatMessage({ id: 'ORDER.RETAIL.TABLE_CUSTOMER' }),
            isSort: false
        },
        {
            id: 'status',
            title: intl.formatMessage({ id: 'ORDER.SHIPMENT.TABLE_STATUS' }),
            isSort: false
        },
        {
            id: 'tracking',
            title: intl.formatMessage({ id: 'ORDER.SHIPMENT.TRACKING' }),
            isSort: false,
            width: '20%'
        },
        {
            id: 'note',
            title: intl.formatMessage({ id: 'ORDER.SHIPMENT.TABLE_NOTE' }),
            isSort: false,
            width: '22%'
        },
        {
            id: 'updated_at',
            title: intl.formatMessage({
                id: 'ORDER.SHIPMENT.TABLE_UPDATE_DATE'
            }),
            isSort: true
        }
    ];

    const paramsStatus = {
        search: 'directors.type_id:Shipment'
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

    const renderNote = note => {
        if (!note?.includes('{')) return note;

        const obj = JSON.parse(note, (key, value) => {
            return value;
        });

        return `${obj?.send_name} - ${obj?.send_phone} - ${obj?.isPackaged} - ${obj?.note}`;
    };

    const rows = orderList.map(order => {
        return {
            id: order.id || '-',
            order_id: order.id || '-',
            customer: order.customer_id || '-',
            status: order.status?.name || '-',
            note: renderNote(order.note) || '-',
            tracking: order.trackings ? (
                <div>
                    {order.trackings?.map(item => (
                        <span
                            key={item.id}
                            className={`label font-weight-bold label-lg label-inline m-1 ${
                                item.checked
                                    ? 'label-light-success'
                                    : 'label-light-danger'
                            }`}
                        >
                            {item.id}
                        </span>
                    ))}
                </div>
            ) : (
                '-'
            ),
            updated_at: order.updated_at || '-'
        };
    });

    const handleViewEditRow = id => {
        history.push(`/ban-hang/don-van-chuyen-ho/${id}/chi-tiet`);
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
                title={intl.formatMessage({ id: 'ORDER.SHIPMENT.TITLE' })}
            >
                <button
                    style={{ minWidth: '100px' }}
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        history.push('/ban-hang/don-van-chuyen-ho/tao-moi');
                    }}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </button>
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

export default injectIntl(connect(null, null)(ShipmentPartnerPage));
