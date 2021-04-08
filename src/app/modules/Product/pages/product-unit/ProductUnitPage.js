import OtherTable from '../../components/OtherTable';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import { fetchUnit } from '../../product-redux/unitSlice';
import DialogNewUnit from './DialogNewUnit';
import DialogDeleteUnit from './DialogDeleteUnit';
import Loading from 'app/components/Loading';
import TopFilter from './TopFilter';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { injectIntl } from 'react-intl';

ProductUnitPage.propTypes = {};

function ProductUnitPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const units = useSelector(state => state.product.unit);
    const { unitList, loading } = units;

    const [params, setParams] = useState({
        search: '',
        searchFields: ''
    });

    useEffect(() => {
        dispatch(fetchUnit(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleDeleteRow = id => {
        history.push(`/product/unit/${id}/delete`);
    };

    const handleViewEditRow = id => {
        history.push(`/product/unit/${id}/detail`);
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
                id: 'UNIT.TOPFILTER.ID'
            })}`
        },
        {
            id: 'name',
            title: `${intl.formatMessage({
                id: 'UNIT.TOPFILTER.NAME'
            })}`
        }
    ];

    return (
        <>
            {loading && <Loading />}
            <>
                <Route path="/product/unit/:id/delete">
                    {({ history, match }) => (
                        <DialogDeleteUnit
                            id={match && match.params.id}
                            show={match != null}
                            onHide={() => history.push('/product/unit')}
                            intl={intl}
                        />
                    )}
                </Route>
                <Route path="/product/unit/new">
                    {({ history, match }) => (
                        <DialogNewUnit
                            show={match != null}
                            onHide={() => history.push('/product/unit')}
                            intl={intl}
                        />
                    )}
                </Route>
                <TopHeader
                    title={intl.formatMessage({
                        id: 'PRODUCT.DETAIL.UNIT.TITLE'
                    })}
                >
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            history.push('/product/unit/new');
                        }}
                    >
                        {intl.formatMessage({
                            id: 'GLOBAL.BUTTON.CREATE_ORDER'
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
                                rows={unitList}
                                onDelete={handleDeleteRow}
                                onViewEdit={handleViewEditRow}
                                intl={intl}
                            />
                        </CardBody>
                    </Card>
                </div>
            </>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductUnitPage));
