import { useEffect, useRef } from 'react';

const useClickOutside = (elRef, callback) => {
    const callbackRef = useRef();

    callbackRef.current = callback;

    useEffect(() => {
        const handleOutClick = (e) => {
            if (!elRef?.current?.contains(e.target) && callbackRef.current) {
                callbackRef.current(e);
            }
        };

        document.addEventListener('click', handleOutClick, true);

        return () => {
            document.removeEventListener('click', handleOutClick, true);
        };
    }, [callbackRef, elRef]);
};

export default useClickOutside;
