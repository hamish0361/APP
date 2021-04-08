import roleApi from 'apis/auth/roleApi';
import TreeSelectComponent from 'app/components/TreeSelectComponent';
import React from 'react';
import { useSelector } from 'react-redux';
import { dialog } from 'app/components/DialogNotify';
import PropTypes from 'prop-types';
function Permisstion({ role }) {
    const { permissionList, permissionListByRole } = useSelector(
        state => state.authService.permission
    );
    // const uniqueData = data => {
    //     return data.filter(item => item.parent_id === null);
    // };

    const handleSelectImpression = body => {
        roleApi
            .giveOrRevokePermission(
                {
                    action: body.action,
                    params: JSON.stringify(['permissions', ...body.value])
                },
                role
            )
            .then(
                () => {
                    dialog.success('Update permission success');
                },
                error => {
                    dialog.error(
                        error.response.data?.errors?.message ||
                            error.response.data?.message ||
                            'Update permission failed'
                    );
                }
            );
    };

    return (
        <div className="permission">
            <h6>Permission</h6>
            {permissionList?.length > 0 && (
                <TreeSelectComponent
                    type="checkbox"
                    treeData={permissionList}
                    valTreeData={permissionListByRole}
                    handleSelect={handleSelectImpression}
                />
            )}
        </div>
    );
}

export default React.memo(Permisstion);

Permisstion.propTypes = {
    role: PropTypes.string
};
