import permissionApi from 'apis/auth/permissionApi';
import { dialog } from 'app/components/DialogNotify';
import TreeSelectComponent from 'app/components/TreeSelectComponent';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Input } from '_metronic/_partials/controls';
import { createPermissions } from '../../../../auth-service-redux/permissionSlice';
import PropTypes from 'prop-types';

const PermissionSchema = Yup.object().shape({
    name: Yup.string().required('Required')
});

function FormAdd({ permissionList }) {
    const [permissionName, setPermissionName] = useState({
        id: ''
    });

    const initialValues = { name: '' };

    const dispatch = useDispatch();

    const handleSubmit = value => {
        const body = {
            id: value.name
                .toLowerCase()
                .split(' ')
                .join('_'),
            name: value.name
        };

        if (permissionName.id !== '') body.parent_id = permissionName.id;

        dispatch(createPermissions(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success('Create permission success');
            } else {
                dialog.error('Create permission failed');
            }
        });
    };

    const handleSelect = value => {
        permissionApi.fetchPermissionsById(value).then(res => {
            setPermissionName(res);
        });
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={PermissionSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit }) => (
                <>
                    <Form className="form form-label-right">
                        <div className="row">
                            <div className="form-group col-lg-12">
                                <label>Parent Name</label>
                                <TreeSelectComponent
                                    type="select"
                                    treeData={permissionList}
                                    valTreeData={
                                        permissionName.id !== ''
                                            ? [permissionName]
                                            : []
                                    }
                                    handleSelect={handleSelect}
                                />
                            </div>

                            <div className="form-group col-lg-12">
                                <FastField
                                    name="name"
                                    component={Input}
                                    label="Permission Name"
                                />
                            </div>

                            <div className="form-group col-lg-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onSubmit={() => handleSubmit()}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default FormAdd;
FormAdd.propTypes = {
    permissionList: PropTypes.array
};
