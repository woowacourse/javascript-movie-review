class RatingStorage {
  #STORAGE_KEY = "movie-rating";

  #read(): Record<string, number> {
    const raw = localStorage.getItem(this.#STORAGE_KEY);
    try {
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  #write(data: Record<string, number>) {
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(data));
  }

  get(movieId: string): number {
    return this.#read()[movieId] ?? 0;
  }

  set(movieId: string, rating: number): void {
    const ratings = this.#read();
    ratings[movieId] = rating;
    this.#write(ratings);
  }

  has(movieId: string): boolean {
    return movieId in this.#read();
  }
}

const ratingStorage = new RatingStorage();
export default ratingStorage;
