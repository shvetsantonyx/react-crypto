import { cryptoAssets, cryptoData } from './data';

export type CryptoResultType = {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    volume: number;
    marketCap: number;
    availableSupply: number;
    totalSupply: number;
    priceChange1h: number;
    priceChange1d: number;
    priceChange1w: number;
    redditUrl: string;
    websiteUrl: string;
    twitterUrl: string;
    explorers: string[];
    contractAddress?: string;
};

export type Crypto = {
    result: CryptoResultType[];
    meta: {};
};

export type Asset = {
    id: string;
    amount: number;
    price: number;
    date: Date;
};

export function fakeFetchCrypto(): Promise<Crypto> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData);
        }, 1);
    });
}

export function fakeFetchAssets(): Promise<Asset[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 1);
    });
}
