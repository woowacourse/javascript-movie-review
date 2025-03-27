import { LOCAL_STORAGE_KEYS } from './constant';

export type LocalStorageKeyType = keyof typeof LOCAL_STORAGE_KEYS;
export type LocalStorageMovieRateValueType = Record<string, number>;
