import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar
} from '_metronic/_partials/controls';

CustomCard.propTypes = {
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    isEdit: PropTypes.bool,
    isAction: PropTypes.bool,
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

function CustomCard({
    isEdit = true,
    onEdit,
    onSave,
    onCancel,
    children,
    isAction = true,
    title = ''
}) {
    return (
        <>
            <Card>
                <CardHeader title={title}>
                    {isAction ? (
                        <CardHeaderToolbar>
                            {!isEdit ? (
                                <Button
                                    style={{ width: '100px' }}
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={onEdit}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        style={{ width: '100px' }}
                                        type="button"
                                        className="btn btn-light"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        style={{ width: '100px' }}
                                        type="button"
                                        className="btn btn-primary ml-2"
                                        onClick={onSave}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </CardHeaderToolbar>
                    ) : null}
                </CardHeader>
                <CardBody>{children}</CardBody>
            </Card>
        </>
    );
}

export default CustomCard;
