import { createStorage } from "../../utils/createStorage";

const movieRatingStorage =
  createStorage<Record<"id" | "rate", number>[]>("userRating");

export const movieRatingService = {
  getAllRatings() {
    return movieRatingStorage.get();
  },

  getRatingById(id: number) {
    const items = movieRatingStorage.get();
    return items.find((item) => item.id === id)?.rate ?? 0;
  },

  updateRatingById({ id, rate }: { id: number; rate: number }) {
    const items = movieRatingStorage.get();
    const existingRating = items.find((item) => item.id === id);

    if (existingRating) {
      existingRating.rate = rate;
    } else {
      items.push({ id, rate });
    }
    movieRatingStorage.set(items);
  },
};
