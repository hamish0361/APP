import OtherTable from '../../components/OtherTable';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import { fetchTax } from '../../product-redux/taxSlice';
import DialogNewTax from './DialogNewTax';
import DialogDeleteTax from './DialogDeleteTax';
import Loading from 'app/components/Loading';
import TopFilter from './TopFilter';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { injectIntl } from 'react-intl';

ProductTaxPage.propTypes = {};

function ProductTaxPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const taxs = useSelector(state => state.product.tax);
    const { taxList, loading } = taxs;

    const [params, setParams] = useState({
        search: '',
        searchFields: ''
    });

    useEffect(() => {
        dispatch(fetchTax(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleDeleteRow = id => {
        history.push(`/product/tax/${id}/delete`);
    };

    const handleViewEditRow = id => {
        history.push(`/product/tax/${id}/detail`);
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
                id: 'TAX.TOPFILTER.ID'
            })}`
        },
        {
            id: 'name',
            title: `${intl.formatMessage({
                id: 'TAX.TOPFILTER.NAME'
            })}`
        },
        {
            id: 'percent',
            title: `${intl.formatMessage({
                id: 'TAX.TOPFILTER.PERCENT'
            })}`
        }
    ];

    return (
        <>
            {loading && <Loading />}
            <>
                <Route path="/product/tax/:id/delete">
                    {({ history, match }) => (
                        <DialogDeleteTax
                            id={match && match.params.id}
                            show={match != null}
                            onHide={() => history.push('/product/tax')}
                            intl={intl}
                        />
                    )}
                </Route>
                <Route path="/product/tax/new">
                    {({ history, match }) => (
                        <DialogNewTax
                            show={match != null}
                            onHide={() => history.push('/product/tax')}
                            intl={intl}
                        />
                    )}
                </Route>
                <TopHeader title={intl.formatMessage({ id: 'TAX.TITLE' })}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            history.push('/product/tax/new');
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
                            <TopFilter
                                onSearchSubmit={handleSubmitSearch}
                                intl={intl}
                            />
                            <OtherTable
                                columns={columns}
                                rows={taxList}
                                onDelete={handleDeleteRow}
                                onViewEdit={handleViewEditRow}
                            />
                        </CardBody>
                    </Card>
                </div>
            </>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductTaxPage));
