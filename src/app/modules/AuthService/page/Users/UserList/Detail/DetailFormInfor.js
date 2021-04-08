import { fetchRoles } from 'app/modules/AuthService/auth-service-redux/roleSlice';
import { fetchUserStatus } from 'app/modules/AuthService/auth-service-redux/userSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
    Input
} from '_metronic/_partials/controls';

DetailFormInfor.propTypes = {
    initialValues: PropTypes.object,
    onSaveUser: PropTypes.func
};

const UserSchema = Yup.object().shape({
    id: Yup.string().required('Required')
});

function DetailFormInfor({ initialValues = {}, onSaveUser, intl }) {
    const [status, setStatus] = useState();
    const { userStatus } = useSelector(state => state.authService.user);
    const dispatch = useDispatch();
    const btnRef = useRef(null);

    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchUserStatus());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = (e, setFieldValue) => {
        setStatus(e.target.value);
        setFieldValue('status', e.target.value);
    };

    const handleSubmit = value => {
        onSaveUser({
            id: value.id,
            status_id: value.status
        });
    };

    useEffect(() => {
        !status && setStatus(initialValues.status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    return (
        <>
            <Card className="h-100">
                <CardHeader
                    title={intl.formatMessage({
                        id: 'AUTH_SERVICE.INFO.TITLE'
                    })}
                >
                    <CardHeaderToolbar>
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => btnRef.current.handleSubmit()}
                        >
                            {intl.formatMessage({
                                id: 'GLOBAL.BUTTON.UPDATE'
                            })}
                        </button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={UserSchema}
                        onSubmit={handleSubmit}
                        innerRef={btnRef}
                    >
                        {({ handleSubmit, setFieldValue }) => (
                            <>
                                <Form className="form form-label-right">
                                    <div className="form-group">
                                        <label>
                                            {intl.formatMessage({
                                                id: 'AUTH_SERVICE.INFO.ID'
                                            })}{' '}
                                        </label>
                                        <FastField
                                            name="id"
                                            component={Input}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            {intl.formatMessage({
                                                id: 'AUTH_SERVICE.INFO.EMAIL'
                                            })}{' '}
                                        </label>
                                        <FastField
                                            name="email"
                                            component={Input}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            {intl.formatMessage({
                                                id: 'AUTH_SERVICE.INFO.STATUS'
                                            })}
                                        </label>
                                        <select
                                            name="status"
                                            value={status}
                                            className="form-control form-control-solid is-valid-select"
                                            onChange={e =>
                                                handleSelect(e, setFieldValue)
                                            }
                                        >
                                            {userStatus.map(status => (
                                                <option
                                                    value={status.id}
                                                    key={status.id}
                                                >
                                                    {status.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            {intl.formatMessage({
                                                id: 'AUTH_SERVICE.INFO.ROLE'
                                            })}
                                        </label>
                                        <FastField
                                            name="role"
                                            component={Input}
                                            disabled
                                        />
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </>
    );
}

export default DetailFormInfor;
