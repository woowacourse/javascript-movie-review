export const storageService = (id: number, rating?: number) => {
  const storedRatings = JSON.parse(
    localStorage.getItem("my-movie-rating") || "[]"
  );

  if (typeof rating === "undefined") {
    return storedRatings.find((item: any) => item.id === id)?.rating || 0;
  }

  const index = storedRatings.findIndex((item: any) => item.id === id);
  if (index !== -1) {
    storedRatings[index].rating = rating;
  } else {
    storedRatings.push({ id, rating });
  }

  localStorage.setItem("my-movie-rating", JSON.stringify(storedRatings));
};
