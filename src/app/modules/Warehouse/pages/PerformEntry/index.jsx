import React from 'react';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';

import Step1CreateSFA from './Step1_CreateSFA';
import Step2CheckTheGoods from './Step2_CheckTheGoods';
import Step3StorageBox from './Step3_StorageBox';
import Step4PackagingProduct from './Step4_PackagingProduct';
import ModalConfirmStep2 from '../../components/PerformEntry/ModalConfirmStep2';

import './index.scss';

const PerformEntryPage = props => {
    const match = useRouteMatch();

    return (
        <div className="perform-entry-page p-5">
            <ModalConfirmStep2 />
            <Switch>
                <Redirect exact={true} from="/warehouse/inbound" to="/warehouse/inbound/step-1" />

                <Route path={`${match.path}/step-1`}>
                    <Step1CreateSFA />
                </Route>

                <Route path={`${match.path}/step-2/:sfa_id/:box_id?`}>
                    <Step2CheckTheGoods />
                </Route>

                <Route path={`${match.path}/step-3/:sfa_id`}>
                    <Step3StorageBox />
                </Route>

                <Route path={`${match.path}/step-4/:sfa_id`}>
                    <Step4PackagingProduct />
                </Route>
            </Switch>
        </div>
    );
};

PerformEntryPage.propTypes = {};

export default PerformEntryPage;
