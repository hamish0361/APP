import userStatusApi from 'apis/auth/userStatus';
import CustomModal from 'app/components/CustomModal';
import { dialog } from 'app/components/DialogNotify';
import {
    fetchUserStatus,
    updateUserStatus
} from 'app/modules/AuthService/auth-service-redux/userSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Input } from '_metronic/_partials/controls';

const DialogForm = ({ id = '', show = false, initialValues, intl }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = value => {
        id === 'create' ? handleCreate(value) : handleUpdate(value);
    };

    const handleCreate = value => {
        userStatusApi
            .createUserStatus({
                id: value.id,
                name: value.name
            })
            .then(
                res => {
                    dialog.success('Tạo trạng thái mới thành công!');
                    dispatch(fetchUserStatus());
                    hideCustomModal();
                },
                error => {
                    dialog.error(
                        'Tạo trạng thái mới thất bại: Id chỉ chưa ký tự viết hoa, số, - và _'
                    );
                }
            );
    };

    const handleUpdate = value => {
        dispatch(
            updateUserStatus({
                id: id,
                name: value.name
            })
        ).then(
            res => {
                history.push('/auth-service/users');
                dialog.success('Cập nhật trạng thái thành công!');
            },
            error => {
                dialog.error('Cập nhật trạng thái thất bại');
            }
        );
    };

    const hideCustomModal = () => {
        history.push('/auth-service/users#status');
    };

    const UserStatusSchema = Yup.object().shape({
        name: Yup.string().required(
            `${intl.formatMessage({
                id: 'AUTH_SERVICE.STATUS_LIST.DETAIL.REQUIRED'
            })}`
        )
    });

    return (
        <CustomModal
            title={
                id === 'create'
                    ? intl.formatMessage({ id: 'GLOBAL.BUTTON.CREATE_ORDER' })
                    : intl.formatMessage({ id: 'GLOBAL.BUTTON.UPDATE' })
            }
            size="md"
            show={show}
            onHide={hideCustomModal}
        >
            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={UserStatusSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Form className="form form-label-right">
                                <Modal.Body>
                                    <div className="form-group">
                                        <label>
                                            {intl.formatMessage({
                                                id:
                                                    'AUTH_SERVICE.STATUS_LIST.TOPFILTER.ID'
                                            })}
                                        </label>
                                        <FastField
                                            name="id"
                                            component={Input}
                                            placeholder="Nhập id"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            {intl.formatMessage({
                                                id:
                                                    'AUTH_SERVICE.STATUS_LIST.TOPFILTER.NAME'
                                            })}
                                        </label>
                                        <FastField
                                            name="name"
                                            component={Input}
                                            placeholder="Nhập tên"
                                        />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        type="button"
                                        onClick={hideCustomModal}
                                        className="btn btn-light btn-elevate"
                                    >
                                        {intl.formatMessage({
                                            id:
                                                'AUTH_SERVICE.STATUS_LIST.CANCLE'
                                        })}
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-elevate"
                                        onSubmit={() => handleSubmit()}
                                    >
                                        {id === 'create'
                                            ? `${intl.formatMessage({
                                                  id:
                                                      'GLOBAL.BUTTON.CREATE_ORDER'
                                              })}`
                                            : `${intl.formatMessage({
                                                  id: 'GLOBAL.BUTTON.UPDATE'
                                              })}`}
                                    </button>
                                </Modal.Footer>
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </CustomModal>
    );
};

export default DialogForm;

DialogForm.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    id: PropTypes.string,
    initialValues: PropTypes.object
};
