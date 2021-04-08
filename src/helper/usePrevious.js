import { useRef, useEffect } from 'react';

export default function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }); // eslint-disable-line
    return ref.current;
}