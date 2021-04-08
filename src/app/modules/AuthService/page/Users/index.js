import Loading from 'app/components/Loading';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import UserList from './UserList';
import UserStatus from './UserStatus';
import TopHeader from '../../components/TopHeader';
import { initUser } from 'app/modules/AuthService/auth-service-redux/userSlice';
import { injectIntl } from 'react-intl';

UserPage.propTypes = {};

function UserPage({ location, intl }) {
    const dispatch = useDispatch();
    const [isListOrStatus, setIsListOrStatus] = useState(
        location.hash === '' ? 'list' : location.hash.substr(1)
    );
    const { isLoading } = useSelector(state => state.authService.user);

    useEffect(() => {
        dispatch(initUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const TabTitle = [
        {
            id: 'list',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.USER_LIST.TITLE'
            })}`
        },
        {
            id: 'status',
            title: `${intl.formatMessage({
                id: 'AUTH_SERVICE.STATUS_LIST.TITLE'
            })}`
        }
    ];

    return (
        <div>
            {isLoading && <Loading />}
            <TopHeader
                title={
                    isListOrStatus === 'list'
                        ? intl.formatMessage({
                              id: 'AUTH_SERVICE.USER_LIST.TITLE'
                          })
                        : intl.formatMessage({
                              id: 'AUTH_SERVICE.STATUS_LIST.TITLE'
                          })
                }
            >
                <ul className="nav nav-light-success nav-bold nav-pills">
                    {TabTitle.map(item => (
                        <li
                            className="nav-item"
                            key={item.id}
                            onClick={() => setIsListOrStatus(item.id)}
                        >
                            <Link
                                className={`nav-link 
                                                ${isListOrStatus === item.id &&
                                                    'active'}`}
                                to={`/auth-service/users#${item.id}`}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </TopHeader>
            <div className="pb-8 px-8">
                <Card>
                    <CardBody>
                        {isListOrStatus === 'list' ? (
                            <UserList intl={intl} />
                        ) : (
                            <UserStatus intl={intl} />
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default injectIntl(connect(null, null)(UserPage));
