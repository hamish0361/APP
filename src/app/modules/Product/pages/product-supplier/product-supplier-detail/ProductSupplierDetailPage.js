import Loading from 'app/components/Loading';
import React, { useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from '_metronic/_partials/controls';
import {
    fecthSupplierId,
    updateSupplier
} from '../../../product-redux/supplierSlice';
import ProductSupplierDetailForm from './ProductSupplierDetailForm';
import { dialog } from 'app/components/DialogNotify';
import TopHeader from 'app/modules/Product/components/TopHeader';
import { injectIntl } from 'react-intl';

function ProductSupplierDetailPage({
    history,
    match: {
        params: { id }
    },
    intl
}) {
    const dispatch = useDispatch();
    const _ = require('lodash');
    const supplier = useSelector(state => state.product.supplier);
    const { supplierDetail, loading } = supplier;

    useEffect(() => {
        dispatch(fecthSupplierId(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const btnRef = useRef();

    const handleEditClick = () => {
        if (btnRef && btnRef.current) {
            btnRef.current.click();
        }
    };

    const handleSave = values => {
        let body = {
            id: id,
            params: {
                ..._.omit(values, ['id'])
            }
        };
        dispatch(updateSupplier(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.SUPPLIER.SUCCESS'
                    })}`
                );
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.SUPPLIER.FAIL'
                    })}`
                );
            }
        });
    };

    const initSupplier = {
        id: supplierDetail.id || '',
        name: supplierDetail.name || '',
        email: supplierDetail.email || '',
        address: supplierDetail.address || '',
        link: supplierDetail.link || '',
        note: supplierDetail.note || ''
    };

    return (
        <>
            {loading && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'SUPPLIER.DETAIL.TITLE' })}
            >
                <button
                    type="button"
                    onClick={() => {
                        history.push('/product/supplier');
                    }}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.CANCEL'
                    })}
                </button>
                {`  `}

                {`  `}
                <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    onClick={handleEditClick}
                >
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.SAVE'
                    })}
                </button>
            </TopHeader>
            <div className="pb-8 px-8">
                <Card>
                    <CardBody>
                        <ProductSupplierDetailForm
                            onSave={handleSave}
                            btnRef={btnRef}
                            initialValues={initSupplier}
                            intl={intl}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductSupplierDetailPage));
