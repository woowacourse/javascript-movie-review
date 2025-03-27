const getRatings = (movieId: number) => {
  const existingData = JSON.parse(localStorage.getItem("ratings") || "") || [];

  return (
    existingData.find(
      (item: { movieId: number; score: number }) => item.movieId === movieId
    )?.score || 0
  );
};

export default getRatings;
