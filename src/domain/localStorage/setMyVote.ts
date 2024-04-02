import { MY_VOTES, MyVote } from "./myVote";

export default function setMyVote(myVote: MyVote) {
  const myVotesJson = localStorage.getItem(MY_VOTES);
  if (myVotesJson === null) {
    localStorage.setItem(MY_VOTES, JSON.stringify([myVote]));
    return;
  }

  const myVotes = JSON.parse(myVotesJson);
  if (!Array.isArray(myVotes)) {
    localStorage.setItem(MY_VOTES, JSON.stringify([myVote]));
    return;
  }

  const isNewMyVote =
    myVotes.filter((myVote2) => myVote2.movieId === myVote.movieId).length ===
    0;
  if (isNewMyVote) {
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
