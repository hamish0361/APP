import { useIntl } from "react-intl";

export default function useTrans() {
    const intl = useIntl();

    const trans = (key, option) => {
        const descriptor = typeof key === 'string' ? { id: key } : key;

        return intl.formatMessage(descriptor, option);
    }

    return [trans];
}