import transactionApi from './transactionApi';
import cardApi from './cardApi';
import receiptApi from './receiptApi';
import userCurrencyApi from './userCurrencyApi';
import bankApi from './bankApi';

const accountingApi = {
    transaction: transactionApi,
    card: cardApi,
    receipt: receiptApi,
    userCurrency: userCurrencyApi,
    bank: bankApi
};

export default accountingApi;
