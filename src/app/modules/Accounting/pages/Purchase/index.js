import React, { useEffect, useState } from 'react';
import Loading from 'app/components/Loading';
import TopFilter from './TopFilter';
import TopHeader from '../../components/TopHeader';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from '_metronic/_partials/controls';
import {
    fetchTransactions,
    fetchTransactionsById,
    deleteReceipt,
    uploadFileReceipt,
    fetchAllTransaction,
    createReceipt
} from '../../redux/transactionSlice';
import ItemCard from './ItemCard';
import 'assets/css/order.scss';
import { dialog } from 'app/components/DialogNotify';
import DialogDetailTransaction from './PurchaseDetail';
import formatNumber from 'helper/formatNumber';
import AccountingTable from '../../components/AccountingTable';
import { injectIntl } from 'react-intl';

PurchasePage.propTypes = {};

function PurchasePage({ intl }) {
    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);
    const transactions = useSelector(state => state.accounting.transaction);
    const {
        list,
        pagination,
        isLoading,
        detailTransaction,
        listTransaction,
        isActionLoading,
        isLoadingDetail
    } = transactions;

    const rows = list.map(item => {
        return {
            ...item,
            idPurchase: item?.id,
            amount: formatNumber(item.amount),
            type_id: item?.type?.name
        };
    });

    const [params, setParams] = useState({
        page: 1,
        search: 'type_id:purchase',
        appends: 'user;preparedBy',
        with: 'receipts;type',
        searchJoin: 'and',
        sortedBy: 'asc'
    });

    useEffect(() => {
        dispatch(fetchTransactions(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);
    useEffect(() => {
        dispatch(fetchAllTransaction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // detail and edit receipt
    const handleViewEditRow = id => {
        setShow(true);
        const bodyFetch = {
            id,
            params: {
                with: 'receipts;type',
                appends: 'user;preparedBy'
            }
        };
        dispatch(fetchTransactionsById(bodyFetch));
    };

    //hanlde change page
    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };

    //handle sort page
    const handleSort = (orderBy, sortedBy) => {
        setParams({
            ...params,
            page: 1,
            orderBy,
            sortedBy
        });
    };

    //search transaction
    const handleSubmitSearch = ({ search }) => {
        const searchAPI = `type_id:purchase${search}`;
        setParams({
            ...params,
            page: 1,
            search: searchAPI
        });
    };

    //delete transaction
    const handleDeleteReceipt = (id, idTransaction) => {
        dispatch(deleteReceipt(id)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    ` ${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.SUCCESS'
                    })}`
                );
                const bodyFetch = {
                    id: idTransaction,
                    params: {
                        with: 'receipts;type',
                        appends: 'user;preparedBy'
                    }
                };
                dispatch(fetchTransactionsById(bodyFetch));
            } else {
                dialog.error(
                    ` ${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.ERROR'
                    })}`
                );
            }
        });
    };

    //upload files receipt default
    const handleFilesReceipt = (e, id, idTransaction) => {
        const files = e.target.files[0];
        const formData = new FormData();
        formData.set('file', files, files.name);
        const params = {
            id: id,
            data: formData
        };
        dispatch(uploadFileReceipt(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    ` ${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.UPDATE.FILE.SUCCESS'
                    })}`
                );
                const bodyFetch = {
                    id: idTransaction,
                    params: {
                        with: 'receipts;type',
                        appends: 'user;preparedBy'
                    }
                };
                dispatch(fetchTransactionsById(bodyFetch));
            } else {
                dialog.error(
                    ` ${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.UPDATE.FILE.ERROR'
                    })}`
                );
            }
        });
    };

    //upload files receipt new
    const handleFilesReceiptNew = (e, idTransaction) => {
        const files = e.target.files[0];
        const formData = new FormData();
        formData.set('file', files, files.name);
        const body = {
            param: { transaction_id: idTransaction },
            data: formData
        };
        dispatch(createReceipt(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    ` ${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.UPDATE.FILE.SUCCESS'
                    })}`
                );
                const bodyFetch = {
                    id: detailTransaction?.id,
                    params: {
                        with: 'receipts;type',
                        appends: 'user;preparedBy'
                    }
                };
                dispatch(fetchTransactionsById(bodyFetch));
            } else {
                dialog.error(
                    ` ${intl.formatMessage({
                        id: 'ACCOUNTING.RECEIPT.UPDATE.FILE.ERROR'
                    })}`
                );
            }
        });
    };
    const columns = [
        { id: 'idPurchase', title: 'Mã giao dịch' },
        {
            id: 'updated_at',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.EXECUTION_DATE'
            })}`,
            isSort: true
        },
        {
            id: 'id',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.ID'
            })}`
        },
        {
            id: 'amount',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.AMOUNT_OF_MONEY'
            })}`,
            isSort: true
        },
        {
            id: 'description',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.DESCRIPTION'
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
            id: 'type_id',
            title: ` ${intl.formatMessage({
                id: 'ACCOUNTING.ORDER.TYPE'
            })}`
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
            {isLoading && <Loading />}
            <TopHeader
                title={intl.formatMessage({
                    id: 'ACCOUNTING.PURCHASE.TITLE'
                })}
            ></TopHeader>
            <div className="px-8 pb-8">
                <>
                    <ItemCard intl={intl} />
                    <Card>
                        <CardBody>
                            <TopFilter
                                onSearch={handleSubmitSearch}
                                intl={intl}
                            />
                            <AccountingTable
                                columns={columns}
                                rows={rows}
                                page={params.page}
                                lastpage={pagination.lastPage}
                                onViewEdit={handleViewEditRow}
                                onSort={handleSort}
                                onPageChange={handlePageChange}
                                isDelete={false}
                                intl={intl}
                            />
                        </CardBody>
                    </Card>
                </>
            </div>
            {/*Modal detail order*/}
            <DialogDetailTransaction
                detailTransaction={detailTransaction}
                show={isShow}
                onFilesReceipt={handleFilesReceipt}
                onFilesReceiptNew={handleFilesReceiptNew}
                onDeleteReceipt={handleDeleteReceipt}
                listTransaction={listTransaction}
                onHide={() => setShow(false)}
                isActionLoading={isActionLoading}
                isLoadingDetail={isLoadingDetail}
                intl={intl}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(PurchasePage));
