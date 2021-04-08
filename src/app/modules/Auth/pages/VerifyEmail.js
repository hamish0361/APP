import authApi from 'apis/auth/authApi';
import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
function VerifyEmail() {
    const handleVerifyEmail = () => {
        const data = {
            expires: 1599314326,
            signature:
                '61873e0c31f8693d9976769cfcfbb1d4d3bde3a1fecdb1f19506009078741bf5'
        };

        authApi
            .verifyEmail({
                id: 'thanhson',
                params: data
            })
            .then(res => {});
    };

    return (
        <Card>
            <CardBody>
                <h2 class="card-title font-weight-bolder text-dark mb-4">
                    Verify your email
                </h2>
                <div className="mb-2">
                    <span className="text-muted font-weight-bold font-size-sm my-1">
                        Click the button bellow to verify your email .
                    </span>
                </div>
                <button
                    type="button"
                    className="btn btn-primary font-weight-bold px-9 py-4 my-3 w-100"
                    onClick={handleVerifyEmail}
                >
                    Verify Email
                </button>
            </CardBody>
        </Card>
    );
}

export default VerifyEmail;
