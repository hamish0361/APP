import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import productApi from 'apis/product-api/productApi';
import queryString from 'query-string';
import _ from 'lodash';
import useTrans from 'helper/useTrans';

import { Card, CardBody } from '_metronic/_partials/controls';
import Loading from 'app/components/Loading';
import EmptyData from 'app/components/EmptyData';
import formatNumber from 'helper/formatNumber';

import './index.scss';

const FilterJancodeExtraData = props => {

    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [trans] = useTrans();

    const locationSearch = useMemo(() => {
        return queryString.parse(location.search);
    }, [location]);

    useEffect(() => {
        if (locationSearch?.['items.product_id']) {
            setLoading(true);
            productApi.fetchProductById({ id: locationSearch?.['items.product_id'] })
                .then(res => {
                    setProduct(res);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [locationSearch]);

    const boxes = useSelector(state => state.warehouse.dashboard.boxes);

    const getTotalItems = useMemo(() => {
        const jancode = locationSearch['items.product_id'];

        return boxes.reduce((prevV, curBox) => {
            let itemInBox = _.find(curBox.items, ['product_id', jancode]);

            if (!itemInBox) return prevV;

            return prevV + (itemInBox.quantity * curBox.duplicate);
        }, 0);
    }, [locationSearch, boxes]);

    const getQuantityBoxInWH = useCallback((box) => {
        return box.quantity_inventory;
    }, []);

    const getQuantityItemsInWH = useMemo(() => {
        const jancode = locationSearch['items.product_id'];

        return boxes.reduce((prevV, curBox) => {
            let itemInBox = _.find(curBox.items, ['product_id', jancode]);

            if (!itemInBox) return prevV;

            return prevV + (itemInBox.quantity * getQuantityBoxInWH(curBox));
        }, 0);

    }, [locationSearch, boxes, getQuantityBoxInWH]);

    return (
        <Card className="filter-jancode-extra-data">
            <CardBody className="position-relative">
                {loading && <Loading local />}
                {!loading && !product && <EmptyData />}
                {product && (
                    <div className="d-flex">
                        <div className="product-identify">
                            <div className="product-id">{product.id}</div>
                            {product?.images?.url && (
                                <div className="image-section">
                                    <img src={product?.images?.url} alt="Search product" />
                                </div>
                            )}
                        </div>

                        <div className="product-content">
                            <div className="product-name">{product?.name}</div>
                            <div className="product-price">{trans("common.price")}: {formatNumber(product?.price)}</div>
                            <div className="product-ingredients">{trans("common.ingredients")}: {product?.ingredients}</div>
                        </div>
                    </div>
                )}
            </CardBody>
            <div className="card-footer position-relative">
                {loading && <Loading local />}
                <div>{trans("warehouse.dashboard.total_product")}: {formatNumber(getTotalItems)}</div>
                <div>{trans("warehouse.dashboard.total_product_inventory")}: {formatNumber(getQuantityItemsInWH)}</div>
            </div>
        </Card>
    );
};

FilterJancodeExtraData.propTypes = {

};

export default FilterJancodeExtraData;