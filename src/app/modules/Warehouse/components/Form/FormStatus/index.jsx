import React from 'react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

import './index.scss';

const FormStatus = props => {
    const { errors, status } = useFormikContext();

    return (
        <div>
            {errors && _.has(errors, ['api']) && (
                <div className="form-api-error py-3">{_.get(errors, ['api'])}</div>
            )}

            {status && _.has(status, ['api']) && (
                <div className="form-api-success py-3">{_.get(status, ['api'])}</div>
            )}
        </div>
    );
};

FormStatus.propTypes = {};

export default FormStatus;
