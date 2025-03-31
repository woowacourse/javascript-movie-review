export const movieRatingStorage = (id: number, rating?: number) => {
  console.log("alkfjslf", id, rating);
  const storedRatings = JSON.parse(
    localStorage.getItem("my-movie-rating") || "[]"
  );

  if (typeof rating === "undefined") {
    return storedRatings.find((item: any) => item.id === id)?.rating || 0;
  }

  console.log("???");

  const index = storedRatings.findIndex((item: any) => item.id === id);
  if (index !== -1) {
    storedRatings[index].rating = rating;
  } else {
    storedRatings.push({ id, rating });
  }

  console.log("으음", storedRatings);

  localStorage.setItem("my-movie-rating", JSON.stringify(storedRatings));
};
