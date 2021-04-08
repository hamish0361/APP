import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import { fetchPermissions } from '../../auth-service-redux/permissionSlice';
import PermissionForm from './PermissionForm';
import PermissionSelect from './PermissionSelect';

function PermissionPage() {
    const { permissionList } = useSelector(
        state => state.authService.permission
    );

    const dispatch = useDispatch();

    const handleSelect = value => {
        // to do something
    };

    useEffect(() => {
        dispatch(fetchPermissions({ with: 'fullChilds' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <CardHeader title="Permissions" />
            <CardBody>
                <div className="row">
                    <div className="col-md-6">
                        <PermissionSelect
                            permissionList={permissionList}
                            handleSelect={handleSelect}
                        />
                    </div>

                    <div className="col-md-6">
                        <PermissionForm permissionList={permissionList} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default PermissionPage;
