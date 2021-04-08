import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Input } from '_metronic/_partials/controls';
import * as Yup from 'yup';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import './index.scss';
import { Route } from 'react-router-dom';
import DialogUploadImgageProduct from './image-card/DialogUploadImgageProduct';
import { IMAGES } from 'constant/Images';
import { useFileUpload } from 'use-file-upload';
import NumberFormat from 'react-number-format';
import SelectForm from 'app/components/Select/BaseSelectForm';
import { useDispatch } from 'react-redux';
import { fetchOrigin } from 'app/modules/Product/product-redux/originSlice';
import { fetchUnit } from 'app/modules/Product/product-redux/unitSlice';
import { fetchTax } from 'app/modules/Home/redux/homeSlice';

ProductDetailForm.propTypes = {
    initialValues: PropTypes.object,
    unitList: PropTypes.array,
    taxList: PropTypes.array,
    originList: PropTypes.array,
    onChangeTag: PropTypes.func,
    imageProduct: PropTypes.string,
    idProduct: PropTypes.string,
    onUploadImageUrl: PropTypes.func,
    onUploadImageFile: PropTypes.func,
    onChangePrice: PropTypes.func
};

function ProductDetailForm({
    intl,
    initialValues = {},
    btnRef,
    onSave,
    unitList,
    taxList,
    originList,
    onChangeTag,
    imageProduct = '',
    idProduct = '',
    onUploadImageUrl,
    onUploadImageFile,
    onChangePrice
}) {
    const ProductUpdateSchema = Yup.object().shape({
        price: Yup.number().required(
            ` ${intl.formatMessage({
                id: 'PRODUCT.CREATE.SCHEMA.PRICE_REQUIRED'
            })}`
        )
    });

    const [tags, setTags] = useState(null);
    const listIngredient = initialValues?.ingredients;
    const arrayIngridient = listIngredient.split(',');
    const [files, selectFiles] = useFileUpload();
    const [priceProduct, setPriceProduct] = useState('');
    const dispatch = useDispatch();

    const handleUpLoadImageFile = e => {
        selectFiles({
            accept: 'image/*'
        });
    };

    useEffect(() => {
        if (files) onUploadImageFile(files);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    useEffect(() => {
        setPriceProduct(initialValues?.price);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues?.id]);

    const handleChangePrice = e => {
        setPriceProduct(e.target.value);
        onChangePrice(e.target.value);
    };
    const optionOrigin = originList?.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    const optionTax = taxList?.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    const optionUnit = unitList?.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });
    const fetchDataOrigin = params => {
        dispatch(fetchOrigin(params));
    };
    const fetchDataUnit = params => {
        dispatch(fetchUnit(params));
    };
    const fetchDataTax = params => {
        dispatch(fetchTax(params));
    };
    const handleSaveInfo = data => {
        onSave(data);
    };

    return (
        <>
            <Route path="/product/:id/detail/upload-image">
                {({ history, match }) => (
                    <DialogUploadImgageProduct
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() =>
                            history.push(`/product/${idProduct}/detail`)
                        }
                    />
                )}
            </Route>
            <Formik
                enableReinitialize={true}
                initialValues={(initialValues && initialValues) || {}}
                onSubmit={handleSaveInfo}
                validationSchema={ProductUpdateSchema}
                innerRef={btnRef}
            >
                {({ handleSubmit }) => (
                    <>
                        <Form className="form form-label-right">
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <div className="image-product-detail">
                                        <img
                                            style={{
                                                width: 'inherit',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                            src={
                                                files?.source ||
                                                imageProduct ||
                                                IMAGES.NOT_FOUND
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        className="col-lg-12 col-md-12"
                                        style={{
                                            padding: 'unset',
                                            marginTop: '1rem'
                                        }}
                                    >
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <span
                                                    type="button"
                                                    className="input-group-text"
                                                    id="basic-addon3"
                                                    style={{
                                                        backgroundColor:
                                                            '#3699FF',
                                                        color: '#ffffff'
                                                    }}
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Click me to change image!"
                                                    onClick={
                                                        handleUpLoadImageFile
                                                    }
                                                >
                                                    Upload
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="basic-url"
                                                aria-describedby="basic-addon3"
                                                onChange={onUploadImageUrl}
                                                placeholder={'Url image'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.TOPFILTER.JANCODE'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <FastField
                                                name="id"
                                                component={Input}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id: 'PRODUCT.TOPFILTER.NAME'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <FastField
                                                name="name"
                                                component={Input}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.NAME'
                                                    }
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.TOPFILTER.PRICE'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <NumberFormat
                                                thousandSeparator={true}
                                                className="form-control"
                                                name="price"
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.PRICE'
                                                    }
                                                )}
                                                value={priceProduct}
                                                onChange={handleChangePrice}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.TOPFILTER.ORIGIN'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <SelectForm
                                                options={optionOrigin}
                                                name="origin_id"
                                                onFetchData={fetchDataOrigin}
                                                typeSearch="name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id: 'PRODUCT.TOPFILTER.UNIT'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <SelectForm
                                                options={optionUnit}
                                                name="unit_id"
                                                onFetchData={fetchDataUnit}
                                                typeSearch="name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id: 'PRODUCT.TOPFILTER.TAX'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <SelectForm
                                                options={optionTax}
                                                name="tax_id"
                                                onFetchData={fetchDataTax}
                                                typeSearch="name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.TOPFILTER.INGREDIENT'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9 product-info-container">
                                            <ReactTagInput
                                                tags={tags || arrayIngridient}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.INGREDIENT'
                                                    }
                                                )}
                                                editable={true}
                                                readOnly={false}
                                                allowDuplicates={false}
                                                onChange={newTag => {
                                                    setTags(newTag);
                                                    onChangeTag(newTag);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                style={{ display: 'none' }}
                                ref={btnRef}
                                onSubmit={() => handleSubmit()}
                            ></button>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );
}

export default ProductDetailForm;
