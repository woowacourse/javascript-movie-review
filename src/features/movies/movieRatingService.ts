import { createStorage } from "../../utils/createStorage";

const ratingStorage =
  createStorage<Record<"id" | "rate", number>[]>("userRating");

export const movieRatingService = {
  getAllRatings() {
    return ratingStorage.get();
  },

  getRatingById(id: number) {
    const items = ratingStorage.get();
    return items.find((item) => item.id === id)?.rate ?? 0;
  },

  updateRatingById({ id, rate }: { id: number; rate: number }) {
    const items = ratingStorage.get();
    const existingRating = items.find((item) => item.id === id);

    if (existingRating) {
      existingRating.rate = rate;
    } else {
      items.push({ id, rate });
    }
    ratingStorage.set(items);
  },
};
