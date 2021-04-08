import React, { useCallback, useContext, useMemo, useState } from "react";

const initialContext = {
    pallet: undefined,
    showPallet: false,
    setShowPallet: () => null, 
    setPallet: () => null
}

const DetailPalletContext = React.createContext(initialContext);

export const DetailPalletProvider = ({ children }) => {
    const [pallet, setPallet] = useState();
    const [showPallet, setShowPallet] = useState(false);

    const values = useMemo(() => ({
        pallet,
        showPallet,
        setShowPallet,
        setPallet
    }), [pallet, showPallet, setPallet, setShowPallet]);

    return <DetailPalletContext.Provider value={values}>{children}</DetailPalletContext.Provider>
}

export const useDetailPallet = () => {
    const { pallet, showPallet, setShowPallet, setPallet } = useContext(DetailPalletContext);

    const togglePalletDetail = useCallback((data) => {
        setShowPallet(!showPallet);
        data && setPallet(data);
    }, [setPallet, showPallet, setShowPallet]);

    return { pallet, showPallet, togglePalletDetail };
}