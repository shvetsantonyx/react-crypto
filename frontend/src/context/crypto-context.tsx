import { createContext, useState, useEffect, useContext } from 'react';
import { CryptoResultType, fakeFetchAssets, fakeFetchCrypto } from '../api';
import { percentDifference } from '../utils';
import { Asset } from '../api';
import { ReactElement } from 'react';

type CryptoContextType = {
    assets: Assets[];
    crypto: CryptoResultType[];
    loading: boolean;
    addAsset: (newAsset: Asset) => void;
};

interface Assets extends Asset {
    grow: boolean;
    growPercent: number;
    totalAmount: number;
    totalProfit: number;
    name: string;
}

export const CryptoContext = createContext<CryptoContextType>({
    assets: [],
    crypto: [],
    loading: false,
    addAsset: () => {},
});

export function CryptoContextProvider({
    children,
}: {
    children: ReactElement;
}) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState<CryptoResultType[]>([]);
    const [assets, setAssets] = useState<Assets[]>([]);

    function mapAssets(assets: Asset[], result: CryptoResultType[]): Assets[] {
        return assets.map((asset) => {
            const coin = result.find((c) => c.id === asset.id);
            return {
                grow: coin?.price ? asset.price < coin.price : false,
                growPercent: coin?.price
                    ? percentDifference(asset.price, coin.price)
                    : asset.price,
                totalAmount: coin?.price ? asset.amount * coin.price : 0,
                totalProfit: coin?.price
                    ? asset.amount * coin.price - asset.amount * asset.price
                    : 0,
                name: coin?.name ? coin.name : '',
                ...asset,
            };
        });
    }

    useEffect(() => {
        async function preload() {
            setLoading(true);
            const { result } = await fakeFetchCrypto();
            const assets = await fakeFetchAssets();

            setCrypto(result);
            setAssets(mapAssets(assets, result));
            setLoading(false);
        }
        preload();
    }, []);

    function addAsset(newAsset: Asset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto));
    }

    return (
        <CryptoContext.Provider value={{ assets, crypto, loading, addAsset }}>
            {children}
        </CryptoContext.Provider>
    );
}

export function useCrypto() {
    return useContext(CryptoContext);
}
