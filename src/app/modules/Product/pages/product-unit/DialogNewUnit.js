import CustomModal from 'app/components/CustomModal';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Input } from '_metronic/_partials/controls';
import { FastField, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnit, createUnit } from '../../product-redux/unitSlice';
import Loading from 'app/components/Loading';
import * as Yup from 'yup';
import { dialog } from 'app/components/DialogNotify';

DialogNewUnit.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool
};

function DialogNewUnit({ show = false, onHide = null, intl }) {
    const dispatch = useDispatch();
    const units = useSelector(state => state.product.unit);
    const { isActionLoading } = units;

    const initialValues = {
        id: '',
        name: ''
    };
    const handleSubmitNew = value => {
        const params = {
            id: value.id || '',
            name: value.name || ''
        };
        dispatch(createUnit(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dispatch(fetchUnit());
                onHide();
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.ADD.UNIT.SUCCESS'
                    })}`
                );
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.ADD.UNIT.FAIL'
                    })}`
                );
            }
        });
    };
    const UnitCreateSchema = Yup.object().shape({
        id: Yup.string().required(
            `${intl.formatMessage({
                id: 'UNIT.NEW.REQUIRED.ID'
            })}`
        ),
        name: Yup.string().required(
            `${intl.formatMessage({
                id: 'UNIT.NEW.REQUIRED.NAME'
            })}`
        )
    });
    return (
        <CustomModal show={show} title="New Tax">
            <>
                {isActionLoading && <Loading />}
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={handleSubmitNew}
                    validationSchema={UnitCreateSchema}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Modal.Body className="overlay overlay-block cursor-default">
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {intl.formatMessage({
                                                    id: 'UNIT.TOPFILTER.ID'
                                                })}{' '}
                                            </label>
                                            <FastField
                                                name="id"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.ADD.UNIT.ID.PLACEHOLER'
                                                    }
                                                )}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <label>
                                                {' '}
                                                {intl.formatMessage({
                                                    id: 'UNIT.TOPFILTER.NAME'
                                                })}{' '}
                                            </label>
                                            <FastField
                                                name="name"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.ADD.UNIT.NAME.PLACEHOLER'
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

export default DialogNewUnit;
