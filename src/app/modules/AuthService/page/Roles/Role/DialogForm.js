import roleApi from 'apis/auth/roleApi';
import CustomModal from 'app/components/CustomModal';
import TreeSelectComponent from 'app/components/TreeSelectComponent';
import { fetchChildByRole, fetchRolesById } from 'app/modules/AuthService/auth-service-redux/roleSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Input } from '_metronic/_partials/controls';
import { dialog } from 'app/components/DialogNotify';

const RoleSchema = Yup.object().shape({
    role: Yup.string().required('Required'),
});

const DialogForm = ({ show = false, onHide = null, roles }) => {
    const [roleDetail, setRoleDetail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const { role } = useSelector(state => state.auth.user);

    const initialValues = {
        role: ''
    };

    const handleSelect = value => setRoleDetail(value);

    const handleSubmit = async (value) => {
        setIsLoading(true);
        try {
            const data = {
                name: value.role,
                id: value.role.toLowerCase().split(' ').join('_')
            }

            await roleApi.createRoles(data);

            if (roleDetail && roleDetail !== '') {
                data.parent_id = roleDetail;
                await roleApi.attachRoles({
                    id: roleDetail,
                    params: ["childs", data.id]
                });
            }

            dispatch(fetchRolesById(role));
            dispatch(fetchChildByRole(role));
            setIsLoading(false);
            dialog.success('Create role success');
            onHide();
        } catch(error) {
            setIsLoading(false);
            dialog.error( 
                error.response.data?.errors?.message || 
                error.response.data?.message || 
                'Create role failed'
            );
        }
    };

    useEffect(() => {
        role !== '' && setRoleDetail(role);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    return (
        <CustomModal title="Role Form" size="md" show={show} onHide={onHide}>
            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={RoleSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Form className="form form-label-right">
                                <Modal.Body>
                                    <div className="form-group">
                                        <label>Parent Name</label>
                                        <TreeSelectComponent
                                            type="select"
                                            treeData={roles}
                                            valTreeData={[{id: roleDetail}]}
                                            handleSelect={handleSelect}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <FastField
                                            name="role"
                                            component={Input}
                                            label="Name"
                                        />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        type="button"
                                        onClick={onHide}
                                        className="btn btn-light font-weight-bold px-9 py-2 my-3">
                                        Cancel
                                    </button>
                                    <button
                                        id="kt_login_signin_submit"
                                        type="submit"
                                        className={`btn btn-primary font-weight-bold px-9 py-2 my-3`}
                                    >
                                        <span>Save</span>
                                        {isLoading && (
                                            <span className="ml-3 spinner spinner-white"></span>
                                        )}
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
    roles: PropTypes.array
};