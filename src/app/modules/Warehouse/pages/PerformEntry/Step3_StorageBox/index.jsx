import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchSFA } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';

import StorageBox from './StorageBox';
import NotFound from 'app/components/NotFound';
import Header from './Header';
import PerformStep from '../PerformStep';

const StorageBoxPage = props => {

    const { data: sfa, loading } = useSelector(state => state.warehouse.sfa.detail);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (params?.sfa_id) {
            dispatch(fetchSFA({ id: params?.sfa_id, with: 'boxes;receipts' }))
        }
    }, [params?.sfa_id]); // eslint-disable-line

    if (!sfa && !loading) return <NotFound />

    return (
        <>
            <PerformStep />
            <div className="storage-box position-relative">
                <Header />
                <StorageBox />
            </div>
        </>
    );
};

StorageBoxPage.propTypes = {

};

export default StorageBoxPage;