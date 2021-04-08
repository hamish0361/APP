import React, { useEffect } from 'react';

import { Input } from '_metronic/_partials/controls';
import { FastField, Formik } from 'formik';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import Form from '../FormEnterIndex';

import useSocket from 'helper/useSocket';
import useTrans from 'helper/useTrans';

import './index.scss';

const objGetDWS = {
    type: "ReadDWS"
}

const FormUpdateBoxPhysicalInfo = ({
    formItemClass = "col-lg-6 col-md-6 mt-3",
    isHaveDuplicate = true,
    onSubmit,
    initialValues
}, ref) => {

    const [trans] = useTrans();
    const [send] = useSocket({
        onReceivedMessage: (socketData) => handleSocketData(socketData)
    });

    useEffect(() => {
        send(JSON.stringify(objGetDWS));
    }, []); // eslint-disable-line

    const handleSocketData = (socketData) => {
        console.log(socketData, 'handleSocketData')
    }

    const validationSchema = Yup.object().shape({
        width: Yup.number().min(0, trans("validation.message.min", { min: 0 })),
        height: Yup.number().min(0, trans("validation.message.min", { min: 0 })),
        weight_per_box: Yup.number().min(0, trans("validation.message.min", { min: 0 })),
        length: Yup.number().min(0, trans("validation.message.min", { min: 0 })),
        duplicate: Yup.number().min(0, trans("validation.message.min", { min: 0 })),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={ref}
        >
            <Form className="form form-label-right form-update-box-info">
                <div className="form-group row">
                    <div className={formItemClass}>
                        <FastField
                            name="weight_per_box"
                            component={Input}
                            label={trans("common.weight")}
                            placeholder={trans("common.weight")}
                            autoFocus
                            type="number"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="width"
                            component={Input}
                            label={trans("common.width")}
                            placeholder={trans("common.width")}
                            type="number"
                            min={0}
                        />
                    </div>
                    <div className={formItemClass}>
                        <FastField
                            name="height"
                            component={Input}
                            label={trans("common.height")}
                            placeholder={trans("common.height")}
                            type="number"
                            min={0}
                        />
                    </div>

                    <div className={formItemClass}>
                        <FastField
                            name="length"
                            component={Input}
                            label={trans("common.length")}
                            placeholder={trans("common.length")}
                            type="number"
                            min={0}
                        />
                    </div>
                    {isHaveDuplicate && (
                        <div className={formItemClass}>
                            <FastField
                                name="duplicate"
                                component={Input}
                                label={trans("warehouse.sku.duplicate")}
                                placeholder={trans("warehouse.sku.duplicate")}
                                type="number"
                                min={0}
                            />
                        </div>
                    )}
                </div>
                <FormStatus />
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormUpdateBoxPhysicalInfo);