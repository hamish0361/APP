export default function merge2Objects(defaultParams, params) {

    let result = {
        ...defaultParams,
        ...params
    };

    Object.entries(params).forEach(([k, v]) => {
        if (defaultParams[k]) result[k] = `${defaultParams[k]};${v}`
    });

    return result;
}