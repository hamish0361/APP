import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';
import AddBoxToLadingBill from './AddBoxToLadingBill';
import TableBoxInLadingBill from './TableBoxInLadingBill';
import useTrans from 'helper/useTrans';
import NeedPermission from 'app/components/NeedPermission';

const LadingBillBox = ({ onRefresh }) => {
    const match = useRouteMatch();
    const history = useHistory();
    const [trans] = useTrans();

    return (
        <>
            <NeedPermission need={['box-lading-bills.create']}>
                <Route path={`${match.path}/add-box-to-lading-bill`}>
                    {({ match }) => (
                        <AddBoxToLadingBill
                            show={match !== null}
                            onSuccess={onRefresh}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="lading-bill-box">
                <CardHeader title={trans("warehouse.sku.pivot.lading_bill.title")}>
                    <NeedPermission need={['box-lading-bills.create']}>
                        <CardHeaderToolbar>
                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    history.push(
                                        `${match.url}/add-box-to-lading-bill`
                                    )
                                }
                            >
                                {trans("warehouse.sku.pivot.lading_bill.create.title")}
                            </button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody className="position-relative">
                    <TableBoxInLadingBill onRefresh={onRefresh} />
                </CardBody>
            </Card>
        </>
    );
};

LadingBillBox.propTypes = {};

export default LadingBillBox;
