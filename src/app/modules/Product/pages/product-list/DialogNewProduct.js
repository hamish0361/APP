import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '_metronic/_partials/controls';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Prompt, useHistory } from 'react-router-dom';
import {
    createProduct,
    createProductImageFile
} from '../../product-redux/productSlice';
import { fetchUnit } from '../../product-redux/unitSlice';
import { fetchOrigin } from '../../product-redux/originSlice';
import { fetchTax } from '../../product-redux/taxSlice';
import * as Yup from 'yup';
import { dialog } from 'app/components/DialogNotify';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import './product-detail/index.scss';
import { useForm, Controller } from 'react-hook-form';
import TopHeader from './TopHeader';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFileUpload } from 'use-file-upload';
import { IMAGES } from 'constant/Images';
import NumberFormat from 'react-number-format';
import Loading from 'app/components/Loading';
import { injectIntl } from 'react-intl';
import './product-detail/index.scss';
import _ from 'lodash';

DialogNewProduct.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool,
    onSuccess: PropTypes.func
};

function DialogNewProduct({ intl }) {
    const ProductCreateSchema = Yup.object().shape({
        id: Yup.string()
            .max(
                15,
                ` ${intl.formatMessage({
                    id: 'PRODUCT.CREATE.SCHEMA.ID_MAX'
                })}`
            )
            .required(
                ` ${intl.formatMessage({
                    id: 'PRODUCT.CREATE.SCHEMA.ID_REQUIRED'
                })}`
            ),
        name: Yup.string().required(
            ` ${intl.formatMessage({
                id: 'PRODUCT.CREATE.SCHEMA.NAME_REQUIRED'
            })}`
        ),
        price: Yup.string().required(
            ` ${intl.formatMessage({
                id: 'PRODUCT.CREATE.SCHEMA.PRICE_REQUIRED'
            })}`
        ),
        weight: Yup.string().required(
            ` ${intl.formatMessage({
                id: 'PRODUCT.CREATE.SCHEMA.WEIGHT_REQUIRED'
            })}`
        ),
        length: Yup.string().required(
            ` ${intl.formatMessage({
                id: 'PRODUCT.CREATE.SCHEMA.LENGTH_REQUIRED'
            })}`
        ),
        width: Yup.string().required(
            ` ${intl.formatMessage({
                id: 'PRODUCT.CREATE.SCHEMA.WIDTH_REQUIRED'
            })}`
        ),
        height: Yup.string().required(
            ` ${intl.formatMessage({
                id: 'PRODUCT.CREATE.SCHEMA.HEIGHT_REQUIRED'
            })}`
        )
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const { unitList, isActionLoading } = useSelector(
        ({ product }) => ({
            unitList: product.unit.unitList,
            isActionLoading: product.list.isActionLoading
        }),

        shallowEqual
    );

    const { register, handleSubmit, errors, control, getValues } = useForm({
        resolver: yupResolver(ProductCreateSchema)
    });
    const [valueCheck, setValueCheck] = useState();
    const [isSuccess, setIsSuccess] = useState(true);

    const tax = useSelector(state => state.product.tax?.taxList);
    const origin = useSelector(state => state.product.origin?.originList);

    const [tags, setTags] = useState([]);

    const [defaultSrc, setDefaultSrc] = useState('');
    const [files, selectFiles] = useFileUpload();

    useEffect(() => {
        dispatch(fetchOrigin());
        dispatch(fetchUnit());
        dispatch(fetchTax());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const taxSelect = tax?.map(item => ({
        value: item.id,
        label: item.name
    }));
    const originSelect = origin?.map(item => ({
        value: item.id,
        label: item.name
    }));
    const unitSelect = unitList?.map(item => ({
        value: item.id,
        label: item.name
    }));

    const handleUploadImage = e => {
        const urlImage = e.target.value;
        if (urlImage.includes('data:')) {
            dialog.error(
                ` ${intl.formatMessage({
                    id: 'PRODUCT.CREATE.URL.FORMAT'
                })}`
            );
        } else {
            setDefaultSrc(urlImage);
        }
    };

    const onSubmit = data => {
        const ingredientString = tags.toString();
        const params = {
            id: data.id || '',
            name: data.name || '',
            price: data?.price.replace(/,/g, '') || '',
            origin_id: data?.origin_id?.value || '',
            unit_id: data.unit_id?.value || '',
            ingredients: ingredientString || '',
            tax_id: data.tax_id?.value || '',
            image_url: defaultSrc,
            package: JSON.stringify({
                quantity: data?.quantity,
                height: data?.height,
                weight: data?.weight,
                length: data?.length,
                width: data?.width
            })
        };

        if (files != null) {
            const formData = new FormData();
            formData.set('image', files.file, files.name);

            let body = {
                params: params,
                data: formData
            };
            dispatch(createProductImageFile(body)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        ` ${intl.formatMessage({
                            id: 'PRODUCT.CREATE.DIALOG_SUCCESS'
                        })}`
                    );
                    setIsSuccess(false);
                    history.push(`/product/${data.id}/detail`);
                } else {
                    dialog.error(
                        ` ${intl.formatMessage({
                            id: 'PRODUCT.CREATE.ERROR'
                        })}`
                    );
                }
            });
        } else {
            dispatch(createProduct(params)).then(res => {
                if (res.type.includes('fulfilled')) {
                    dialog.success(
                        ` ${intl.formatMessage({
                            id: 'PRODUCT.CREATE.DIALOG_SUCCESS'
                        })}`
                    );
                    setIsSuccess(false);
                    history.push(`/product/${data.id}/detail`);
                } else {
                    dialog.error(
                        ` ${intl.formatMessage({
                            id: 'PRODUCT.CREATE.ERROR'
                        })}`
                    );
                }
            });
        }
    };
    const handleChangeForm = () => {
        setValueCheck(getValues());
    };
    let checkLoad = !!valueCheck ? Object.values(valueCheck) : null;

    // eslint-disable-next-line
    const handleSearch = useCallback(
        _.debounce((e, fetchData) => {
            if (e.length > 0) {
                const params = {
                    search: e,
                    searchFields: `name:like`
                };
                dispatch(fetchData(params));
            }
        }, 700),
        []
    );

    return (
        <>
            {isActionLoading && <Loading />}
            <TopHeader
                title={intl.formatMessage({
                    id: 'PRODUCT.CREATE.TITLE'
                })}
            >
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                        history.push('/product/list');
                    }}
                >
                    <i className="fa fa-arrow-left" />
                    {intl.formatMessage({
                        id: 'PRODUCT.CREATE.BUTTON_CANCLE'
                    })}
                </button>
                <button
                    className="btn btn-primary ml-2"
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                >
                    {intl.formatMessage({
                        id: 'PRODUCT.CREATE.BUTTON_CREATE'
                    })}
                </button>
            </TopHeader>
            <div className="pb-8 px-8 row">
                <div className="col-xl-8 mb-8">
                    <Card className="h-100">
                        <CardHeader
                            title={intl.formatMessage({
                                id: 'PRODUCT.CREATE.INFO_PRODUCT'
                            })}
                        />
                        <CardBody>
                            <div className="row">
                                <div className="col-lg-5 col-md-4 ">
                                    <div className="app-image">
                                        <img
                                            style={{
                                                width: 'inherit',
                                                height: '100%',
                                                objectFit:
                                                    files != null
                                                        ? 'unset'
                                                        : 'cover'
                                            }}
                                            src={
                                                files?.source ||
                                                defaultSrc ||
                                                IMAGES.ADD_IMAGE
                                            }
                                            alt="preview"
                                        />
                                    </div>
                                    <div
                                        className="col-lg-12 col-md-12 py-2 "
                                        style={{
                                            padding: 'unset',
                                            marginTop: '1rem'
                                        }}
                                    >
                                        <div className="input-group mb-3">
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
                                                    onClick={() =>
                                                        selectFiles({
                                                            accept: 'image/*'
                                                        })
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
                                                onChange={handleUploadImage}
                                                placeholder="Url image"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-8 pl-10">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        onChange={handleChangeForm}
                                    >
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
                                                <input
                                                    className="form-control"
                                                    name="id"
                                                    ref={register}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'PRODUCT.CREATE.PLACEHOLER.ID'
                                                        }
                                                    )}
                                                />
                                                {errors.id && (
                                                    <p
                                                        style={{
                                                            color: 'red',
                                                            margin: 'unset'
                                                        }}
                                                    >
                                                        {errors.id.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-3">
                                                <span className="order-title">
                                                    {intl.formatMessage({
                                                        id:
                                                            'PRODUCT.TOPFILTER.NAME'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="col-9">
                                                <input
                                                    className="form-control"
                                                    name="name"
                                                    ref={register}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'PRODUCT.CREATE.PLACEHOLER.NAME'
                                                        }
                                                    )}
                                                />
                                                {errors.name && (
                                                    <p
                                                        style={{
                                                            color: 'red',
                                                            margin: 'unset'
                                                        }}
                                                    >
                                                        {errors.name.message}
                                                    </p>
                                                )}
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
                                                <Controller
                                                    defaultValue={''}
                                                    as={NumberFormat}
                                                    thousandSeparator
                                                    name="price"
                                                    className="form-control"
                                                    control={control}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'PRODUCT.CREATE.PLACEHOLER.PRICE'
                                                        }
                                                    )}
                                                />

                                                {errors.price && (
                                                    <p
                                                        style={{
                                                            color: 'red',
                                                            margin: 'unset'
                                                        }}
                                                    >
                                                        {errors.price.message}
                                                    </p>
                                                )}
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
                                                <Controller
                                                    name="origin_id"
                                                    control={control}
                                                    defaultValue={''}
                                                    as={
                                                        <Select
                                                            options={
                                                                originSelect
                                                            }
                                                            placeholder={intl.formatMessage(
                                                                {
                                                                    id:
                                                                        'PRODUCT.CREATE.PLACEHOLER.ORIGIN'
                                                                }
                                                            )}
                                                            onInputChange={e =>
                                                                handleSearch(
                                                                    e,
                                                                    fetchOrigin
                                                                )
                                                            }
                                                        />
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-3">
                                                <span className="order-title">
                                                    {intl.formatMessage({
                                                        id:
                                                            'PRODUCT.TOPFILTER.UNIT'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="col-9">
                                                <Controller
                                                    name="unit_id"
                                                    control={control}
                                                    defaultValue={''}
                                                    as={
                                                        <Select
                                                            options={unitSelect}
                                                            placeholder={intl.formatMessage(
                                                                {
                                                                    id:
                                                                        'PRODUCT.CREATE.PLACEHOLER.UNIT'
                                                                }
                                                            )}
                                                            onInputChange={e =>
                                                                handleSearch(
                                                                    e,
                                                                    fetchUnit
                                                                )
                                                            }
                                                        />
                                                    }
                                                />
                                                {errors.exampleRequired && (
                                                    <p>
                                                        This field is required
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <div className="col-3">
                                                <span className="order-title">
                                                    {intl.formatMessage({
                                                        id:
                                                            'PRODUCT.TOPFILTER.TAX'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="col-9">
                                                <Controller
                                                    name="tax_id"
                                                    control={control}
                                                    defaultValue={''}
                                                    as={
                                                        <Select
                                                            options={taxSelect}
                                                            placeholder={intl.formatMessage(
                                                                {
                                                                    id:
                                                                        'PRODUCT.CREATE.PLACEHOLER.TAX'
                                                                }
                                                            )}
                                                            onInputChange={e =>
                                                                handleSearch(
                                                                    e,
                                                                    fetchTax
                                                                )
                                                            }
                                                        />
                                                    }
                                                />
                                                {errors.exampleRequired && (
                                                    <p>
                                                        This field is required
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group row align-items-center">
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
                                                    className="form-control "
                                                    tags={tags}
                                                    placeholder={intl.formatMessage(
                                                        {
                                                            id:
                                                                'PRODUCT.CREATE.PLACEHOLER.INGREDIENT'
                                                        }
                                                    )}
                                                    editable={true}
                                                    readOnly={false}
                                                    onChange={newTags =>
                                                        setTags(newTags)
                                                    }
                                                    allowDuplicates={false}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-xl-4 mb-8">
                    <Card className="h-100">
                        <CardHeader
                            title={intl.formatMessage({
                                id: 'PRODUCT.CREATE.INFO_PACKAGE'
                            })}
                        />
                        <CardBody>
                            <div>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    onChange={handleChangeForm}
                                >
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.QUANTITY'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <input
                                                defaultValue="1"
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="quantity"
                                                ref={register}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.QUANTITY'
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
                                                        'PRODUCT.CREATE.INFO_PACKAGE.WEIGHT'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="weight"
                                                ref={register}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.WEIGHT'
                                                    }
                                                )}
                                            />{' '}
                                            {errors.weight && (
                                                <p
                                                    style={{
                                                        color: 'red',
                                                        margin: 'unset'
                                                    }}
                                                >
                                                    {errors.weight.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.LENGTH'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="length"
                                                ref={register}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.LENGTH'
                                                    }
                                                )}
                                            />
                                            {errors.length && (
                                                <p
                                                    style={{
                                                        color: 'red',
                                                        margin: 'unset'
                                                    }}
                                                >
                                                    {errors.length.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.WIDTH'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="width"
                                                ref={register}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.WIDTH'
                                                    }
                                                )}
                                            />
                                            {errors.width && (
                                                <p
                                                    style={{
                                                        color: 'red',
                                                        margin: 'unset'
                                                    }}
                                                >
                                                    {errors.width.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-3">
                                            <span className="order-title">
                                                {intl.formatMessage({
                                                    id:
                                                        'PRODUCT.CREATE.INFO_PACKAGE.HEIGHT'
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-9">
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="height"
                                                ref={register}
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'PRODUCT.CREATE.PLACEHOLER.HEIGHT'
                                                    }
                                                )}
                                            />
                                            {errors.height && (
                                                <p
                                                    style={{
                                                        color: 'red',
                                                        margin: 'unset'
                                                    }}
                                                >
                                                    {errors.height.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Prompt
                when={!!checkLoad && isSuccess}
                message={intl.formatMessage({
                    id: 'GLOBAL.MESSAGE.FILLED_OUT'
                })}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(DialogNewProduct));
