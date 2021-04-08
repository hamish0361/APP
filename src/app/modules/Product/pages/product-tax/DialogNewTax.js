import CustomModal from 'app/components/CustomModal';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Input } from '_metronic/_partials/controls';
import { FastField, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTax, createTax } from '../../product-redux/taxSlice';
import Loading from 'app/components/Loading';
import * as Yup from 'yup';
import { dialog } from 'app/components/DialogNotify';

DialogNewTax.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool
};

function DialogNewTax({ show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const taxs = useSelector(state => state.product.tax);
    const { isActionLoading } = taxs;

    const initialValues = {
        name: '',
        percent: ''
    };
    const handleSubmitNew = value => {
        const params = {
            name: value.name || '',
            percent: value.percent || ''
        };
        dispatch(createTax(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.ADD.TAX.SUCCESS'
                    })}`
                );
                dispatch(fetchTax());
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.ADD.TAX.FAIL'
                    })}`
                );
            }
            history.push('/product/tax');
        });
    };
    const TaxCreateSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /\d+(%)/,
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.MATCHES.NAME'
                })}`
            )
            .required(
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.REQUIRED.NAME'
                })}`
            ),
        percent: Yup.number()
            .max(
                100,
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.MAX.PERCENT'
                })}`
            )
            .required(
                `${intl.formatMessage({
                    id: 'TAX.DIALOG_NEW.REQUIRED.PERCENT'
                })}`
            )
    });
    return (
        <CustomModal
            show={show}
            title={intl.formatMessage({
                id: 'TAX.NEW.TITLE'
            })}
        >
            <>
                {isActionLoading && <Loading />}
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={handleSubmitNew}
                    validationSchema={TaxCreateSchema}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Modal.Body className="overlay overlay-block cursor-default">
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {' '}
                                                {intl.formatMessage({
                                                    id: 'TAX.TOPFILTER.NAME'
                                                })}
                                            </label>
                                            <FastField
                                                name="name"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.ADD.TAX.NAME.PLACEHOLER'
                                                    }
                                                )}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {' '}
                                                {intl.formatMessage({
                                                    id: 'TAX.TOPFILTER.PERCENT'
                                                })}
                                            </label>
                                            <FastField
                                                name="percent"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.ADD.TAX.PERCENT.PLACEHOLER'
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

export default DialogNewTax;
