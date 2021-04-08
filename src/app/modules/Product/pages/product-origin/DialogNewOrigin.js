import CustomModal from 'app/components/CustomModal';
import Loading from 'app/components/Loading';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from '_metronic/_partials/controls';
import { createOrigin, fetchOrigin } from '../../product-redux/originSlice';
import * as Yup from 'yup';
import { dialog } from 'app/components/DialogNotify';

DialogNewOrigin.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool
};

export function DialogNewOrigin({ show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const origins = useSelector(state => state.product.origin);
    const { isActionLoading } = origins;

    const initialValues = {
        id: '',
        name: ''
    };
    const handleSubmitNew = value => {
        const params = {
            id: value.id,
            name: value.name
        };
        dispatch(createOrigin(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.ADD.ORIGIN.SUCCESS'
                    })}`
                );
                dispatch(fetchOrigin());
            } else {
                dialog.error(
                    res.payload ||
                        `${intl.formatMessage({
                            id: 'PRODUCT.ADD.ORIGIN.FAIL'
                        })}`
                );
            }
            history.push('/product/origin');
        });
    };

    const OriginCreateSchema = Yup.object().shape({
        id: Yup.string()
            .max(
                2,
                `${intl.formatMessage({
                    id: 'ORIGIN.NEW.MAX.ID'
                })}`
            )
            .required(
                `${intl.formatMessage({
                    id: 'ORIGIN.REQUIRED.ID'
                })}`
            ),
        name: Yup.string().required(
            `${intl.formatMessage({
                id: 'ORIGIN.REQUIRED.NAME'
            })}`
        )
    });
    return (
        <CustomModal
            show={show}
            title={intl.formatMessage({
                id: 'ORIGIN.NEW.TITLE'
            })}
        >
            <>
                {isActionLoading && <Loading />}
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={handleSubmitNew}
                    validationSchema={OriginCreateSchema}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Modal.Body className="overlay overlay-block cursor-default">
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-6 col-md-6">
                                            {intl.formatMessage({
                                                id: 'ORIGIN.TYPE.ID'
                                            })}
                                            <FastField
                                                name="id"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.ADD.ORIGIN.PLACEHOLER.ID'
                                                    }
                                                )}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id: 'ORIGIN.TYPE.NAME'
                                                })}
                                            </label>
                                            <FastField
                                                name="name"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.ADD.ORIGIN.PLACEHOLER.NAME'
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

export default DialogNewOrigin;
