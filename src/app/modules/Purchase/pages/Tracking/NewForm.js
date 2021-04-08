import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Input } from '_metronic/_partials/controls';

NewForm.propTypes = {
    onSave: PropTypes.func,
    onHide: PropTypes.func,
    actionsLoading: PropTypes.bool
};

function NewForm({ onHide = null, onSave = null, actionsLoading = false }) {
    const initialValues = {
        id: ''
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={values => onSave(values)}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success" />
                                </div>
                            )}
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <FastField
                                            name="id"
                                            component={Input}
                                            label="Code"
                                            placeholder="Code"
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
                                Cancel
                            </button>
                            <> </>
                            <button
                                type="submit"
                                className="btn btn-primary btn-elevate"
                                onClick={() => handleSubmit()}
                            >
                                Save
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}

export default NewForm;
