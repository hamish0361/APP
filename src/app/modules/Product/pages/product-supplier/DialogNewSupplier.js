import CustomModal from 'app/components/CustomModal';
import Loading from 'app/components/Loading';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '_metronic/_partials/controls';
import {
    createSupplier,
    fetchSupplier
} from '../../product-redux/supplierSlice';
import * as Yup from 'yup';
import { dialog } from 'app/components/DialogNotify';

DialogNewSupplier.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool
};

function DialogNewSupplier({ show = false, onHide = null, intl }) {
    const SupplierCreateSchema = Yup.object().shape({
        email: Yup.string().email(
            `${intl.formatMessage({
                id: 'SUPPLIER.DIALOG_NEW.REQUIRED.EMAIL'
            })}`
        ),
        link: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            `${intl.formatMessage({
                id: 'SUPPLIER.DIALOG_NEW.REQUIRED.LINK'
            })}`
        )
    });

    const dispatch = useDispatch();
    const suppliers = useSelector(state => state.product.supplier);
    const { isActionLoading } = suppliers;

    const initialValues = {
        name: '',
        email: '',
        address: '',
        link: '',
        note: ''
    };

    const handleSubmitNew = value => {
        const params = {
            name: value.name || '',
            email: value.email || '',
            address: value.address || '',
            link: value.link || '',
            note: value.note || ''
        };
        dispatch(createSupplier(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success('Tạo nhà cung cấp thành công');
                dispatch(fetchSupplier());
                onHide();
            } else {
                dialog.error('Tạo nhà cung cấp thất bại');
            }
        });
    };
    return (
        <CustomModal
            show={show}
            title={intl.formatMessage({
                id: 'SUPPLIER.DIALOG_NEW.TITLE'
            })}
        >
            <>
                {isActionLoading && <Loading />}
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={handleSubmitNew}
                    validationSchema={SupplierCreateSchema}
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
                                                        'SUPPLIER.TOPFILTER.NAME'
                                                })}
                                            </label>
                                            <FastField
                                                name="name"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.SUPPLIER.NAME.PLACEHOLER'
                                                    }
                                                )}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'SUPPLIER.TOPFILTER.EMAIL'
                                                })}
                                            </label>
                                            <FastField
                                                name="email"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.SUPPLIER.EMAIL.PLACEHOLER'
                                                    }
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'SUPPLIER.TOPFILTER.ADDRESS'
                                                })}
                                            </label>
                                            <FastField
                                                name="address"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.SUPPLIER.ADDRESS.PLACEHOLER'
                                                    }
                                                )}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'SUPPLIER.TOPFILTER.LINK'
                                                })}
                                            </label>
                                            <FastField
                                                name="link"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.SUPPLIER.LINK.PLACEHOLER'
                                                    }
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-12 col-md-12">
                                            <label>
                                                {intl.formatMessage({
                                                    id:
                                                        'SUPPLIER.TOPFILTER.NOTE'
                                                })}
                                            </label>
                                            <FastField
                                                name="note"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.SUPPLIER.NOTE.PLACEHOLER'
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

export default DialogNewSupplier;
