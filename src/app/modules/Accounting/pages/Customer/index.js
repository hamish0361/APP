import Loading from 'app/components/Loading';
import formatNumber from 'helper/formatNumber';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import AccountingTable from '../../components/AccountingTable';
import TopHeader from '../../components/TopHeader';
import { fetchUserCurrency } from '../../redux/userCurrencySlice';
import TopFilter from './TopFilter';

function CustomerPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const columns = [
        { id: 'id', title: intl.formatMessage({ id: 'ACCOUNTING.ID' }) },
        {
            id: 'username',
            title: intl.formatMessage({ id: 'ACCOUNTING.USERNAME' })
        },
        { id: 'email', title: intl.formatMessage({ id: 'ACCOUNTING.EMAIL' }) },
        { id: 'role', title: intl.formatMessage({ id: 'ACCOUNTING.ROLE' }) },
        {
            id: 'payment_sales_order',
            title: intl.formatMessage({ id: 'ACCOUNTING.PAYMENT_SALE_ORDER' })
        },
        {
            id: 'payment_purchase_order',
            title: intl.formatMessage({
                id: 'ACCOUNTING.PAYMENT_PURCHASE_ORDER'
            })
        },
        {
            id: 'payment_service',
            title: intl.formatMessage({ id: 'ACCOUNTING.PAYMENT_SERVICE' })
        },
        {
            id: 'deposit',
            title: intl.formatMessage({ id: 'ACCOUNTING.DEPOSIT' })
        },
        {
            id: 'refund',
            title: intl.formatMessage({ id: 'ACCOUNTING.REFUND' })
        },
        {
            id: 'total_payment',
            title: intl.formatMessage({ id: 'ACCOUNTING.TOTAL_PAYMENT' })
        },
        {
            id: 'balance',
            title: intl.formatMessage({ id: 'ACCOUNTING.BALANCE' })
        }
    ];

    // store
    const { userList, isLoading, pagination } = useSelector(
        ({ accounting }) => ({
            userList: accounting.userCurrency.list,
            isLoading: accounting.userCurrency.isLoading,
            pagination: accounting.userCurrency.pagination
        }),
        shallowEqual
    );

    // state
    const [params, setParams] = useState({
        page: 1,
        appends: 'user.role',
        search: '',
        searchFields: ''
    });

    useEffect(() => {
        dispatch(fetchUserCurrency(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        setParams({
            ...params,
            page: 1,
            search,
            searchFields
        });
    };

    const handleViewDetail = id => {
        history.push(`/ke-toan/khach-hang/${id}/chi-tiet`);
    };

    const rows = userList?.map(item => {
        return {
            id: item.user_id || '',
            username: item.user_id || '',
            email: item.user?.email || '-',
            role: item.user?.role?.name || '-',
            payment_sales_order: formatNumber(item.payment_sales_order),
            payment_purchase_order: formatNumber(item.payment_purchase_order),
            payment_service: formatNumber(item.payment_service),
            deposit: formatNumber(item.deposit),
            refund: formatNumber(item.refund),
            total_payment: formatNumber(item.total_payment),
            balance: formatNumber(item.balance)
        };
    });

    return (
        <>
            {isLoading && <Loading />}
            {/* begin header */}
            <TopHeader
                title={intl.formatMessage({ id: 'ACCOUNTING.CUSTOMER.TITLE' })}
            />
            {/* end header */}
            <div className="px-8 pb-8">
                <Card>
                    <CardBody>
                        <TopFilter onSearch={handleSubmitSearch} intl={intl} />
                        <AccountingTable
                            width="1750px"
                            columns={columns}
                            rows={rows}
                            page={params.page}
                            lastpage={pagination.lastPage}
                            isDelete={false}
                            onViewEdit={handleViewDetail}
                            onPageChange={handlePageChange}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(CustomerPage));
