import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Form, ModalBody } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalFooter, ModalHeader } from 'reactstrap';
import './index.scss';
import { FastField, Formik } from 'formik';
import * as Yup from 'yup';
import useTrans from 'helper/useTrans';
import { BarcodeInput } from '_metronic/_partials/controls';

DialogNew.propTypes = {
    onHide: PropTypes.func,
    onNew: PropTypes.func,

    show: PropTypes.bool
};

function DialogNew({
    show = false,
    onHide,
    onNew,
    formItemClass = 'col-lg-12 col-md-12',
    initialValues = {
        tracking: ''
    },
    intl
}) {
    const [trans] = useTrans();
    const validationSchema = Yup.object().shape({
        tracking: Yup.string().required(trans('validation.message.required'))
    });

    const handleNew = tracking => {
        onNew(tracking);
    };
    const formRef = useRef();
    const trackingCodeFormatter = v => {
        return v.replace(/^A/, '').replace(/A$/, '');
    };
    const triggerSubmit = () => {
        formRef.current.submitForm();
    };
    return (
        <Modal isOpen={show} className="container-modal">
            <ModalHeader>
                <FormattedMessage id="TRACKING.CREATE.TITLE" />
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
                <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CANCEL" />
                </button>
                <> </>
                <button
                    type="submit"
                    className="btn btn-primary btn-elevate"
                    onClick={triggerSubmit}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE" />
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default DialogNew;
