import React from 'react';
import TopHeader from './TopHeader';

import './index.scss';

const Layout = ({ title, toolbar, children }) => {
    return (
        <div className="warehouse-layout">
            <TopHeader title={title} toolbar={toolbar} />

            <div className="px-5 pb-5">
                {children}
            </div>
        </div>
    );
};

Layout.propTypes = {

};

export default Layout;