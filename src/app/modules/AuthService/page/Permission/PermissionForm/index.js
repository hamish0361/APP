import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import FormAdd from './FormAdd';
import FormDelete from './FormDelete';
import FormEdit from './FormEdit';
import PropTypes from 'prop-types';

const actions = [
    { id: 'create', title: 'Create' },
    { id: 'edit', title: 'Update' },
    { id: 'delete', title: 'Delete' }
];

function PermissionForm({ permissionList }) {
    const [typeAction, setTypeAction] = useState('create');

    return (
        <Card>
            <CardHeader title="Permission Form">
                <CardHeaderToolbar>
                    <ul className="nav nav-light-success nav-bold nav-pills">
                        {actions.map(action => (
                            <li className="nav-item" key={action.id}>
                                <a
                                    className={`nav-link ${typeAction ===
                                        action.id && 'active'}`}
                                    href={`/auth-service/permissions#${action.id}`}
                                    onClick={() => setTypeAction(action.id)}
                                >
                                    {action.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                { typeAction === 'create' && <FormAdd permissionList={permissionList}/> }
                { typeAction === 'edit' && <FormEdit permissionList={permissionList}/> }
                { typeAction === 'delete' && <FormDelete permissionList={permissionList}/> }
            </CardBody>
        </Card>
    );
}

export default PermissionForm;

PermissionForm.propTypes = {
    permissionList: PropTypes.array,
};
