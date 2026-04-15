const KEY_PREFIX = 'rating_';

export interface StarRatingStore {
    set(movieId: number, rating: string): void;
    get(movieId: number): string;
}

export const starRatingStorage = {
    set(movieId: number, rating: string): void {
        localStorage.setItem(`${KEY_PREFIX}${movieId}`, rating);
    },

    get(movieId: number): string {
        return localStorage.getItem(`${KEY_PREFIX}${movieId}`) ?? '0';
    },
};
