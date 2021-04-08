import TreeSelectComponent from 'app/components/TreeSelectComponent';
import { fetchPermissions } from 'app/modules/AuthService/auth-service-redux/permissionSlice';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';

function DetailFormRole({ role, permissionValue, onSaveUser, intl }) {
    const [valRole, setValRole] = useState('');
    const { roleList } = useSelector(state => state.authService.role);
    const { permissionList } = useSelector(
        state => state.authService.permission
    );

    const dispatch = useDispatch();

    const handleSelectRole = value => {
        setValRole(value);
        onSaveUser({ role_id: value });
    };

    const handleSelectImperssion = body => {
        onSaveUser({
            action: body.action,
            params: JSON.stringify(['directPermissions', ...body.value])
        });
    };

    useEffect(() => {
        dispatch(fetchPermissions({ with: 'fullChilds' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (role !== '') {
            // dispatch(fetchPermissionByRole(role.id));
            setValRole(role.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    const handleRoleList = () => {
        const roles = roleList?.map(role => {
            return {
                id: role.id,
                name: role.name
            };
        });
        return roles;
    };

    return (
        <>
            <Card className="h-100">
                <CardHeader
                    title={intl.formatMessage({
                        id: 'AUTH_SERVICE.DECENTRALIZATION.TITLE'
                    })}
                />
                <CardBody>
                    <div className="form-group">
                        <label>
                            {intl.formatMessage({
                                id: 'AUTH_SERVICE.DECENTRALIZATION.ROLE'
                            })}
                        </label>

                        <TreeSelectComponent
                            type="select"
                            treeData={handleRoleList() || []}
                            valTreeData={[{ id: valRole }]}
                            handleSelect={handleSelectRole}
                            placeholder="Chọn vai trò"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            {' '}
                            {intl.formatMessage({
                                id: 'AUTH_SERVICE.DECENTRALIZATION.FUNCTION'
                            })}
                        </label>
                        {permissionList && permissionValue && (
                            <TreeSelectComponent
                                type="checkbox"
                                treeData={permissionList}
                                valTreeData={permissionValue}
                                handleSelect={handleSelectImperssion}
                                placeholder="Chọn chức năng"
                            />
                        )}
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default DetailFormRole;

DetailFormRole.propTypes = {
    role: PropTypes.object,
    permissionValue: PropTypes.array,
    onSaveUser: PropTypes.func
};
