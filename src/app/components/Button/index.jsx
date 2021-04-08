import React, { useMemo } from 'react';

import clsx from 'clsx';
import usePermission from '../NeedPermission/usePermission';

const TMNButton = ({
    type = "secondary",
    loading = false,
    htmlType = "button",
    disabled = false,
    className = "",
    children,
    need, 
    permissionJoin = 'or',
    ...props
}, ref) => {

    const isActiveByPermission = usePermission(need, permissionJoin);

    const getLoadingClassName = useMemo(() => {
        if (!loading) return '';

        if (type === 'light-success') return "spinner spinner-darker-success spinner-left";
        if (type === 'secondary') return "spinner spinner-dark spinner-left";
        if (type === 'outline-danger') return "spinner spinner-darker-danger spinner-left";

        return "spinner spinner-white spinner-left";

    }, [type, loading]);

    return (
        <button
            ref={ref}
            type={htmlType}
            className={clsx(`btn btn-${type}`, className, getLoadingClassName)}
            disabled={disabled || loading || !isActiveByPermission}
            {...props}
        >
            {children}
        </button>
    );
};

export default React.forwardRef(TMNButton);