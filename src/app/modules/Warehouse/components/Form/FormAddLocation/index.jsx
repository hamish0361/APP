import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAreas } from 'app/modules/Warehouse/warehouse-redux/areaSlice';
import _ from 'lodash';

import { Select, Input } from '_metronic/_partials/controls';
import CustomShelveSelect from './CustomShelveSelect';
import { FastField, Form, Formik } from 'formik';
import FormStatus from '../FormStatus';
import useTrans from 'helper/useTrans';
import * as Yup from 'yup';

import './index.scss';

const FormAddLocation = ({
    onSubmit,
    initialValues = {
        area_id: '',
        shelve_id: '',
        floor: 1,
        row: 1,
        column: 1
    }
}, ref) => {
    const areaList = useSelector(state => state.warehouse.area.list);
    const dispatch = useDispatch();
    const [trans] = useTrans();

    const validationSchema = Yup.object().shape({
        shelve_id: Yup.string().required(trans("validation.message.required")),
        floor: Yup.number().min(1, trans("validation.message.min", { min: 1 })),
        row: Yup.number().min(1, trans("validation.message.min", { min: 1 })),
        column: Yup.number().min(1, trans("validation.message.min", { min: 1 }))
    });

    useEffect(() => {
        if (!areaList.length) {
            dispatch(fetchAreas());
        }
    }, []); // eslint-disable-line

    const handleSubmit = (values, form) => {
        onSubmit && onSubmit(_.omit(values, 'area_id'), form);
    }

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={ref}
        >
            <Form className="form-add-location">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <Select
                            name="area_id"
                            placeholder={trans("warehouse.area.title")}
                            label={trans("warehouse.area.title")}
                        >
                            {areaList.map((area, idx) => (
                                <option value={area.id} key={`select-option-${idx}`}>
                                    {area.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <CustomShelveSelect name="shelve_id" label={trans("warehouse.shelve.title")} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <FastField
                            name="floor"
                            label={trans("common.floor")}
                            component={Input}
                            type="number"
                        />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <FastField
                            name="row"
                            label={trans("common.row")}
                            component={Input}
                            type="number"
                        />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <FastField
                            name="column"
                            label={trans("common.column")}
                            component={Input}
                            type="number"
                        />
                    </div>
                </div>

                <FormStatus />
            </Form>
        </Formik>
    );
};

export default React.forwardRef(FormAddLocation);