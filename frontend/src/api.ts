import { cryptoAssets, cryptoData } from './data';
import { Crypto, Asset } from './types';

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
