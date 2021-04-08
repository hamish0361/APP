import CustomTable from './CustomTable';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import { fetchSupplier } from '../../product-redux/supplierSlice';
import DialogDeleteSupplier from './DialogDeleteSupplier';
import DialogNewSupplier from './DialogNewSupplier';
import Loading from 'app/components/Loading';
import TopFilter from './TopFilter';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { injectIntl } from 'react-intl';

ProductSupplierPage.propTypes = {};

function ProductSupplierPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const supplier = useSelector(state => state.product.supplier);
    const { supplierList, paginations, loading } = supplier;

    const [params, setParams] = useState({
        page: 1,
        search: '',
        searchFields: ''
    });

    useEffect(() => {
        dispatch(fetchSupplier(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };
    const handleDeleteRow = id => {
        history.push(`/product/supplier/${id}/delete`);
    };

    const handleViewEditRow = id => {
        history.push(`/product/supplier/${id}/detail`);
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        setParams({
            ...params,
            search: search,
            searchFields: searchFields
        });
    };
    const columns = [
        {
            id: 'id',
            title: `${intl.formatMessage({
                id: 'SUPPLIER.TOPFILTER.ID'
            })}`
        },
        {
            id: 'name',
            title: `${intl.formatMessage({
                id: 'SUPPLIER.TOPFILTER.NAME'
            })}`
        },
        {
            id: 'link',
            title: `${intl.formatMessage({
                id: 'SUPPLIER.TOPFILTER.LINK'
            })}`
        },
        {
            id: 'email',
            title: `${intl.formatMessage({
                id: 'SUPPLIER.TOPFILTER.EMAIL'
            })}`
        },
        {
            id: 'address',
            title: `${intl.formatMessage({
                id: 'SUPPLIER.TOPFILTER.ADDRESS'
            })}`
        },
        {
            id: 'note',
            title: `${intl.formatMessage({
                id: 'SUPPLIER.TOPFILTER.NOTE'
            })}`
        }
    ];
    return (
        <>
            {loading && <Loading />}
            <Route path="/product/supplier/:id/delete">
                {({ history, match }) => (
                    <DialogDeleteSupplier
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() => history.push('/product/supplier')}
                        intl={intl}
                    />
                )}
            </Route>
            <Route path="/product/supplier/new">
                {({ history, match }) => (
                    <DialogNewSupplier
                        show={match != null}
                        onHide={() => history.push('/product/supplier')}
                        intl={intl}
                    />
                )}
            </Route>
            <TopHeader
                title={intl.formatMessage({
                    id: 'SUPPLIER.TITLE'
                })}
            >
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        history.push('/product/supplier/new');
                    }}
                >
                    {intl.formatMessage({
                        id: 'GLOBAL.BUTTON.CREATE'
                    })}
                </button>
            </TopHeader>
            <div className="pb-8 px-8">
                <Card>
                    <CardBody>
                        <TopFilter onSearch={handleSubmitSearch} intl={intl} />
                        <CustomTable
                            columns={columns}
                            rows={supplierList}
                            page={params.page}
                            lastpage={paginations.lastPage}
                            onDelete={handleDeleteRow}
                            onViewEdit={handleViewEditRow}
                            onPageChange={handlePageChange}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductSupplierPage));
