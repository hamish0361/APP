import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchCardById } from 'app/modules/Accounting/redux/cardSlice';
import { fetchUsers } from 'app/modules/AuthService/auth-service-redux/userSlice';
import formatNumber from 'helper/formatNumber';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
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

function CardDetailPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { params } = useRouteMatch();
    const { id } = params;

    // store
    const {
        accountingList,
        isLoading,
        isActionLoading,
        pagination,
        card
    } = useSelector(
        ({ accounting }) => ({
            accountingList: accounting.transaction.list,
            isLoading: accounting.transaction.isLoading,
            isActionLoading: accounting.transaction.isActionLoading,
            pagination: accounting.transaction.pagination,
            card: accounting.card.detail
        }),
        shallowEqual
    );

    // state
    const [paramsRequest, setParamsRequest] = useState({
        page: 1,
        search: `card_id:${id}`,
        with: 'receipts;type;currency',
        orderBy: 'updated_at',
        sortedBy: 'asc',
        searchJoin: 'and'
    });
    const [isPayment, setPayment] = useState(true);
    const [show, setShow] = useState(false);
    const paramDetail = {
        id,
        params: {
            with: 'bank'
        }
    };

    useEffect(() => {
        dispatch(resetTransaction());
        dispatch(fetchTransactionType());
        dispatch(fetchCardById(paramDetail));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
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
        const searchReq = `card_id:${id};${search}`;
        setParamsRequest({
            ...paramsRequest,
            page: 1,
            search: searchReq,
            searchFields
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

    const handleNewSubmit = params => {
        const { amount, description, user, type } = params;
        const body = {
            amount,
            description,
            user_id: user,
            type_id: type,
            payment_method_id: id
        };

        dispatch(createTransaction(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dispatch(fetchTransactions(paramsRequest));
                dialog.success('Tạo thành công đơn nộp tiền');
            } else {
                dialog.error(`Tạo Thất bại: ${res.error.message}`);
            }
        });
    };

    const rows = accountingList?.map(item => {
        return {
            id: item.id || '',
            transactionId: item.id || '',
            amount: formatNumber(item.amount) || '-',
            description: item.description || '-',
            user_id: item.user_id || '-',
            prepared_by_id: item.prepared_by_id || '-',
            type: item.type?.name || '-',
            currency: item.currency?.name || '-',
            updated_at: item.updated_at || '-',
            created_at: item.created_at || '-'
        };
    });

    // dialog
    const handleSearchUser = ({ value, type }) => {
        const params = {
            search: value,
            searchFields: `${type}:like`
        };
        dispatch(fetchUsers(params));
    };

    const loading = isLoading || isActionLoading;

    const columns = [
        {
            id: 'id',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.ID'
            })}`
        },
        {
            id: 'transactionId',
            title: `${intl.formatMessage({
                id: 'ACCOUNTING.CARD.TOPFILTER.ID'
            })}`
        },
        {
            id: 'amount',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.AMOUNT_OF_MONEY'
            })}`
        },
        {
            id: 'currency',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.CURRENCY'
            })}`
        },
        {
            id: 'type',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.TYPE'
            })}`
        },
        {
            id: 'user_id',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.USER'
            })}`
        },
        {
            id: 'prepared_by_id',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.PERFORMER'
            })}`
        },
        {
            id: 'description',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.DESCRIPTION'
            })}`
        },
        {
            id: 'updated_at',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.EXECUTION_DATE'
            })}`,
            isSort: true
        },
        {
            id: 'created_at',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.CREATED_DATE'
            })}`
        }
    ];

    return (
        <>
            {loading && <Loading />}
            {/* begin header */}
            <TopHeader
                title={intl.formatMessage({
                    id: 'ACCOUNTING.CARD.DETAIL.TITLE'
                })}
            >
                <button
                    className="btn btn-light btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <i className="fa fa-arrow-left" />
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.BACK'
                    })}
                </button>
                <button
                    style={{ minWidth: '100px' }}
                    className="btn btn-primary btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        setShow(true);
                        setPayment(true);
                    }}
                >
                    {intl.formatMessage({
                        id: 'ACCOUNTING.CARD.PAYMENT'
                    })}
                </button>
            </TopHeader>
            {/* end header */}
            <div className="px-8 pb-8">
                <>
                    {/* begin card */}
                    <ItemCard bank={card?.bank || {}} />
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
                isPayment={isPayment}
                show={show}
                onHide={() => setShow(false)}
                onSearchUser={handleSearchUser}
                onNewSubmit={handleNewSubmit}
                intl={intl}
            />
            {/* end modal */}
        </>
    );
}

export default injectIntl(connect(null, null)(CardDetailPage));
