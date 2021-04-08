import { dialog } from 'app/components/DialogNotify';
import Loading from 'app/components/Loading';
import TrackingTable from '../../components/TrackingTable';
import TopHeader from 'app/modules/Order/components/TopHeader';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import {
    createTracking,
    fetchTracking,
    resetTrackings
} from '../../redux/trackingSlice';
import DialogDelete from './DialogDelete';
import DialogNew from './DialogNew';
import TopFilter from './TopFilter';
import { FormattedMessage, injectIntl } from 'react-intl';

function TrackingPage({ intl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const tracking = useSelector(state => state.purchase.tracking);
    const { trackingList, pagination, isLoading } = tracking;
    const [params, setParams] = useState({
        page: 1,
        search: '',
        searchFields: ''
    });

    const columns = [
        {
            id: 'id',
            title: intl.formatMessage({ id: 'TRACKING.CODE_TRACKING' })
        },
        {
            id: 'checked',
            title: intl.formatMessage({ id: 'TRACKING.STATUS' })
        }
    ];

    useEffect(() => {
        dispatch(resetTrackings());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(fetchTracking(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handlePageChange = newPage => {
        setParams({
            ...params,
            page: newPage
        });
    };

    const handleDeleteRow = id => {
        history.push(`/mua-hang/tracking/${id}/xoa`);
    };

    const handleViewEditRow = id => {
        history.push(`/mua-hang/tracking/${id}/chi-tiet`);
    };

    const handleSubmitSearch = ({ search, searchFields }) => {
        setParams({
            ...params,
            search,
            searchFields
        });
    };

    const rows = trackingList.map(tracking => {
        return {
            id: tracking.id || '-',
            checked: (
                <span
                    className={`label font-weight-bold label-lg label-inline mr-2 ${
                        tracking.checked
                            ? 'label-light-success'
                            : 'label-light-danger'
                    }`}
                >
                    {tracking.checked
                        ? `${intl.formatMessage({ id: 'TRACKING.IN_STOCK' })}`
                        : `${intl.formatMessage({ id: 'TRACKING.OUT_STOCK' })}`}
                </span>
            )
        };
    });

    // new
    const [open, setOpen] = useState(false);

    //create tracking by pick machine
    const handleNew = code => {
        const params = {
            id: code.tracking
        };
        setOpen(false);
        dispatch(createTracking(params)).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    intl.formatMessage({ id: 'TRACKING.CREATE.SUCCESS' })
                );
                dispatch(fetchTracking());
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'TRACKING.CREATE.FAIL' })
                );
            }
        });
    };
    //create tracking by API
    const handleNewTracking = () => {
        dispatch(createTracking()).then(res => {
            if (res.type.includes('fulfilled')) {
                dialog.success(
                    `${intl.formatMessage({
                        id: 'TRACKING.BUTTON.SUCCESSFUL'
                    })} ${res?.payload?.id} ${intl.formatMessage({
                        id: 'TRACKING.SUCCESSFUL'
                    })}`
                );
                dispatch(fetchTracking());
            } else {
                dialog.error(
                    intl.formatMessage({ id: 'TRACKING.CREATE.FAIL' })
                );
            }
        });
    };
    return (
        <>
            {isLoading && <Loading />}
            <Route path="/mua-hang/tracking/:id/xoa">
                {({ history, match }) => (
                    <DialogDelete
                        intl={intl}
                        id={match && match.params.id}
                        show={match != null}
                        onHide={() => history.push('/mua-hang/tracking')}
                    />
                )}
            </Route>
            <TopHeader
                title={intl.formatMessage({ id: 'ORDER.TRACKING_LIST' })}
            >
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <FormattedMessage id="TRACKING.BUTTON.CREATE_INPUT" />
                </button>
                <button
                    type="button"
                    className="btn btn-primary ml-2"
                    onClick={handleNewTracking}
                >
                    <FormattedMessage id="TRACKING.BUTTON.CREATE_FAST" />
                </button>
            </TopHeader>
            <div className="px-8 pb-8">
                <Card>
                    <CardBody>
                        <TopFilter onSearch={handleSubmitSearch} intl={intl} />
                        <TrackingTable
                            columns={columns}
                            rows={rows}
                            page={params.page}
                            lastpage={pagination.lastPage}
                            onDelete={handleDeleteRow}
                            onViewEdit={handleViewEditRow}
                            onPageChange={handlePageChange}
                        />
                    </CardBody>
                </Card>
            </div>

            <DialogNew
                intl={intl}
                show={open}
                onHide={() => setOpen(false)}
                onNew={handleNew}
            />
        </>
    );
}

export default injectIntl(connect(null, null)(TrackingPage));
