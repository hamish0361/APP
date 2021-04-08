import React from 'react';
import useTrans from 'helper/useTrans';

const NotHavePermission = props => {

    const [trans] = useTrans();

    return (
        <span>
            {trans("common.not_have_permission")}
        </span>
    );
};

NotHavePermission.propTypes = {
    
};

export default NotHavePermission;