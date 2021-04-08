import { fetchUserStatus } from 'app/modules/AuthService/auth-service-redux/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import DialogDelete from './DialogDelete';
import DialogForm from './DialogForm';
import userStatusApi from 'apis/auth/userStatus';
import OtherTable from 'app/modules/AuthService/components/OtherTable';

function UserStatus({ intl }) {
    const { userStatus } = useSelector(state => state.authService.user);
    const [initialValues, setInitialValues] = useState({ id: '', name: '' });
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDeleteRow = id => {
        history.push(`/auth-service/users/status/${id}/delete`);
    };

    const handleCreateRow = () => {
        setInitialValues({ name: '' });
        history.push(`/auth-service/users/status/form/create`);
    };

    const handleViewEditRow = id => {
        userStatusApi.fetchUserStatusById(id).then(res => {
            setInitialValues({ id: id, name: res.name });
            history.push(`/auth-service/users/status/form/${id}`);
        });
    };

    useEffect(() => {
        dispatch(fetchUserStatus());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            id: 'id',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.STATUS_LIST.TOPFILTER.ID'
            })}`
        },
        {
            id: 'name',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.STATUS_LIST.TOPFILTER.NAME'
            })}`
        }
    ];

    return (
        <>
            <Route path="/auth-service/users/status/:id/delete">
                {({ history, match }) => (
                    <DialogDelete
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() =>
                            history.push('/auth-service/users#status')
                        }
                        intl={intl}
                    />
                )}
            </Route>
            <Route exact path={['/auth-service/users/status/form/:id']}>
                {({ history, match }) => (
                    <DialogForm
                        initialValues={initialValues}
                        id={match && match.params.id}
                        show={match != null}
                        intl={intl}
                    />
                )}
            </Route>

            <div className="d-flex justify-content-end">
                <button
                    onClick={handleCreateRow}
                    className="btn btn-primary font-weight-bolder"
                >
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.CREATE_ORDER'
                    })}
                </button>
            </div>
            <OtherTable
                columns={columns}
                rows={userStatus}
                onDelete={handleDeleteRow}
                onViewEdit={handleViewEditRow}
            />
        </>
    );
}

export default UserStatus;
