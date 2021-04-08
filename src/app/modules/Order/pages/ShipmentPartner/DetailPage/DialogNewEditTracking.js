import CustomModal from 'app/components/CustomModal';
import 'assets/css/order.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { FastField, Formik } from 'formik';
import * as Yup from 'yup';
import useTrans from 'helper/useTrans';
import { BarcodeInput } from '_metronic/_partials/controls';
import { connect } from 'react-redux';

DialogNewEditTracking.propTypes = {
    trackingDetail: PropTypes.object,

    show: PropTypes.bool,
    isNew: PropTypes.bool,

    onHide: PropTypes.func,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    onNew: PropTypes.func
};

function DialogNewEditTracking({
    trackingDetail,
    show,
    onHide,
    onDelete,
    onUpdate,
    onNew,
    isNew = false,
    initialValues = {
        tracking: ''
    },
    intl,
    formItemClass = 'col-lg-12 col-md-12'
}) {
    const [values, setValues] = useState({
        checked: false
    });
    const [trans] = useTrans();
    const validationSchema = Yup.object().shape({
        tracking: Yup.string().required(trans('validation.message.required'))
    });

    useEffect(() => {
        if (show) {
            setValues({
                id: trackingDetail?.id || '',
                checked: trackingDetail?.checked || false
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const handleInputChange = e => {
        const reg = /^[0-9]*$/;
        const check = reg.test(e.target.value);
        if (!check) return;

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleBoxChange = () => {
        setValues({
            ...values,
            checked: !values.checked
        });
    };

    const handleUpdate = () => {
        const params = {
            id: values.id || trackingDetail?.id || '',
            checked: values.checked ? 1 : 0
        };
        if (onUpdate) {
            onUpdate(params);
            resetValues();
        }
    };

    const handleDelete = () => {
        onDelete(trackingDetail?.id);
    };

    const handleNew = value => {
        const params = {
            id: value.tracking,
            checked: values.checked ? 1 : 0
        };
        if (onNew) {
            onNew(params);
            resetValues();
        }
    };

    const resetValues = () => {
        setValues({
            checked: false
        });
    };
    const formRef = useRef();
    const trackingCodeFormatter = v => {
        return v.replace(/^A/, '').replace(/A$/, '');
    };
    const triggerSubmit = () => {
        formRef.current.submitForm();
    };
    return (
        <CustomModal
            show={show}
            onHide={onHide}
            title={isNew ? 'Thêm mới tracking' : 'Cập nhật mã tracking'}
        >
            <Modal.Body className="overlay overlay-block cursor-default">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleNew}
                    validationSchema={validationSchema}
                    id="form-new"
                    innerRef={formRef}
                >
                    <Form className="form form-label-right form-create-sfa">
                        <label>
                            {intl.formatMessage({
                                id: 'ORDER.CODE_TRACKING'
                            })}
                        </label>
                        <div className="form-group row">
                            <div className={formItemClass}>
                                <FastField
                                    name="tracking"
                                    component={BarcodeInput}
                                    placeholder={trans('ORDER.CODE_TRACKING')}
                                    shouldUpdate={(np, p) => true}
                                    autoComplete="off"
                                    formatter={trackingCodeFormatter}
                                />
                            </div>
                        </div>
                    </Form>
                </Formik>

                <div className="form-group row">
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkTracking"
                                onChange={handleBoxChange}
                                checked={values.checked}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="checkTracking"
                            >
                                <FormattedMessage id="TRACKING.RECEIVED" />
                            </label>
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CANCEL" />
                </button>
                {isNew ? (
                    <Button color="primary" onClick={triggerSubmit}>
                        <FormattedMessage id="GLOBAL.BUTTON.ADD" />
                    </Button>
                ) : (
                    <>
                        <Button onClick={handleDelete} color="danger">
                            <FormattedMessage id="GLOBAL.BUTTON.DELETE" />
                        </Button>
                        <Button color="primary" onClick={handleUpdate}>
                            <FormattedMessage id="GLOBAL.BUTTON.UPDATE" />
                        </Button>{' '}
                    </>
                )}
            </Modal.Footer>
        </CustomModal>
    );
}

export default injectIntl(connect(null, null)(DialogNewEditTracking));
