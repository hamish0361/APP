import CustomModal from 'app/components/CustomModal';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Input } from '_metronic/_partials/controls';
import { FastField, Form, Formik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createPackage } from 'app/modules/Product/product-redux/packageSlice';
import { fecthProductId } from 'app/modules/Product/product-redux/productSlice';
import Loading from 'app/components/Loading';
import * as Yup from 'yup';
import { dialog } from 'app/components/DialogNotify';
import { injectIntl } from 'react-intl';

DialogNewPackage.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool,
    id: PropTypes.string
};

function DialogNewPackage({ show = false, onHide = null, id = '', intl }) {
    const PackagetCreateSchema = Yup.object().shape({
        quantity: Yup.number().required(
            `${intl.formatMessage({
                id: 'PRODUCT.CREATE.PLACEHOLER.QUANTITY'
            })}`
        )
    });
    const dispatch = useDispatch();
    const packages = useSelector(state => state.product.package);
    const { isActionLoading } = packages;

    const initialValues = {
        id_product: id || '',
        quantity: 1,
        weight: '',
        height: '',
        length: '',
        width: ''
    };

    const bodyFetchById = {
        id: id,
        params: {
            with: 'origin;suppliers;unit;tax;package'
        }
    };

    const handleSubmitNew = value => {
        const params = {
            id_product: id || '',
            quantity: value?.quantity,
            weight: value?.weight,
            height: value?.height,
            length: value?.length,
            width: value?.width
        };
        dispatch(createPackage(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.CREATE_PACKAGE.DIALOG_SUCCESS'
                    })}`
                );
                dispatch(fecthProductId(bodyFetchById));
                onHide();
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.CREATE_PACKAGE.DIALOG_ERROR'
                    })}`
                );
            }
        });
    };
    return (
        <CustomModal
            show={show}
            title={intl.formatMessage({
                id: 'PRODUCT.CREATE.PACKAGE'
            })}
            onHide={onHide}
        >
            <>
                {isActionLoading && <Loading />}
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues ? initialValues : {}}
                    onSubmit={handleSubmitNew}
                    validationSchema={PackagetCreateSchema}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Modal.Body className="overlay overlay-block cursor-default">
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.ID_PRODUCT'
                                                })}
                                            </label>
                                            <FastField
                                                name="id_product"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.SCHEMA.ID_REQUIRED'
                                                    }
                                                )}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.DETAIL.IVENTORY.QUANTITY'
                                                })}
                                            </label>
                                            <FastField
                                                type="number"
                                                min="1"
                                                name="quantity"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.QUANTITY'
                                                    }
                                                )}
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.WEIGHT'
                                                })}{' '}
                                            </label>
                                            <FastField
                                                type="number"
                                                min="1"
                                                name="weight"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.WEIGHT'
                                                    }
                                                )}
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.HEIGHT'
                                                })}
                                            </label>
                                            <FastField
                                                type="number"
                                                min="1"
                                                name="height"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.HEIGHT'
                                                    }
                                                )}
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.LENGTH'
                                                })}
                                            </label>
                                            <FastField
                                                type="number"
                                                min="1"
                                                name="length"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.LENGTH'
                                                    }
                                                )}
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.WIDTH'
                                                })}
                                            </label>
                                            <FastField
                                                type="number"
                                                min="1"
                                                name="width"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.WIDTH'
                                                    }
                                                )}
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    type="button"
                                    onClick={onHide}
                                    className="btn btn-light btn-elevate"
                                >
                                    {intl.formatMessage({
                                        id: 'GLOBAL.BUTTON.BACK'
                                    })}
                                </button>
                                <> </>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-elevate"
                                    onClick={() => handleSubmit()}
                                >
                                    {intl.formatMessage({
                                        id: 'GLOBAL.BUTTON.SAVE'
                                    })}
                                </button>
                            </Modal.Footer>
                        </>
                    )}
                </Formik>
            </>
        </CustomModal>
    );
}

export default injectIntl(connect(null, null)(DialogNewPackage));
