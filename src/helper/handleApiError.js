import _ from 'lodash';

export default function handleApiError(err, form) {
    if (form) {
        const errObj = _.get(err, ['response', 'errors']) || _.get(err, ['response', 'data', 'errors']);
        let errorsObj = {};
        
        if (errObj) {
            Object.entries(errObj).forEach(
                ([kErr, vErr]) => {
                    if(kErr === 'message') kErr = 'api';
                    errorsObj[kErr] = vErr[0];
                }
            );
        }

        form.setErrors({
            ...errorsObj,
            api: _.get(err, ['response', 'data', 'message']) || _.get(err, ['response', 'data', 'errors', 'message'])
        });
    } else {
        console.error(err);
    }
}