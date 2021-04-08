import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchCard } from 'app/modules/Accounting/redux/cardSlice';
import {
    fetchUserCurrency,
    resetUserCurrency
} from 'app/modules/Accounting/redux/userCurrencySlice';
import { fetchUserById } from 'app/modules/AuthService/auth-service-redux/userSlice';
import formatNumber from 'helper/formatNumber';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import AccountingTable from '../../../components/AccountingTable';
import TopHeader from '../../../components/TopHeader';
import {
    createTransaction,
    fetchTransactions,
    fetchTransactionType,
    resetTransaction
} from '../../../redux/transactionSlice';
import DialogPayment from './DialogPayment';
import ItemCard from './ItemCard';
import TopFilter from './TopFilter';

function CustomerDetailPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { params } = useRouteMatch();
    const { id } = params;

    const columns = [
        { id: 'id', title: intl.formatMessage({ id: 'ACCOUNTING.ID' }) },
        {
            id: 'transactionId',
            title: intl.formatMessage({ id: 'ACCOUNTING.TRANSACTION_ID' })
        },
        {
            id: 'amount',
            title: intl.formatMessage({ id: 'ACCOUNTING.AMOUNT' })
        },
        {
            id: 'currency',
            title: intl.formatMessage({ id: 'ACCOUNTING.CURRENCY' })
        },
        { id: 'type', title: intl.formatMessage({ id: 'ACCOUNTING.TYPE' }) },
        {
            id: 'description',
            title: intl.formatMessage({ id: 'ACCOUNTING.DESCRIPTION' })
        },
        {
            id: 'prepared_by_id',
            title: intl.formatMessage({ id: 'ACCOUNTING.PERFORMER' })
        },
        {
            id: 'updated_at',
            title: intl.formatMessage({ id: 'ACCOUNTING.UPDATE_DATE' }),
            isSort: true
        },
        {
            id: 'created_at',
            title: intl.formatMessage({ id: 'ACCOUNTING.CREATE_DATE' })
        }
    ];

    // store
    const {
        accountingList,
        isLoading,
        isActionLoading,
        pagination,
        user
    } = useSelector(
        ({ accounting, authService }) => ({
            accountingList: accounting.transaction.list,
            isLoading: accounting.transaction.isLoading,
            isActionLoading: accounting.transaction.isActionLoading,
            pagination: accounting.transaction.pagination,
            user: authService.user.userDetail
        }),
        shallowEqual
    );

    // state
    const [paramsRequest, setParamsRequest] = useState({
        page: 1,
        search: `user_id:${id}`,
        searchFields: '',
        with: 'receipts;type;currency',
        searchJoin: 'and',
        appends: 'user',
        orderBy: 'updated_at',
        sortedBy: 'asc'
    });
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(resetTransaction());
        dispatch(resetUserCurrency());
        dispatch(fetchTransactionType());
        dispatch(fetchCard());
        dispatch(fetchUserById({ id }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const paramsUser = {
        search: id,
        appends: 'user'
    };

    useEffect(() => {
        dispatch(fetchUserCurrency(paramsUser));
        dispatch(fetchTransactions(paramsRequest));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsRequest]);

    const handlePageChange = newPage => {
        setParamsRequest({
            ...paramsRequest,
            page: newPage
        });
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        const searchReq = `user_id:${id};${search}`;
        const searchFieldsReq = `user_id:=;${searchFields}`;
        setParamsRequest({
            ...paramsRequest,
            search: searchReq,
            searchFields: searchFieldsReq
        });
    };

    const handleSort = (orderBy, sortedBy) => {
        setParamsRequest({
            ...paramsRequest,
            page: 1,
            orderBy,
            sortedBy
        });
    };

    // dialog
    const handleSubmitModal = params => {
        const { amount, description, card, type } = params;
        const body = {
            amount,
            user_id: id,
            description,
            card_id: card,
            type_id: type
        };
        dispatch(createTransaction(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success('Tạo  thành công');
                dispatch(fetchTransactions(paramsRequest));
            } else {
                dialog.error('Tạo thất bại');
            }
            setShow(false);
        });
    };

    const rows = accountingList?.map(item => {
        return {
            id: item.id || '',
            transactionId: item.id || '',
            amount: formatNumber(item.amount) || '-',
            description: item.description || '-',
            prepared_by_id: item.prepared_by_id || '-',
            type: item.type?.name || '-',
            currency: item.currency?.name || '-',
            updated_at: item.updated_at || '-',
            created_at: item.created_at || '-'
        };
    });

    const loading = isActionLoading || isLoading;

    return (
        <>
            {loading && <Loading />}
            {/* begin header */}
            <TopHeader
                title={intl.formatMessage({
                    id: 'ACCOUNTING.CUSTOMER.DETAIL.TITLE'
                })}
            >
                <button
                    className="btn btn-light btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <i className="fa fa-arrow-left" />
                    <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                </button>
                <button
                    className="btn btn-primary btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.MONEY" />
                </button>
            </TopHeader>
            {/* end header */}
            <div className="px-8 pb-8">
                <>
                    {/* begin card */}
                    <ItemCard user={user} />
                    {/* end card */}
                    <Card>
                        <CardBody>
                            <TopFilter
                                onSearch={handleSubmitSearch}
                                intl={intl}
                            />
                            <AccountingTable
                                columns={columns}
                                rows={rows}
                                page={paramsRequest.page}
                                lastpage={pagination.lastPage}
                                isAction={false}
                                onSort={handleSort}
                                isIndex={false}
                                onPageChange={handlePageChange}
                            />
                        </CardBody>
                    </Card>
                </>
            </div>
            {/* begin modal */}
            <DialogPayment
                intl={intl}
                show={show}
                onHide={() => setShow(false)}
                onNewSubmit={handleSubmitModal}
            />
            {/* end modal */}
        </>
    );
}

export default injectIntl(connect(null, null)(CustomerDetailPage));
