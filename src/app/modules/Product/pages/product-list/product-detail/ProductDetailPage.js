import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import ProductDetailForm from './ProductDetailForm';
import { fetchUnit } from 'app/modules/Product/product-redux/unitSlice';
import { fetchTax } from 'app/modules/Product/product-redux/taxSlice';
import Loading from 'app/components/Loading';
import { dialog } from 'app/components/DialogNotify';
import PackageProductPage from './package-card/PackageProductPage';
import ProductSupplierList from './supplier-card/ProductSupplierList';
import { fetchOrigin } from 'app/modules/Product/product-redux/originSlice';
import {
    fecthProductId,
    updateProduct,
    uploadImageProduct
} from 'app/modules/Product/product-redux/productSlice';
import { fetchIventory } from 'app/modules/Product/product-redux/productSlice';
import './index.scss';
import IventoryListPage from './iventory-card/IventoryListPage';
import ProductHeaderPage from './ProductHeaderPage';
import { injectIntl } from 'react-intl';

function ProductDetailPage({
    history,
    match: {
        params: { id }
    },
    intl
}) {
    const dispatch = useDispatch();
    const _ = require('lodash');
    const [urlImage, setUrlImage] = useState(null);
    const [loadData, setLoadData] = useState(null);
    const products = useSelector(state => state.product.list);
    const { productDetail, loading, isActionLoading } = products;
    const bodyFetchById = {
        id: id,
        params: {
            with: 'origin;suppliers;unit;tax;package'
        }
    };
    const [ingredientList, setIngredientList] = useState([]);
    const unit = useSelector(state => state.product.unit.unitList);
    const tax = useSelector(state => state.product.tax.taxList);
    const origin = useSelector(state => state.product.origin.originList);
    const iventorys = useSelector(state => state.product.list);
    const { iventoryList, paginationIventory, loadingIventory } = iventorys;
    const [price, setPrice] = useState('');

    const [paramsIventory, setParamsIventory] = useState({
        criteria: 'inventory',
        page: 1,
        search: `items.product_id:${id}`
    });

    useEffect(() => {
        dispatch(fetchIventory(paramsIventory));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsIventory]);

    const handlePageChangeIventory = newPage => {
        setParamsIventory({
            ...paramsIventory,
            page: newPage
        });
    };

    useEffect(() => {
        dispatch(fecthProductId(bodyFetchById)).then(res => {
            if (res.type.includes('fulfilled')) {
                setUrlImage(
                    res?.payload?.images?.path
                        ? `${process.env.REACT_APP_API_URL_PRODUCT}/files/${res?.payload?.images?.path}`
                        : res?.payload?.images?.url
                );
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        dispatch(fetchOrigin());
        dispatch(fetchUnit());
        dispatch(fetchTax());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initProduct = {
        id: productDetail?.id || '',
        name: productDetail?.name || '',
        unit_id: productDetail?.unit_id || '',
        origin_id: productDetail?.origin_id || '',
        price: productDetail?.price || '',
        tax_id: productDetail?.tax_id || '',
        ingredients: productDetail?.ingredients || ''
    };

    const imageProduct =
        urlImage || loadData?.images?.url || productDetail?.images?.url;
    const infoPackageProduct = productDetail ? productDetail?.package : null;

    const btnRef = useRef();

    const handleEditClick = () => {
        if (btnRef && btnRef.current) {
            btnRef.current.handleSubmit();
        }
    };

    const handleChangePriceProduct = price => {
        setPrice(price);
    };

    const handleSave = values => {
        const ingredientProduct =
            ingredientList.toString() || productDetail?.ingredients;
        let body = {
            id: id,
            params: {
                ..._.omit(values, ['id', 'suppliers']),
                ingredients: ingredientProduct,
                price: price?.replace(/\D/g, '') || productDetail?.price,
                image_url: urlImage || imageProduct
            }
        };
        dispatch(updateProduct(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UPDATE_PRODUCT.DIALOG_SUCCESS'
                    })}`
                );
                setLoadData(res.payload);
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UPDATE_PRODUCT.DIALOG_ERROR'
                    })}`
                );
            }
        });
    };

    const handleUploadImage = e => {
        setUrlImage(e.target.value);
    };

    const handelUploadImageFile = files => {
        const formData = new FormData();
        formData.set('image', files.file, files.name);
        const body = {
            idProduct: id,
            data: formData
        };
        dispatch(uploadImageProduct(body)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UPDATE_IMAGE.DIALOG_SUCCESS'
                    })}`
                );
                history.push(`/product/${id}/detail`);
            } else {
                dialog.error(
                    `${intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UPDATE_IMAGE.DIALOG_ERROR'
                    })}`
                );
            }
        });
    };
    return (
        <>
            {(loading || isActionLoading) && <Loading />}
            <ProductHeaderPage idProduct={id} intl={intl} />
            <div className="pb-8 px-8">
                <>
                    <div className="row">
                        <div className="col-xl-8 mb-8">
                            <Card className="h-100">
                                <CardHeader
                                    title={intl.formatMessage({
                                        id: 'PRODUCT.DETAIL.INFO_PRODUCT.TITLE'
                                    })}
                                >
                                    <CardHeaderToolbar>
                                        {`  `}
                                        <button
                                            type="submit"
                                            className="btn btn-primary ml-2"
                                            onClick={handleEditClick}
                                        >
                                            {intl.formatMessage({
                                                id:
                                                    'PRODUCT.DETAIL.INFO_PRODUCT.UPDATE.BUTTON'
                                            })}
                                        </button>
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
                                    <ProductDetailForm
                                        intl={intl}
                                        onSave={handleSave}
                                        btnRef={btnRef}
                                        initialValues={initProduct}
                                        unitList={unit ? unit : []}
                                        taxList={tax ? tax : []}
                                        originList={origin ? origin : []}
                                        onChangeTag={text =>
                                            setIngredientList(text)
                                        }
                                        imageProduct={imageProduct}
                                        idProduct={id}
                                        infoPackageProduct={infoPackageProduct}
                                        onUploadImageUrl={handleUploadImage}
                                        onUploadImageFile={
                                            handelUploadImageFile
                                        }
                                        onChangePrice={handleChangePriceProduct}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-xl-4 mb-8">
                            <PackageProductPage
                                intl={intl}
                                initialValues={infoPackageProduct}
                                idProduct={id}
                            />
                        </div>
                    </div>
                    <ProductSupplierList
                        intl={intl}
                        supplierProduct={
                            productDetail && productDetail?.suppliers
                        }
                        idProduct={id}
                    />
                    <IventoryListPage
                        loadingIventory={loadingIventory}
                        intl={intl}
                        params={paramsIventory}
                        pagination={paginationIventory}
                        list={iventoryList}
                        onChangePage={handlePageChangeIventory}
                    />
                </>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductDetailPage));
