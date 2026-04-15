import { Storage } from './storageInterface';

const KEY_PREFIX = 'rating_';

export const starRatingStorage: Storage<number, string> = {
    set(movieId: number, rating: string): void {
        localStorage.setItem(`${KEY_PREFIX}${movieId}`, rating);
    },

    get(movieId: number): string {
        return localStorage.getItem(`${KEY_PREFIX}${movieId}`) ?? '0';
    },
};
