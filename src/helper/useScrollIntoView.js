import { useEffect } from 'react';

export default function useScrollIntoView(ele) {
    useEffect(() => {
        if(ele && ele?.current) ele.current.scrollIntoView({
            behavior: 'smooth',
        })
    }, []); // eslint-disable-line

    return [];
}
