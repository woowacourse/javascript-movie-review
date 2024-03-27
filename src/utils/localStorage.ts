export const getMyVoteAverage = (movieId: number): 0 | 2 | 4 | 6 | 8 | 10 => {
  const myVoteAverages = localStorage.getItem("myVoteAverages");
  if (!myVoteAverages || myVoteAverages === "[]") {
    localStorage.setItem("myVoteAverages", `[]`);
    return 0;
  }

  return JSON.parse(myVoteAverages).filter((myVoteAverage: { movieId: number; voteAverage: number }) => movieId === myVoteAverage.movieId)[0]
    .voteAverage;
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
  console.log(newMyVoteAverages);
  localStorage.setItem("myVoteAverages", JSON.stringify([...newMyVoteAverages, { movieId, voteAverage }]));
};
