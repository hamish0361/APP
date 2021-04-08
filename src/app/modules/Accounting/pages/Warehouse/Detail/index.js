import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchUser } from 'app/modules/Auth/auth-redux/authSlice';
import formatNumber from 'helper/formatNumber';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import AccountingTable from '../../../components/AccountingTable';
import TopHeader from '../../../components/TopHeader';
import { fetchPaymentMethod } from '../../../redux/cardSlice';
import { fetchReceipt } from '../../../redux/receiptSlice';
import {
    createTransaction,
    fetchTransactions,
    fetchTransactionType,
    resetTransaction
} from '../../../redux/transactionSlice';
import DialogWarehouse from './DialogWarehouse';
import ItemCard from './ItemCard';
import TopFilter from './TopFilter';

const columns = [
    { id: 'id', title: 'id' },
    { id: 'transactionId', title: 'Mã giao dịch' },
    { id: 'amount', title: 'Số tiền' },
    { id: 'description', title: 'Mô tả' },
    { id: 'user_id', title: 'Người dùng' },
    { id: 'prepared_by_id', title: 'Người thực hiện' },
    { id: 'type', title: 'Loại' },
    { id: 'updated_at', title: 'Ngày thực hiện', isSort: true },
    { id: 'created_at', title: 'Ngày tạo' }
];

function WarehouseDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { params } = useRouteMatch();
    const { id } = params;

    // store
    const {
        accountingList,
        isLoading,
        isActionLoading,
        pagination
    } = useSelector(
        ({ accounting }) => ({
            accountingList: accounting.transaction.list,
            isLoading: accounting.transaction.isLoading,
            isActionLoading: accounting.transaction.isActionLoading,
            pagination: accounting.transaction.pagination
        }),
        shallowEqual
    );

    // state
    const [paramsRequest, setParamsRequest] = useState({
        page: 1,
        search: `payment_method_id:${id}`,
        with: 'receipts;type',
        orderBy: 'updated_at',
        sortedBy: 'asc',
        searchJoin: 'and'
    });
    const [isFirstLoading, setFirstLoading] = useState(true);
    const [isPayment, setPayment] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(resetTransaction());
        dispatch(fetchPaymentMethod());
        dispatch(fetchReceipt());
        dispatch(fetchTransactionType());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchTransactions(paramsRequest)).then(() => {
            setFirstLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsRequest]);

    const handlePageChange = newPage => {
        setParamsRequest({
            ...paramsRequest,
            page: newPage
        });
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        const searchReq = `payment_method_id:${id};${search}`;
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
        dispatch(fetchUser(params));
    };

    const loading = isLoading || isActionLoading;

    return (
        <>
            {loading && <Loading />}
            {/* begin header */}
            <TopHeader title="Thông tin thẻ">
                <button
                    className="btn btn-light btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <i className="fa fa-arrow-left" />
                    Quay lại
                </button>
                <button
                    style={{ width: '100px' }}
                    className="btn btn-primary btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        setShow(true);
                        setPayment(true);
                    }}
                >
                    Nộp tiền
                </button>
            </TopHeader>
            {/* end header */}
            <div className="px-8 pb-8">
                <>
                    {isFirstLoading ? (
                        <Skeleton count={1} height={800} />
                    ) : (
                        <>
                            {/* begin card */}
                            <ItemCard />
                            {/* end card */}
                            <Card>
                                <CardBody>
                                    <TopFilter onSearch={handleSubmitSearch} />
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
                    )}
                </>
            </div>
            {/* begin modal */}
            <DialogWarehouse
                isPayment={isPayment}
                show={show}
                onHide={() => setShow(false)}
                onSearchUser={handleSearchUser}
                onNewSubmit={handleNewSubmit}
            />
            {/* end modal */}
        </>
    );
}

export default WarehouseDetailPage;
