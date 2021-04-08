import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUnit } from 'app/modules/Product/product-redux/unitSlice';
import { fetchOrigin } from 'app/modules/Product/product-redux/originSlice';
import { fetchTax } from 'app/modules/Product/product-redux/taxSlice';
import { useFileUpload } from 'use-file-upload';
import useTrans from 'helper/useTrans';
import _ from 'lodash';

import { FastField, Formik } from 'formik';
import { Input, Textarea } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import FormStatus from '../FormStatus';
import Form from '../FormEnterIndex';
import SelectForm from 'app/components/Select/BaseSelectForm';
import { dialog } from 'app/components/DialogNotify';

import './index.scss';

const defaultSrc = 'https://static.thenounproject.com/png/558475-200.png'

const FormAddNewProduct = ({
    initialValues = {
        id: '',
        name: '',
        price: '',
        origin_id: '',
        unit_id: '',
        ingredients: '',
        tax_id: '',
        image_url: defaultSrc,
        package: "{}"
    },
    onSubmit,
    onSubmitFormData
}, ref) => {

    const origins = useSelector(state => state.product.origin?.originList);
    const units = useSelector(state => state.product.unit?.unitList);
    const taxs = useSelector(state => state.product.tax?.taxList);

    const [trans] = useTrans();
    const dispatch = useDispatch();

    const [files, selectFiles] = useFileUpload();

    const validationSchema = Yup.object().shape({
        id: Yup.string().required(trans("validation.message.required")),
        name: Yup.string().required(trans("validation.message.required")),
        price: Yup.number().required(trans("validation.message.required"))
    });

    useEffect(() => {
        if(!origins?.length) dispatch(fetchOrigin());
    }, [origins?.length, dispatch]);

    useEffect(() => {
        if(!units?.length) dispatch(fetchUnit());
    }, [units?.length, dispatch]);

    useEffect(() => {
        if(!taxs?.length) dispatch(fetchTax());
    }, [taxs?.length, dispatch]);

    const originOptions = useMemo(() => {
        return origins.map(i => ({ value: i.id, label: i.name }))
    }, [origins]);

    const unitOptions = useMemo(() => {
        return units.map(i => ({ value: i.id, label: i.name }))
    }, [units]);

    const taxOptions = useMemo(() => {
        return taxs.map(i => ({ value: i.id, label: i.name }))
    }, [taxs]);

    const handleSubmit = (values, form) => {
        if (files != null) {
            const formData = new FormData();
            formData.set('image', files.file, files.name);

            const body = {
                params: _.omit(values, ['image_url']),
                data: formData
            };
            onSubmitFormData(body, form);
        } else {
            onSubmit(values, form);
        }
    }

    const handleUploadImage = (e, setFieldValue) => {
        const urlImage = e.target.value;
        if (urlImage.includes('data:')) {
            dialog.error(trans("validation.message.not_found.url"));
        } else {
            setFieldValue('image_url', urlImage);
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
            innerRef={ref}
            validationSchema={validationSchema}
        >
            {({ values, setFieldValue }) => (
                <div className="row">
                    <div className="col-lg-5 col-md-4 app-image">
                        <button
                            onClick={() =>
                                selectFiles({
                                    accept: 'image/*'
                                })
                            }
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={trans("warehouse.jancode.image.click_to_change")}
                        >
                            <img
                                src={files?.source || values.image_url}
                                alt="preview"
                            />
                        </button>
                        <div className="input-group mt-3">
                            <div className="input-group-prepend">
                                <span
                                    className="input-group-text"
                                    id="basic-addon3"
                                    style={{
                                        backgroundColor:
                                            '#3699FF',
                                        color: '#ffffff'
                                    }}
                                >
                                    {trans("warehouse.jancode.image.url")}
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="basic-url"
                                aria-describedby="basic-addon3"
                                onChange={(e) => handleUploadImage(e, setFieldValue)}
                            />
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-8 pl-10">
                        <Form className="form form-label-right form-add-product">
                            <FastField
                                name="id"
                                component={Input}
                                label={trans("warehouse.jancode.id")}
                                placeholder={trans("warehouse.jancode.id")}
                            />

                            <FastField
                                name="name"
                                component={Input}
                                label={trans("common.name")}
                                placeholder={trans("common.name")}
                            />

                            <FastField
                                name="price"
                                component={Input}
                                label={trans("common.price")}
                                placeholder={trans("common.price")}
                                type="number"
                                min={0}
                            />

                            <SelectForm
                                name="origin_id"
                                label={trans("warehouse.jancode.origin.title")}
                                options={originOptions}
                            />

                            <SelectForm
                                name="unit_id"
                                label={trans("warehouse.jancode.unit.title")}
                                options={unitOptions}
                            />

                            <SelectForm
                                name="tax_id"
                                label={trans("warehouse.jancode.tax.title")}
                                options={taxOptions}
                            />

                            <FastField
                                name="ingredients"
                                component={Textarea}
                                label={trans("warehouse.jancode.properties.title")}
                                placeholder={trans("warehouse.jancode.properties.title")}
                                type="textarea"
                            />

                            <FormStatus />
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default React.forwardRef(FormAddNewProduct);