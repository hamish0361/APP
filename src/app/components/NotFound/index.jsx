import React from 'react';

import {
    Card,
    CardBody,
} from '_metronic/_partials/controls';

import './index.scss';

const NotFound = props => {
    return (
        <Card className="not-found">
            <CardBody>
                <div className="not-found-text">No - content - founded</div>
            </CardBody>
        </Card>
    );
};

NotFound.propTypes = {
    
};

export default NotFound;