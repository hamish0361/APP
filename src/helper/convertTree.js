export const convertTree = data => {
    return data.map((item, index) => {
        const result = {
            title: item.name,
            value: item.id,
            key: item.id
        };

        // if (item.full_childs.length > 0) {
        //     result.children = convertTree(item.full_childs);
        // }

        return result;
    });
};
