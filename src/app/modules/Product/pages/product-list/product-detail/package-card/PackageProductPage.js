import React, { useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import DialogDeletePackage from './DialogDeletePackage';
import PackageProductForm from './PackageProductForm';
import { dialog } from 'app/components/DialogNotify';
import { updatePackage } from 'app/modules/Product/product-redux/packageSlice';
import './index.scss';
import DialogNewPackage from './DialogNewPackage';
import EmptyData from 'app/components/EmptyData';
import { injectIntl } from 'react-intl';

PackageProductPage.propTypes = {
    initialValues: PropTypes.object,
    idProduct: PropTypes.string
};

function PackageProductPage({ initialValues = {}, idProduct = '', intl }) {
    const dispatch = useDispatch();
    const btnRef = useRef();
    const history = useHistory();
    const _ = require('lodash');
    const [loadData, setLoadData] = useState(null);

    const initProduct = {
        quantity: loadData?.quantity || initialValues?.quantity || '',
        weight: loadData?.weight || initialValues?.weight || '',
        height: loadData?.height || initialValues?.height || '',
        length: loadData?.length || initialValues?.length || '',
        width: loadData?.width || initialValues?.width || '',
        volume: loadData?.volume || initialValues?.volume || '',
        volumetric_weight:
            loadData?.volumetric_weight ||
            initialValues?.volumetric_weight ||
            ''
    };
    const handleEditClick = () => {
        if (btnRef && btnRef.current) {
            btnRef.current.click();
        }
    };

    const handleSave = values => {
        let body = {
            id: idProduct,
            params: {
                ..._.omit(values, ['volume', 'volumetric_weight'])
            }
        };
        dispatch(updatePackage(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UPDATE_PACKAGE.DIALOG_SUCCESS'
                    })}`
                );
                setLoadData(res.payload);
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UPDATE_PACKAGE.DIALOG_ERROR'
                    })}`
                );
            }
        });
    };

    return (
        <>
            <Route path="/product/:id/detail/delete-package">
                {({ history, match }) => (
                    <DialogDeletePackage
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() =>
                            history.push(`/product/${idProduct}/detail`)
                        }
                    />
                )}
            </Route>
            <Route path="/product/:id/detail/new-package">
                {({ history, match }) => (
                    <DialogNewPackage
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() =>
                            history.push(`/product/${idProduct}/detail`)
                        }
                    />
                )}
            </Route>
            <Card className="h-100">
                <CardHeader
                    title={intl.formatMessage({
                        id: 'PRODUCT.DETAIL.INFO_PACKAGE.TITLE'
                    })}
                >
                    <CardHeaderToolbar>
                        {initialValues ? (
                            <>
                                <button
                                    type="submit"
                                    className="btn btn-light ml-2"
                                    onClick={() =>
                                        history.push(
                                            `/product/${idProduct}/detail/delete-package`
                                        )
                                    }
                                >
                                    <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                    ></i>
                                    {intl.formatMessage({
                                        id: 'GLOBAL.BUTTON.DELETE'
                                    })}
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary ml-2"
                                    onClick={handleEditClick}
                                >
                                    {intl.formatMessage({
                                        id: 'GLOBAL.BUTTON.UPDATE'
                                    })}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    history.push(
                                        `/product/${idProduct}/detail/new-package`
                                    );
                                }}
                                className="btn btn-light ml-2"
                            >
                                <i className="fa fa-plus"></i>
                                {intl.formatMessage({
                                    id: 'PRODUCT.DETAIL.CREATE_PACKAGE.BUTTON'
                                })}
                            </button>
                        )}
                    </CardHeaderToolbar>
                </CardHeader>
                {initialValues ? (
                    <CardBody>
                        <PackageProductForm
                            intl={intl}
                            onSave={handleSave}
                            btnRef={btnRef}
                            initialValues={(initProduct && initProduct) || {}}
                        ></PackageProductForm>
                    </CardBody>
                ) : (
                    <CardBody className="d-flex align-items-center">
                        <EmptyData />
                    </CardBody>
                )}
            </Card>
        </>
    );
}

export default injectIntl(connect(null, null)(PackageProductPage));
