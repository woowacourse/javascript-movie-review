const key = 'userMovieVoteValues';

const getUserMovieVoteValues = (): {} => {
  return JSON.parse(localStorage.getItem(key) ?? '{}');
};

const getUserMovieVoteValue = (id: number): number => {
  return JSON.parse(localStorage.getItem('userMovieVoteValues') ?? '{}')[id];
};

const setUserMovieVoteValues = (id: number, starRate: number) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      ...getUserMovieVoteValues(),
      [id]: starRate,
    }),
  );
};

export { getUserMovieVoteValues, getUserMovieVoteValue, setUserMovieVoteValues };
