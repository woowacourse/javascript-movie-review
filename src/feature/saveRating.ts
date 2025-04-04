const saveRating = (movieId: number, score: number) => {
  const existingData =
    JSON.parse(localStorage.getItem("ratings") || "[]") || [];

  const updatedData = existingData.filter(
    (item: { movieId: number; score: number }) => item.movieId !== movieId
  );
  updatedData.push({ movieId, score });

  localStorage.setItem("ratings", JSON.stringify(updatedData));
};

export default saveRating;
