import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

export const isPalletCode = (v) => v?.length && (v?.[0] === 'P');
export const isLocationCode = (v) => v?.length && (v?.[0] === 'L');
export const isSKUCode = (v) => {

    if (!v?.length) return false;

    return !isPalletCode(v) && !isLocationCode(v);
}

function isContentEditable(element) {
    if (typeof element.getAttribute !== 'function') {
        return false
    }

    return !!element.getAttribute('contenteditable')
}

/**
 * Kiểm tra xem 1 element có phải là 1 input hay không
 * @param {*} element 
 */
function isInput(element) {
    if (!element) {
        return false
    }

    const { tagName } = element
    const editable = isContentEditable(element)

    return tagName === 'INPUT' || tagName === 'TEXTAREA' || editable
}

/**
 * Hook lấy dữ liệu từ scanner
 * @param {*} param0 
 */
function useScanBarcode({
    condition = () => true,
    onEnter,
}) {
    var tempText = useRef('');
    const [barcode, setBarcode] = useState('');
    /** Mục đích chính của biến count này là để kick cho component rerender khi nhận được dữ liệu từ scanner */
    const [count, setCount] = useState(0);

    /** Lắng nghe sự kiện keypress, để nhận input từ máy scan barcode */
    useEffect(() => {
        document.addEventListener('keypress', handleReceiveCode);

        return () => {
            document.removeEventListener('keypress', handleReceiveCode);
        }
    });

    /** Xử lý sự kiện keypress */
    const handleReceiveCode = (e) => {
        if (isInput(e.target)) return; // Nếu user đang trỏ vào 1 input và nhập thì k xử lý đoạn này

        if (e.charCode === 13) {
            handleOnEnter(tempText.current, e);

            return;
        }

        tempText.current += e.key;
        debounceSetText(tempText.current);
    }

    /** Gom các ký tự được nhập lại, trước khi được enter */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSetText = useCallback(_.debounce((v) => {
        tempText.current = '';

        if (!condition(v)) return;

        setBarcode(v);
        setCount(count + 1);
    }, 100), [count, setBarcode]);

    /** Xử lý khi phím enter được nhấn (Kết thúc của quá trình nhập barcode) */
    const handleOnEnter = (v, e) => {
        if (!v?.length || !condition(v)) {
            return;
        }

        onEnter && onEnter(v, e);
    }

    return [barcode, count];
}

export { useScanBarcode };