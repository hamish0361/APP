import React, { useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from '_metronic/_partials/controls';
import ProductTaxDetailForm from './ProductTaxDetailForm';
import { fetchTaxById, updateTax } from '../../../product-redux/taxSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';
import TopHeader from 'app/modules/Product/components/TopHeader';
import { injectIntl } from 'react-intl';

function ProductTaxDetailPage({
    history,
    match: {
        params: { id }
    },
    intl
}) {
    const dispatch = useDispatch();
    const tax = useSelector(state => state.product.tax);
    const { taxDetail, loading } = tax;

    useEffect(() => {
        dispatch(fetchTaxById(id));
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
            params: values
        };
        dispatch(updateTax(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.TAX.SUCCESS'
                    })}`
                );
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.TAX.FAIL'
                    })}`
                );
            }
        });
    };

    const initTax = {
        name: taxDetail?.name || '',
        percent: taxDetail?.percent || ''
    };

    return (
        <>
            {loading && <Loading />}
            <TopHeader
                title={intl.formatMessage({
                    id: 'PRODUCT.DETAIL.TAX.TITLE'
                })}
            >
                <button
                    type="button"
                    onClick={() => {
                        history.push('/product/tax');
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
                        <ProductTaxDetailForm
                            onSave={handleSave}
                            btnRef={btnRef}
                            initialValues={initTax}
                            intl={intl}
                        ></ProductTaxDetailForm>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductTaxDetailPage));
