import OtherTable from '../../components/OtherTable';
import Loading from 'app/components/Loading';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import { fetchOrigin } from '../../product-redux/originSlice';
import DialogDeleteOrigin from './DialogDeleteOrigin';
import DialogNewOrigin from './DialogNewOrigin';
import TopFilter from './TopFilter';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { injectIntl } from 'react-intl';

ProductOriginPage.propTypes = {};

function ProductOriginPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const origin = useSelector(state => state.product.origin);
    const { originList, isLoading } = origin;

    const [params, setParams] = useState({
        search: '',
        searchFields: ''
    });

    useEffect(() => {
        dispatch(fetchOrigin(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleDeleteRow = id => {
        history.push(`/product/origin/${id}/delete`);
    };

    const handleViewEditRow = id => {
        history.push(`/product/origin/${id}/detail`);
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
                id: 'ORIGIN.TYPE.ID'
            })}`
        },
        {
            id: 'name',
            title: `${intl.formatMessage({
                id: 'ORIGIN.TYPE.NAME'
            })}`
        }
    ];
    return (
        <>
            {isLoading && <Loading />}
            <Route path="/product/origin/:id/delete">
                {({ history, match }) => (
                    <DialogDeleteOrigin
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() => history.push('/product/origin')}
                        intl={intl}
                    />
                )}
            </Route>
            <Route path="/product/origin/new">
                {({ history, match }) => (
                    <DialogNewOrigin
                        show={match != null}
                        onHide={() => history.push('/product/origin')}
                        intl={intl}
                    />
                )}
            </Route>
            <TopHeader
                title={intl.formatMessage({
                    id: 'ORIGIN.TITLE'
                })}
            >
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        history.push('/product/origin/new');
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
                            rows={originList}
                            onDelete={handleDeleteRow}
                            onViewEdit={handleViewEditRow}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(ProductOriginPage));
