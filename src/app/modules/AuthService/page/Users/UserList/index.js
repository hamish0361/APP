import { fetchUsers } from 'app/modules/AuthService/auth-service-redux/userSlice';
import AuthServiceTable from 'app/modules/AuthService/components/AuthServiceTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import DialogDelete from './DialogDelete';
import TopFilter from './TopFilter';

function UserList({ intl }) {
    const [params, setParams] = useState({
        page: 1,
        search: ''
    });

    const { userList, pagination } = useSelector(
        state => state.authService.user
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };

    const handleSubmitSearch = search => {
        const tabooKeyword = ['', 'all', 'select'];

        const body = { ...params, search: search.value };

        if (!tabooKeyword.some(item => item === search.option)) {
            body.search = `${search.option}:${search.value}`;
            body.searchFields = `${search.option}:like`;
        }

        setParams(body);
    };

    const handleDeleteRow = id =>
        history.push(`/auth-service/users/${id}/delete`);

    const handleViewEditRow = id =>
        history.push(`/auth-service/users/${id}/user-detail`);

    const convertUserDataTable = users => {
        return users.map(user => {
            return {
                userId: user.id,
                id: user.id,
                email: user.email,
                email_verified_at: user.email_verified_at,
                role: user.role.name,
                status: user.status.name
            };
        });
    };

    useEffect(() => {
        dispatch(fetchUsers(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const columns = [
        {
            id: 'userId',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.USER_ID'
            })}`
        },
        {
            id: 'id',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.USER_ID'
            })}`
        },
        {
            id: 'email',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.EMAIL'
            })}`
        },
        {
            id: 'email_verified_at',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.REGISTRATION_DATE'
            })}`
        },
        {
            id: 'role',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.ROLE'
            })}`
        },
        {
            id: 'status',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TOPFILTER.STATUS'
            })}`
        }
    ];

    return (
        <>
            <Route path="/auth-service/users/:id/delete">
                {({ history, match }) => (
                    <DialogDelete
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() => history.push('/auth-service/users')}
                    />
                )}
            </Route>

            <TopFilter handleSubmitSearch={handleSubmitSearch} intl={intl} />

            <AuthServiceTable
                columns={columns}
                rows={convertUserDataTable(userList)}
                page={params.page}
                lastpage={pagination.lastPage}
                onDelete={handleDeleteRow}
                onViewEdit={handleViewEditRow}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default UserList;
