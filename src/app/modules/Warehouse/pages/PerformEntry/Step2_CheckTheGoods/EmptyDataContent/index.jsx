import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody } from '_metronic/_partials/controls';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const EmptyDataContent = ({ focusModalCreateBox }) => {

    const [trans] = useTrans();

    return (
        <Card className="step-2__empty-content">
            <CardBody>
                <div className="empty-text">{trans("warehouse.sku.empty")}</div>

                <div className="empty-actions">
                    <NeedPermission need={"boxes.create"}>
                        <button type="button" className="btn btn-outline-primary" onClick={focusModalCreateBox}>{trans("warehouse.sku.create.title")}</button>
                    </NeedPermission>
                </div>
            </CardBody>
        </Card>
    );
};

EmptyDataContent.propTypes = {
    focusModalCreateBox: PropTypes.func
};

export default EmptyDataContent;