import _ from 'lodash';

function formatNumber(number, options) {

    if (typeof number !== 'number') return 0;

    let numberPipeOptions = number;

    if (options?.round) numberPipeOptions = _.round(numberPipeOptions, options?.round);

    return new Intl.NumberFormat().format(numberPipeOptions);
}

export default formatNumber;