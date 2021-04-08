import React from 'react';
import { CircularProgress } from '@material-ui/core';

export function SplashScreen() {
    return (
        <>
            <div className="splash-screen">
                <div>TOMONI VN</div>
                <CircularProgress className="splash-screen-spinner" />
            </div>
        </>
    );
}
