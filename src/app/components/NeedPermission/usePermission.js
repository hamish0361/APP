import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

export default function usePermission(need, permissionJoin = 'or') {
    const permissions = useSelector(
        state => state.authService.permission.permissionList
    );

    // console.log(permissions, 'permissions')

    const isEnoughPermission = useMemo(() => {
        if (!need) return true;

        /** Chuẩn hoá dữ liệu cho need */
        let localNeed = need;
        if (typeof localNeed === 'string') localNeed = [localNeed];

        /** Kiểm tra cho trường permissionJoin
         * -- or -- chỉ cẩn có 1 trong các quyền được liệt kê là ok
         * -- and -- cần có đủ tất cả các quyền được liệt kê thì mới được see child
         */

        let result = false;

        localNeed.every(n => {
            if (_.find(permissions, ['id', n]) !== undefined) {
                result = true;

                return permissionJoin === 'and';
            } else {
                result = false;

                return permissionJoin === 'or';
            }
        });

        return result;
    }, [need, permissionJoin, permissions]);

    return isEnoughPermission;
}
