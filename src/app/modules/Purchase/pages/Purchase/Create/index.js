import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchSupplier } from 'app/modules/Product/product-redux/supplierSlice';
import TopHeader from 'app/modules/Purchase/components/TopHeader';
import { createPurchase } from 'app/modules/Purchase/redux/purchaseSlice';
import React, { useRef, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import NewForm from './NewForm';

function CreatePurchasePage({ intl }) {
    const history = useHistory();
    const dispatch = useDispatch();

    // store
    const {
        suppliers,
        isLoadingSupplier,
        isLoadingCustomer,
        isActionLoading
    } = useSelector(
        ({ product, authService, purchase }) => ({
            suppliers: product.supplier.supplierList,
            isLoadingSupplier: product.supplier.loading,
            isLoadingCustomer: authService.user.isLoading,
            isActionLoading: purchase.list.isActionLoading
        }),
        shallowEqual
    );

    // supplier
    const handleSearchSupplier = value => {
        const params = {
            search: value
        };
        dispatch(fetchSupplier(params));
    };

    // submit new
    const [isSuccessNew, setSuccessNew] = useState(false);
    const handleSubmitNew = params => {
        const body = {
            ...params,
            additional_cost: params.additional_cost.replace(/[^0-9]/g, '')
        };
        if (!params.supplier_id) {
            dialog.warning('Yêu cầu chọn nhà cung cấp');
        } else {
            dispatch(createPurchase(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        intl.formatMessage({ id: 'PURCHASE.NEW.SUCCESS' })
                    );
                    setSuccessNew(true);
                    history.push(
                        `/mua-hang/don-mua-hang/${res.payload.id}/chi-tiet`
                    );
                } else {
                    dialog.error(
                        intl.formatMessage({ id: 'PURCHASE.NEW.FAIL' })
                    );
                    setSuccessNew(false);
                }
            });
        }
    };

    const btnRef = useRef(null);
    const handleCreateClick = () => {
        if (btnRef.current) btnRef.current.click();
    };

    const loading = isLoadingCustomer || isLoadingSupplier || isActionLoading;

    return (
        <>
            {loading && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'PURCHASE.CREATE.TITLE' })}
            >
                <Button
                    type="button"
                    onClick={() => history.goBack()}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    <FormattedMessage id="GLOBAL.BUTTON.BACK" />
                </Button>
                {`  `}
                <Button
                    type="button"
                    color="primary"
                    className="ml-2"
                    onClick={handleCreateClick}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </Button>
            </TopHeader>
            <div className="px-8 pb-8">
                <NewForm
                    intl={intl}
                    suppliers={suppliers || []}
                    onSearchSupplier={handleSearchSupplier}
                    btnRef={btnRef}
                    onSubmitPurchaseOrder={handleSubmitNew}
                    isSuccessNew={isSuccessNew}
                />
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(CreatePurchasePage));
