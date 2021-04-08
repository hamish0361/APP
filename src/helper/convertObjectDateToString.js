import moment from 'moment';

const convertObjectDateToString = (obj, formater = 'YYYY-MM-DD') => {

    const result = {};

    Object.entries(obj).forEach(([key, value]) => {
        let tempV = value;
        if (value instanceof Date || value instanceof moment) tempV = moment(value).format(formater);

        result[key] = tempV;
    });

    return result;
}

export default convertObjectDateToString;