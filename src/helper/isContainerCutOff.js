import moment from 'moment';

export default function isContainerCutOff(container) {
    if(!container?.cut_off_date) return false;

    return moment(container.cut_off_date, 'DD-MM-YYYY').isSameOrBefore(moment(), 'day');
}