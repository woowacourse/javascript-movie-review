export const setUserVotesToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUserVotesFromLocalStorage = () => {
  const userVote = localStorage.getItem('userVotes');
  return userVote ? JSON.parse(userVote) : [];
};

export const addUserVotesToLocalStorage = (voteData: IVoteData) => {
  const existingVoteData: IVoteData[] = JSON.parse(
    localStorage.getItem('userVotes') || '[]',
  );
  const existingVote = existingVoteData.find((data) => data.id === voteData.id);

  if (existingVote) {
    existingVote.score = voteData.score;
  } else {
    existingVoteData.push(voteData);
  }

  localStorage.setItem('userVotes', JSON.stringify(existingVoteData));
};
