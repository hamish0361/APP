import React from 'react';

import Layout from 'app/modules/Warehouse/components/Layout';
import TargetSection from './TargetSection';
import ProcessSection from './ProcessSection';
import ContainerStatus from './ContainerStatus';
import useTrans from 'helper/useTrans';

const LoadUpContainer = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("warehouse.load_up_container.title")}>
            <div className="load-up-container">
                <ContainerStatus />
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <TargetSection />
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <ProcessSection />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

LoadUpContainer.propTypes = {

};

export default LoadUpContainer;