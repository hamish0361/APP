import CustomTable from './CustomTable';
import Loading from 'app/components/Loading';
import TopHeader from 'app/modules/Product/components/TopHeader';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import { fetchProduct, initProduct } from '../../product-redux/productSlice';
import DialogDeleteProduct from './DialogDeleteProduct';
import TopFilter from './TopFilter';
import './index.scss';
import 'assets/css/order.scss';
import { IMAGES } from 'constant/Images';
import formatNumber from 'helper/formatNumber';
import { injectIntl } from 'react-intl';

ProductListPage.propTypes = {};

function ProductListPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const product = useSelector(state => state.product.list);
    const { productList, pagination, loading } = product;

    const rows = productList.map(item => {
        const checkNullItem =
            !item.name || !item.ingredients || !item.origin_id || !item.price;
        return {
            id: item.id || '',
            check: checkNullItem,
            product: (
                <div className="item-card__product">
                    <div className="symbol symbol-100 mr-5">
                        <div className="symbol-label">
                            <img
                                style={{ objectFit: 'cover' }}
                                className="h-100 w-100"
                                src={
                                    (item?.images?.path
                                        ? `${process.env.REACT_APP_API_URL_PRODUCT}/files/${item?.images?.path}`
                                        : item?.images?.url) || IMAGES.NOT_FOUND
                                }
                                alt="product"
                            />
                        </div>
                    </div>
                    <div className="item-card__product__name">
                        <p
                            className="text-ellipsis-2-line"
                            style={{ maxWidth: '300px' }}
                        >
                            {' '}
                            {item?.name || ''}
                        </p>
                        <p>{item?.id || ''}</p>
                    </div>
                </div>
            ),
            origin_id: item.origin?.name || null,
            price: formatNumber(item.price) || null,
            unit_id: item.unit?.name || '',
            tax_id: item.tax?.name || ''
        };
    });

    const [params, setParams] = useState({
        with: 'origin;suppliers;unit;tax;package',
        page: 1,
        search: '',
        searchFields: '',
        orderBy: 'updated_at',
        sortedBy: 'desc'
    });

    useEffect(() => {
        dispatch(initProduct());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchProduct(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };
    const [selectedId, setSelectedId] = useState(null);
    const [show, setShow] = useState(false);
    const handleDeleteRow = id => {
        setSelectedId(id);
        setShow(true);
    };

    const handleViewEditRow = id => {
        history.push(`/product/${id}/detail`);
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        setParams({
            ...params,
            page: 1,
            search: search,
            searchFields: searchFields,
            orderBy: 'updated_at',
            sortedBy: 'desc'
        });
    };
    const handleSort = (orderBy, sortedBy) => {
        setParams({
            ...params,
            page: 1,
            orderBy,
            sortedBy
        });
    };

    const columns = [
        {
            id: 'id',
            title: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.JANCODE'
            })}`
        },
        {
            id: 'check',
            title: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.JANCODE'
            })}`
        },
        {
            id: 'product',
            title: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.NAME'
            })}`
        },
        {
            id: 'origin_id',
            title: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.ORIGIN'
            })}`
        },
        {
            id: 'price',
            title: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.PRICE'
            })}`,
            isSort: true
        },
        {
            id: 'unit_id',
            title: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.UNIT'
            })}`
        },
        {
            id: 'tax_id',
            title: `${intl.formatMessage({
                id: 'PRODUCT.TOPFILTER.TAX'
            })}`,
            isSort: true
        }
    ];
    return (
        <>
            {loading && <Loading />}
            <TopHeader
                title={intl.formatMessage({
                    id: 'PRODUCT.TITLE'
                })}
            >
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        history.push('/product/tao-moi-san-pham');
                    }}
                >
                    {intl.formatMessage({
                        id: 'PRODUCT.TITLE.CREATE.BUTTON'
                    })}
                </button>
            </TopHeader>
            <div className="pb-8 px-8">
                <Card>
                    <CardBody>
                        <TopFilter onSearch={handleSubmitSearch} intl={intl} />
                        <CustomTable
                            columns={columns}
                            rows={rows}
                            page={params.page}
                            lastpage={pagination.lastPage}
                            onDelete={handleDeleteRow}
                            onViewEdit={handleViewEditRow}
                            onPageChange={handlePageChange}
                            onSort={handleSort}
                            intl={intl}
                        />
                    </CardBody>
                </Card>
            </div>
            <DialogDeleteProduct
                intl={intl}
                id={selectedId}
                show={show}
                onHide={() => setShow(false)}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(ProductListPage));
