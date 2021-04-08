import Loading from 'app/components/Loading';
import TopHeader from 'app/modules/Order/components/TopHeader';
import { fetchOrderStatus } from 'app/modules/Order/order-redux/orderStatusSlice';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';
import { Card, CardBody } from '_metronic/_partials/controls';
import { fetchPurchase, resetPurchase } from '../../redux/purchaseSlice';
import DivisionItem from './DivisionItem';
import TopFilter from './TopFilter';
import { Pagination } from '@material-ui/lab';

function DivisionGoods({ intl }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { purchases, pagination, isLoading } = useSelector(
        ({ purchase }) => ({
            purchases: purchase.list.purchaseList,
            isLoading: purchase.list.isLoading,
            pagination: purchase.list.pagination
        }),
        shallowEqual
    );

    const [searchParams, setSearchParams] = useState({
        page: 1,
        search: '',
        appends: 'supplier',
        with: 'items',
        searchFields: '',
        orderBy: 'created_at',
        sortedBy: 'desc'
    });

    useEffect(() => {
        dispatch(fetchPurchase(searchParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.page, searchParams.search]);

    const paramsStatus = {
        search: 'directors.type_id:Purchase'
    };

    useEffect(() => {
        dispatch(resetPurchase());
        dispatch(fetchOrderStatus(paramsStatus));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitSearch = ({ search, searchFields }) => {
        setSearchParams({
            ...searchParams,
            page: 1,
            search,
            searchFields
        });
    };

    const handlePageChange = (e, newPage) => {
        setSearchParams({
            ...searchParams,
            page: newPage
        });
    };

    const navigateDetail = id => {
        history.push(`/mua-hang/phan-hang/${id}`);
    };

    return (
        <>
            {isLoading && <Loading />}
            <TopHeader
                title={intl.formatMessage({ id: 'MENU.PURCHASE.DIVISION' })}
            >
                <Button
                    style={{ minWidth: '100px' }}
                    color="primary"
                    onClick={() => {
                        history.push('/mua-hang/don-mua-hang/tao-don');
                    }}
                >
                    <FormattedMessage id="GLOBAL.BUTTON.CREATE_ORDER" />
                </Button>
            </TopHeader>

            <div className="px-8 pb-8">
                <Card>
                    <CardBody>
                        <TopFilter intl={intl} onSearch={handleSubmitSearch} />
                        <Pagination
                            className="d-flex justify-content-end"
                            count={pagination?.lastPage || 1}
                            page={searchParams.page}
                            shape="rounded"
                            onChange={handlePageChange}
                        />
                    </CardBody>
                </Card>
                <div className="row">
                    {purchases?.map((purchase, index) => (
                        <div key={index} className="col-md-6">
                            <DivisionItem
                                purchase={purchase}
                                onClickDetail={navigateDetail}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default injectIntl(connect(null, null)(DivisionGoods));
