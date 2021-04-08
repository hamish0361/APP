import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import { fetchCurrency } from 'app/modules/AuthService/auth-service-redux/currencySlice';
import { fetchTransaction } from 'app/modules/AuthService/auth-service-redux/transactionSlice';
import {
    fetchUserById,
    updateUser
} from 'app/modules/AuthService/auth-service-redux/userSlice';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import DetailFormInfor from './DetailFormInfor';
import DetailFormRole from './DetailFormRole';
import DetailtListCurrency from './DetailtListCurrency';
import DetailtTableTransaction from './DetailtTableTransaction';
import TopHeader from './TopHeader';

function UserDetailPage({ history, intl }) {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [isActionLoading, setActionLoading] = useState(false);
    const { userDetail, isLoading } = useSelector(
        state => state.authService.user
    );
    const { currencyList } = useSelector(state => state.authService.currency);

    const initUser = {
        id: userDetail?.id || '',
        email: userDetail?.email || '',
        status: userDetail?.status_id || '',
        role: userDetail?.role?.name || ''
    };

    useEffect(() => {
        getUserById(id);
        getUserCurrency();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [paramsTransaction, setParamsTransaction] = useState({
        appends: 'user;preparedBy',
        search: `user_id:${id}`,
        page: 1
    });

    useEffect(() => {
        dispatch(fetchTransaction(paramsTransaction));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsTransaction]);

    const handlePageChangeTransaction = newPage => {
        setParamsTransaction({
            ...paramsTransaction,
            page: newPage
        });
    };

    const getUserById = id => {
        const body = {
            id,
            params: {
                with:
                    'status;role;role.permissions.fullChilds;directPermissions'
            }
        };

        dispatch(fetchUserById(body));
    };

    const getUserCurrency = () => {
        const params = {
            search: `user_id:${id}`,
            with: 'currency'
        };
        dispatch(fetchCurrency(params));
    };

    const handleSaveUser = values => {
        setActionLoading(true);
        const body = {
            id,
            params: values
        };

        dispatch(updateUser(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'AUTH.SERVICE.UPDATE.SUCCESS' })
                );
                history.push(`/auth-service/users/${res.payload?.id}/detail`);
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'AUTH.SERVICE.UPDATE.FAIL' })
                );
            }
            setActionLoading(false);
        });
    };

    return (
        <>
            {(isLoading || isActionLoading) && <Loading />}
            <TopHeader
                title={intl.formatMessage({
                    id: 'AUTH_SERVICE.DETAIL'
                })}
            >
                <button
                    type="button"
                    onClick={() => {
                        history.push('/auth-service/users');
                    }}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.BACK'
                    })}
                </button>
            </TopHeader>
            <div className="px-8 pb-8">
                <div className="row">
                    <div className="col-lg-12 col-xl-4 mb-8">
                        <DetailFormInfor
                            onSaveUser={handleSaveUser}
                            initialValues={initUser}
                            intl={intl}
                        />
                    </div>

                    <div className="col-lg-12 col-xl-4 mb-8">
                        <DetailFormRole
                            role={userDetail?.role || {}}
                            onSaveUser={handleSaveUser}
                            permissionValue={userDetail.direct_permissions}
                            intl={intl}
                        />
                    </div>

                    <div className="col-lg-12 col-xl-4 mb-8">
                        <DetailtListCurrency
                            currencyList={currencyList}
                            intl={intl}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 overflow-hidden">
                        <DetailtTableTransaction
                            intl={intl}
                            onPageChange={handlePageChangeTransaction}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(UserDetailPage));
