import React from 'react';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import FilterSection from './FilterSection';
import ShelveItem from '../../components/Model/ShelveItem';
import Loading from 'app/components/Loading';
import { CardBody, Card } from '_metronic/_partials/controls';
import { DetailPalletProvider } from '../../components/Model/context';

import './index.scss';

const WarehouseModel = props => {

    const shelveList = useSelector(state => state.warehouse.whModel.shelves);
    const loading = useSelector(state => state.warehouse.whModel.loading);

    return (
        <Layout title="Mô hình nhà kho Tomoni">
            <div className="warehouse-model-page overflow-hidden">
                <FilterSection />

                <Card className="area-list-section position-relative">
                    <CardBody className="p-4">
                        {loading && <Loading local />}
                        {shelveList.map((shelve, sIdx) => (
                            <div className="mt-3" key={`shelve-${sIdx}`}>
                                <DetailPalletProvider>
                                    <ShelveItem shelve={shelve} areaName={shelve.areaName} />
                                </DetailPalletProvider>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </Layout>
    );
};

WarehouseModel.propTypes = {

};

export default WarehouseModel;