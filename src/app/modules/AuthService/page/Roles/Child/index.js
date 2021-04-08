import roleApi from 'apis/auth/roleApi';
import TreeSelectComponent from 'app/components/TreeSelectComponent';
import { fetchRolesById } from 'app/modules/AuthService/auth-service-redux/roleSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialog } from 'app/components/DialogNotify';
import PropTypes from 'prop-types';
function Child({ role }) {
    const [roles, setRoles] = useState([]);
    const user = useSelector(state => state.auth.user);

    const { roleListBydId, childListByRole } = useSelector(
        state => state.authService.role
    );

    const dispatch = useDispatch();

    const handleSelectChild = body => {
        roleApi
            .updateRoles(role, {
                action: body.action,
                params: JSON.stringify(['childs', ...body.value])
            })
            .then(
                _ => {
                    dispatch(fetchRolesById(user.role));
                    dialog.success('Update child success');
                },
                error => {
                    dialog.error(
                        error.response.data?.errors?.message ||
                            error.response.data?.message ||
                            'Update child failed'
                    );
                }
            );
    };

    useEffect(() => {
        roles.length <= 0 && setRoles(roleListBydId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleListBydId]);

    return (
        <>
            <h6>Child</h6>
            {roleListBydId && childListByRole && (
                <TreeSelectComponent
                    type="checkbox"
                    treeData={roles}
                    valTreeData={childListByRole}
                    handleSelect={handleSelectChild}
                />
            )}
        </>
    );
}

export default React.memo(Child);

Child.propTypes = {
    permissionList: PropTypes.string
};
