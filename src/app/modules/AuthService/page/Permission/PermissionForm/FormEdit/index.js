import { updatePermissions } from 'app/modules/AuthService/auth-service-redux/permissionSlice';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
    Input
} from '_metronic/_partials/controls';
import { dialog } from 'app/components/DialogNotify';
import TreeSelectComponent from 'app/components/TreeSelectComponent';
import permissionApi from 'apis/auth/permissionApi';
import PropTypes from 'prop-types';

const PermissionSchema = Yup.object().shape({
    name: Yup.string().required('Required')
});

function FormEdit({ permissionList }) {
    const [permissionName, setPermissionName] = useState({
        id: '',
        name: '',
        parent_id: null
    });
    const [initialValues, setinitialValues] = useState({ name: '' });

    const dispatch = useDispatch();

    const handleSubmit = value => {
		const body = {
            params: {
                parent_id: permissionName.parent_id || '',
                name: value.name
            },
            id: permissionName.id
        };

		dispatch(updatePermissions(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success('Update permission success');
            } else {
                dialog.error('Update permission failed');
            }
        });;
    };

    const handleSelect = value => {
        permissionApi.fetchPermissionsById(value).then(res => {
            setPermissionName(res);
        });
    }

    useEffect(() => {
        setinitialValues({ name: permissionName.name });
    }, [permissionName]);

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
                                    valTreeData={permissionName.id !== '' ? [permissionName] : []}
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
                                    Edit
                                </button>
                            </div>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default FormEdit;

FormEdit.propTypes = {
    permissionList: PropTypes.array,
};
