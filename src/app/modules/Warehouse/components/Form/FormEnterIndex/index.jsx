import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'formik';
import useFormEnterIndex from 'helper/useFormEnterIndex';

const FormEnterIndex = ({ enterIndex, children, ...props }) => {

    const formRef = useRef();

    useFormEnterIndex(formRef)

    return (
        <Form ref={formRef} {...props}>
            {children}
        </Form>
    );
};

FormEnterIndex.propTypes = {
    enterIndex: PropTypes.bool
};

export default FormEnterIndex;