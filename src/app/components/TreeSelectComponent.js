import { convertTree } from 'helper/convertTree';
import _ from 'lodash';
import TreeSelect from 'rc-tree-select';
import React, { useEffect, useState } from 'react';

function TreeSelectComponent({
    treeData,
    valTreeData,
    handleSelect,
    type,
    placeholder
}) {
    const [valTreeDataSelect, setValTreeDataSelect] = useState([]);

    const handleSelecOption = value => {
        setValTreeDataSelect(value);
        handleSelect(value);
    };

    const handleSelectCheckbox = (value, label, extra) => {
        const body = {
            action: extra.checked ? 'attach' : 'detach',
            value: [extra.triggerValue]
        };

        handleSelect(body);

        setValTreeDataSelect(value);
    };

    const uniquePermission = permissions => {
        if (permissions.length > 0) {
            const checkParentId = Object.keys(permissions[0]).some(
                item => item === 'parent_id'
            );
            if (!checkParentId) {
                return permissions;
            }
        }

        return permissions.filter(permission => permission.parent_id === null);
    };

    useEffect(() => {
        let idsPermission = [];
        if (valTreeData.length > 0) {
            idsPermission = _.cloneDeep(valTreeData).map(impersion => {
                return impersion.id;
            });
        }
        setValTreeDataSelect(idsPermission);
    }, [valTreeData]);
    return (
        <>
            <TreeSelect
                treeData={convertTree(uniquePermission(_.cloneDeep(treeData)))}
                value={valTreeDataSelect}
                transitionName="rc-tree-select-dropdown-slide-up"
                dropdownPopupAlign={{ overflow: { adjustY: 0, adjustX: 0 } }}
                style={{ width: '100%' }}
                dropdownStyle={{
                    maxHeight: 300,
                    overflow: 'auto',
                    zIndex: 1500
                }}
                treeCheckable={type === 'checkbox'}
                onChange={
                    type === 'select' ? handleSelecOption : handleSelectCheckbox
                }
                treeNodeFilterProp="title"
                placeholder={placeholder}
            />
        </>
    );
}

export default React.memo(TreeSelectComponent);
