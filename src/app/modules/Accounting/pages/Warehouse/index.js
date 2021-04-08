import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import AccountingTable from '../../components/AccountingTable';
import TopHeader from '../../components/TopHeader';
import { createPaymentMethod, fetchPaymentMethod } from '../../redux/cardSlice';
import DialogNew from './DialogNew';
import TopFilter from './TopFilter';

const columns = [
    { id: 'id', title: 'id' },
    { id: 'name', title: 'Tên thẻ' },
    { id: 'code', title: 'Mã thẻ' },
    { id: 'bank', title: 'Ngân hàng' },
    { id: 'balance', title: 'Số dư' }
];

function WarehousePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    // store
    const { paymentMethodList, isLoading, isActionLoading } = useSelector(
        ({ accounting }) => ({
            paymentMethodList: accounting.paymentMethod.list,
            isLoading: accounting.paymentMethod.isLoading,
            isActionLoading: accounting.paymentMethod.isActionLoading
        }),
        shallowEqual
    );

    const [isFirstLoading, setFirstLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [params, setParams] = useState({
        search: ''
    });

    useEffect(() => {
        dispatch(fetchPaymentMethod(params)).then(() => {
            setFirstLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleNewSubmit = params => {
        const { name, code } = params;
        const body = {
            name,
            id: code
        };
        if (!name) {
            dialog.warning('Vui lòng nhập người dùng');
        } else if (!code) {
            dialog.warning('Vui lòng nhập mã thẻ');
        } else {
            dispatch(createPaymentMethod(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dispatch(fetchPaymentMethod(params));
                    dialog.success('Tạo thành công');
                } else {
                    dialog.error(`Tạo Thất bại: ${res.error.message}`);
                }
                setShow(false);
            });
        }
    };

    const handleSubmitSearch = ({ search }) => {
        setParams({
            ...params,
            search
        });
    };

    const rows = paymentMethodList?.map(item => {
        return {
            id: item.id || '',
            name: item.name || '',
            code: '-',
            bank: '-',
            balance: '-'
        };
    });

    const handleViewDetail = id => {
        history.push(`/ke-toan/kho/${id}/chi-tiet`);
    };

    const loading = isLoading || isActionLoading;

    return (
        <>
            {loading && <Loading />}
            {/* begin header */}
            <TopHeader title="Danh sách thẻ">
                <button
                    style={{ width: '100px' }}
                    className="btn btn-primary btn-sm font-size-h6 font-weight-bolder mr-2"
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    Tạo thẻ
                </button>
            </TopHeader>
            {/* end header */}
            <div className="px-8 pb-8">
                <>
                    {isFirstLoading ? (
                        <Skeleton count={1} height={800} />
                    ) : (
                        <>
                            <Card>
                                <CardBody>
                                    <TopFilter onSearch={handleSubmitSearch} />
                                    <AccountingTable
                                        columns={columns}
                                        rows={rows}
                                        isDelete={false}
                                        onViewEdit={handleViewDetail}
                                        page={1}
                                        lastpage={1}
                                    />
                                </CardBody>
                            </Card>
                        </>
                    )}
                </>
            </div>
            {/* begin modal */}
            <DialogNew
                show={show}
                onHide={() => setShow(false)}
                onNewSubmit={handleNewSubmit}
            />
            {/* end modal */}
        </>
    );
}

export default WarehousePage;
