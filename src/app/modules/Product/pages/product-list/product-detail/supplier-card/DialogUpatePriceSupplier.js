import CustomModal from 'app/components/CustomModal';
import Loading from 'app/components/Loading';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from '_metronic/_partials/controls';
import {
    fecthProductId,
    updatePriceSupplier
} from 'app/modules/Product/product-redux/productSlice';
import { dialog } from 'app/components/DialogNotify';
import * as Yup from 'yup';
import { injectIntl } from 'react-intl';

DialogUpatePriceSupplier.propTypes = {
    id: PropTypes.string,
    idSupplier: PropTypes.string,
    onHide: PropTypes.func,
    show: PropTypes.bool
};

function DialogUpatePriceSupplier({
    id = '',
    idSupplier = '',
    show = false,
    onHide = null,
    intl
}) {
    const SupplierPriceSchema = Yup.object().shape({
        price: Yup.number().required(
            `${intl.formatMessage({
                id: 'PRODUCT.DETAIL.SUPPLIER.REQUIRED.PRICE'
            })}`
        )
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state => state.product.list);
    const { loading } = products;

    const initialValues = {
        price: ''
    };
    const bodyFetchById = {
        id: id,
        params: {
            with: 'origin;suppliers;unit;tax;package'
        }
    };
    const handleSubmitPrice = value => {
        const params = {
            idProduct: id || '',
            id: idSupplier || '',
            price: value.price || ''
        };
        dispatch(updatePriceSupplier(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UPDATE_PRICE.DIALOG_SUCCESS'
                    })}`
                );
                dispatch(fecthProductId(bodyFetchById));
            } else {
                dialog.error(
                    res.payload ||
                        `${intl.formatMessage({
                            id: 'PRODUCT.DETAIL.UPDATE_PRICE.DIALOG_ERROR'
                        })}`
                );
            }
            history.push(`/product/${id}/detail`);
        });
    };

    return (
        <CustomModal
            show={show}
            title={intl.formatMessage({
                id: 'PRODUCT.DETAIL.UPDATE_PRICE.TITLE'
            })}
        >
            <>
                {loading && <Loading />}
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={handleSubmitPrice}
                    validationSchema={SupplierPriceSchema}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Modal.Body className="overlay overlay-block cursor-default">
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-12 col-md-12">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.DETAIL.SUPPLIER.PRICE'
                                                })}
                                            </label>
                                            <FastField
                                                name="price"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.DETAIL.UPDATE_PRICE.PLACEHOLER'
                                                    }
                                                )}
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
                                        id: 'GLOBAL.BUTTON.CANCEL'
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

export default injectIntl(connect(null, null)(DialogUpatePriceSupplier));
