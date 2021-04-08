export const checkNumber = value => {
    const reg = /^[0-9]*$/;
    return reg.test(value);
};
