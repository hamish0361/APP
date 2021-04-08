import TreeSelectComponent from 'app/components/TreeSelectComponent';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';

function PermissionSelect({ permissionList, handleSelect }) {
    const [permissionName, setPermissionName] = useState('');

    const handleSelectPermission = value => {
        setPermissionName(value);
        handleSelect(value);
    };
    return (
        <Card className="h-100">
            <CardHeader title="Permission List" />
            <CardBody>
                <TreeSelectComponent
                    type="select"
                    treeData={permissionList}
                    valTreeData={
                        permissionName !== '' ? [{ id: permissionName }] : []
                    }
                    handleSelect={handleSelectPermission}
                />
            </CardBody>
        </Card>
    );
}

export default PermissionSelect;

PermissionSelect.propTypes = {
    permissionList: PropTypes.array,
    handleSelect: PropTypes.func
};
