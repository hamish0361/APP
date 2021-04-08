import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Prompt } from 'react-router-dom';
import { Card, CardBody } from '_metronic/_partials/controls';
import './styles.scss';
import { useDropzone } from 'react-dropzone';

NewForm.propTypes = {
    onSearchProduct: PropTypes.func,
    onSearchCustomer: PropTypes.func,
    onSelectProduct: PropTypes.func,
    onSearchSupplier: PropTypes.func,
    onSubmitNew: PropTypes.func,
    isSuccessNew: PropTypes.bool
};

function NewForm({
    onSearchProduct = null,
    onSearchCustomer = null,
    onSearchSupplier = null,
    onSubmitNew = null,
    btnRef,
    onSelectProduct = null,
    isSuccessNew,
    intl
}) {
    const [fileOrder, setFileOrder] = useState();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: files => setFileOrder(files)
    });

    const files = acceptedFiles.map(file => (
        <h4 key={file.path} style={{ marginLeft: '1rem' }}>
            {file.path}
        </h4>
    ));

    return (
        <>
            <div className="col-xl-12">
                <Card>
                    <CardBody>
                        <div className="form-group row  align-items-center">
                            <div className="col-md-6">
                                <h4 className=" text-dark font-weight-bold mb-2">
                                    <FormattedMessage id="ORDER.PAYMENT.FILE.INFO" />
                                </h4>
                            </div>
                            <div className="col-md-6"></div>
                        </div>
                        <Divider className="mb-9" />
                        <div className="rsg--preview-60">
                            <section className="container">
                                <div
                                    {...getRootProps({
                                        className: 'dropzone'
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <p>
                                        Drag drop files here or click to select
                                        files
                                    </p>
                                </div>
                                <aside>
                                    <div className="row">
                                        <h4>Files: </h4> {files}
                                    </div>
                                </aside>
                            </section>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Prompt
                message={intl.formatMessage({
                    id: 'GLOBAL.MESSAGE.FILLED_OUT'
                })}
            />
        </>
    );
}

export default NewForm;
