import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { toAbsoluteUrl } from '_metronic/_helpers';

import { Card, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import { Button } from 'react-bootstrap';
import SVG from 'react-inlinesvg';

const Header = props => {
    const history = useHistory();
    const match = useRouteMatch();

    const handleGoNext = () => {
        history.push(`/warehouse/inbound/step-4/${match?.params?.sfa_id}`)
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <Card>
            <CardHeader title={(
                <div>
                    <Button variant="link" onClick={goBack}>
                        <SVG src={toAbsoluteUrl(
                            '/media/svg/icons/Navigation/Arrow-left.svg'
                        )} />
                    </Button>
                        Lưu hàng
                </div>
            )}>
                <CardHeaderToolbar>
                    <Button variant="success" onClick={handleGoNext} className="ml-3 btn-large">Tiếp theo</Button>
                </CardHeaderToolbar>
            </CardHeader>
        </Card>
    );
};

Header.propTypes = {

};

export default Header;