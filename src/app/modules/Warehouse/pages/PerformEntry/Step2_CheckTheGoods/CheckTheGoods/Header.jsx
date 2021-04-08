import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { toAbsoluteUrl } from '_metronic/_helpers';

import { Card, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import { Button } from 'react-bootstrap';
import SelectBox from '../../../../components/SelectBox';
import SVG from 'react-inlinesvg';

import "./Header.scss";
import useTrans from 'helper/useTrans';

const Header = props => {
    const history = useHistory();
    const match = useRouteMatch();
    const [trans] = useTrans();

    const handleGoNext = () => {
        history.push(`/warehouse/inbound/step-3/${match?.params?.sfa_id}`)
    }

    const goBack = () => {
        history.goBack();
    }

    const handleBoxChange = (option) => {
        if(!option) return;
        
        history.push(`/warehouse/inbound/step-2/${match?.params?.sfa_id}/${option.value}`);
    }

    return (
        <Card className="check-box-item-header">
            <CardHeader title={(
                <div>
                    <Button variant="link" onClick={goBack}>
                        <SVG src={toAbsoluteUrl(
                            '/media/svg/icons/Navigation/Arrow-left.svg'
                        )} />
                    </Button>
                    {trans("MENU.WAREHOUSE.CHECKING_GOODS")}
                </div>
            )}>
                <CardHeaderToolbar>
                    <div className="d-flex w-100 align-items-center">
                        <SelectBox onChange={handleBoxChange} />
                        <Button variant="success" onClick={handleGoNext} className="ml-3 btn-large">{trans("warehouse.header.next")}</Button>
                    </div>
                </CardHeaderToolbar>
            </CardHeader>
        </Card>
    );
};

Header.propTypes = {

};

export default Header;