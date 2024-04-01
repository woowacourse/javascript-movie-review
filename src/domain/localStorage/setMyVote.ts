import { MY_VOTES, MyVote } from "./myVote";

export function setMyVote(myVote: MyVote) {
  const myVotesJson = localStorage.getItem(MY_VOTES);
  if (myVotesJson === null) {
    localStorage.setItem(MY_VOTES, JSON.stringify([myVote]));
    return;
  }

  const myVotes = JSON.parse(myVotesJson);
  if (!(myVotes instanceof Array)) {
    localStorage.setItem(MY_VOTES, JSON.stringify([myVote]));
    return;
  }

  if (
    myVotes.filter((myVote2) => myVote2.movieId === myVote.movieId).length === 0
  ) {
    localStorage.setItem(MY_VOTES, JSON.stringify([...myVotes, myVote]));
    return;
  }

  localStorage.setItem(
    MY_VOTES,
    JSON.stringify([
      ...myVotes.map((myVote2) => {
        if (myVote2.movieId === myVote.movieId) {
          return myVote;
        }
        return myVote2;
      }),
    ])
  );
}
