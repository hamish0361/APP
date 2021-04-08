import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import ChangePassword from './ChangePassword';
import Information from './Information';
import ResetPassword from './ResetPassword';

function MyProfilePage() {
	const user = useSelector(state => state.auth.user);
    const history = useHistory();

    return (
        <Card>
            <CardHeader title="My Profile">
                <CardHeaderToolbar>
                    <button
                        type="button"
                        onClick={() => {
                            history.push('/auth-service/users');
                        }}
                        className="btn btn-light"
                    >
                        <i className="fa fa-arrow-left"></i>
                        Back
                    </button>
                    {`  `}
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <div className="row">
                    <div className="col-md-4">
                        <Information userInfor={user} />
                    </div>
					<div className="col-md-8">
						<Route path="/auth-service/profile/password">
							<ChangePassword />
						</Route>
						<Route path="/auth-service/profile/reset-password">
							<ResetPassword email={user?.email} />
						</Route>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default MyProfilePage;
