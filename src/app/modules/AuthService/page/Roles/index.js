import 'rc-tree-select/assets/index.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import {
    fetchPermissionByRole,
    fetchPermissions
} from '../../auth-service-redux/permissionSlice';
import { fetchChildByRole, fetchRoles, fetchRolesById } from '../../auth-service-redux/roleSlice';
import Child from './Child';
import './index.scss';
import Permission from './Permission';
import Role from './Role';

function Roles() {
    const [role, setRole] = useState('');
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchPermissions({ with: 'fullChilds' }));
        dispatch(fetchRolesById(user.role)); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (role !== '') {
            dispatch(fetchPermissionByRole(role));
            dispatch(fetchChildByRole(role));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    useEffect(() => {
        if (user.role) {
            setRole(user.role);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Card className="roles">
            <CardHeader title="Roles" />
            <CardBody>
                <div className="row">
                    <div className="mb-3 col-md-5">
                        <Card style={{height: "calc(100% - 15px)"}}>
                            <CardBody>
                                <Role role={role} setRole={setRole} />
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-md-7">
                        <Card>
                            <CardBody>
                                <div className="mb-10">
                                    <Child role={role} />
                                </div>
                                <Permission role={role} />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default Roles;
