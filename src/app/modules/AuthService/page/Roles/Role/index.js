import TreeSelectComponent from 'app/components/TreeSelectComponent';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import DialogForm from './DialogForm';
import PropTypes from 'prop-types';
function Role({ role, setRole }) {
    const { roleListBydId } = useSelector(
        state => state.authService.role
    );

    const history = useHistory();

    const handleSelect = value => setRole(value);
    const handleCreate = () => history.push("/auth-service/roles/create");
    
    return (
        <>
            <Route exact path={"/auth-service/roles/create"}>
                {({ history, match }) => (
                    <DialogForm
                        roles={roleListBydId}
                        show={match != null}
                        onHide={() => history.push('/auth-service/roles')}
                    />
                )}
            </Route>
            
            <div className="role__header d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Roles</h6>
                <span className="add" style={{cursor: "pointer"}} onClick={handleCreate}>
                    <svg width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                </span>
            </div>
            
            <div className="role__body">
                <TreeSelectComponent
                    type='select'
                    treeData={roleListBydId}
                    valTreeData={[{ id: role }]}
                    handleSelect={handleSelect}
                />
            </div>
        </>
    );
}

export default Role;

Role.propTypes = {
    role: PropTypes.string,
    setRole: PropTypes.func
};