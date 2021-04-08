import React from 'react';
import PropTypes from 'prop-types';
import usePermission from './usePermission';

/**
 * 
 * @param {*} children component được xử lý auth
 * @param {*} need permission id cần có để có thể sử dụng chức năng mà children đang thực thi
 * @param {*} fallback khi user hiện tại không có permission thì nó sẽ trả về fallback
 *  
 * @returns JSX.Element
 */

function NeedPermission({
    children, 
    need, 
    fallback,
    permissionJoin = 'or'
}) {

    const isEnoughPermission = usePermission(need, permissionJoin);

    if(!isEnoughPermission) {
        return fallback || <></>;
    }

    return children;
};

NeedPermission.propTypes = {
    children: PropTypes.any,
    need: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fallback: PropTypes.any,
    permissionJoin: PropTypes.string
};

export default NeedPermission;