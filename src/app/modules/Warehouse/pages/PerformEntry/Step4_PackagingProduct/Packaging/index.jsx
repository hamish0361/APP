import React from 'react';

import ParentBox from '../ParentBox';
import ChildrenBoxes from '../ChildrenBoxes';

import './index.scss';

const Packaging = () => {
    return (
        <div className="packaging">
            <div className="row">
                <div className="col-lg-6 col-sm-12"><ChildrenBoxes /></div>
                <div className="col-lg-6 col-sm-12"><ParentBox /></div>
            </div>
        </div>
    );
};

Packaging.propTypes = {
};

export default Packaging;