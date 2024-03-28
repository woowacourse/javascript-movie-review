export const getMyVoteAverage = (movieId: number): 0 | 2 | 4 | 6 | 8 | 10 => {
  const myVoteAverages = JSON.parse(localStorage.getItem("myVoteAverages") || "[]");
  if (!myVoteAverages || !myVoteAverages.some((myVoteAverage: { movieId: number; voteAverage: number }) => myVoteAverage.movieId === movieId)) {
    localStorage.setItem("myVoteAverages", JSON.stringify([...myVoteAverages, { movieId, voteAverage: 0 }]));
    return 0;
  }

  return myVoteAverages.filter((myVoteAverage: { movieId: number; voteAverage: number }) => movieId === myVoteAverage.movieId)[0].voteAverage;
};

export const setMyVoteAverage = (movieId: number, voteAverage: number) => {
  const myVoteAverages = localStorage.getItem("myVoteAverages");

  if (!myVoteAverages) {
    localStorage.setItem("myVoteAverages", `[]`);
    return;
  }

  const newMyVoteAverages = JSON.parse(myVoteAverages);
  newMyVoteAverages.forEach((myVoteAverage: { movieId: number; voteAverage: number }) => {
    if (movieId === myVoteAverage.movieId) {
      myVoteAverage.voteAverage = voteAverage;
    }
  });
  localStorage.setItem("myVoteAverages", JSON.stringify(newMyVoteAverages));
};
