import useTrans from 'helper/useTrans';
import React from 'react';
import Layout from '../../components/Layout';
import ProcessSection from './ProcessSection';
import TargetSection from './TargetSection';

const OutBoundPicker = props => {

    const [trans] = useTrans();

    return (
        <Layout title={trans("MENU.WAREHOUSE.OUTBOUND_PICKER")}>
            <div className="outbound-picker">
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

OutBoundPicker.propTypes = {
    
};

export default OutBoundPicker;