import { deletePermissions } from 'app/modules/AuthService/auth-service-redux/permissionSlice';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { dialog } from 'app/components/DialogNotify';
import TreeSelectComponent from 'app/components/TreeSelectComponent';
import permissionApi from 'apis/auth/permissionApi';
import PropTypes from 'prop-types';
function FormDelete({ permissionList }) {
    const [permissionName, setPermissionName] = useState({ 
        id: '',
        name: '',
        parent_id: null 
    });

	const dispatch = useDispatch();

	const handleClick = () => {
		if (window.confirm('Delete Permission?')) {
			dispatch(deletePermissions(permissionName.id)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success('Delete permission success');
                } else {
                    dialog.error('Delete permission failed');
                }
            });
		}
    }

    const handleSelect = value => {
        permissionApi.fetchPermissionsById(value).then(res => {
            setPermissionName(res);
        });
    };
    
    return (
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
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
						onClick={handleClick}
						disabled={!permissionName.id || permissionName.id === ''}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Form>
    );
}

export default FormDelete;

FormDelete.propTypes = {
    permissionList: PropTypes.array,
};
