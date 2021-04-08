import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { boxAction } from 'app/modules/Warehouse/warehouse-redux/boxSlice';
import useF5SFA from './hooks/useF5SFA';

import Header from './Header';
import PerformStep from '../PerformStep';
import NotFound from 'app/components/NotFound';
import Loading from 'app/components/Loading';
import ListBox from 'app/modules/Warehouse/components/List/ListBox';
import Packaging from './Packaging';

import './index.scss';

const PackagingProduct = props => {

    const { data: sfa, loading } = useSelector(state => state.warehouse.sfa.detail);
    const dispatch = useDispatch();
    const params = useParams();
    const f5SFAData = useF5SFA();

    useEffect(() => {
        dispatch(boxAction.setBoxDetailData(undefined));

        if (params?.sfa_id) f5SFAData();
    }, [params?.sfa_id]); // eslint-disable-line

    if (!sfa && !loading) return <NotFound />

    return (
        <>
            <PerformStep />
            <div className="packaging-product position-relative">
                {loading && <Loading local />}
                <div className="row">
                    <div className="col-lg-9 col-md-12 col-sm-12">
                        <Header />
                        <Packaging />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 ipad-hidden">
                        <ListBox
                            showTotalItems
                            showQuantity={(b) => b.duplicate}
                            showRelative
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

PackagingProduct.propTypes = {

};

export default PackagingProduct;