import React from 'react';

import { BarcodeInput } from '_metronic/_partials/controls';
import { Form, FastField, Formik } from 'formik';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import { isSKUCode } from 'helper/useScanBarcode';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';

import './index.scss';
import useTrans from 'helper/useTrans';

const FormAddChild = ({
    initialValues = {
        box_id: '',
        box_parent_id: ""
    },
    onSubmit
}, ref) => {

    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        box_id: Yup.string().required(trans("validation.message.required"))
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={ref}
        >
            {({ handleSubmit }) => (
                <div className="d-flex">
                    <Form className="form form-label-right">
                        <FastField
                            name="box_id"
                            component={BarcodeInput}
                            placeholder={trans("warehouse.sku.children")}
                            condition={isSKUCode}
                            submitOnEnter
                        />

                        <FormStatus />
                    </Form>

                    <div className="action-submit">
                        <span className="svg-icon svg-icon-primary svg-icon-3x" onClick={handleSubmit}>
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/Code/Plus.svg'
                                )}
                            ></SVG>
                        </span>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default React.forwardRef(FormAddChild);
