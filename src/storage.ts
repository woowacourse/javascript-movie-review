export interface StorageInterface {
  getMyRating(key: string): number;
  setMyRating(key: string, rating: string): void;
}

export class Storage implements StorageInterface {
  getMyRating(key: string) {
    return Number(localStorage.getItem(key));
  }

  setMyRating(key: string, rating: string) {
    localStorage.setItem(key, rating);
  }
}
