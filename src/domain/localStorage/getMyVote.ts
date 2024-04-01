import { MY_VOTES, MyVote } from "./myVote";

export default function getMyVote({
  movieId,
}: {
  movieId: number;
}): MyVote | null {
  const myVotesJson = localStorage.getItem(MY_VOTES);
  if (myVotesJson === null) {
    return null;
  }

  const myVotes = JSON.parse(myVotesJson);
  if (!(myVotes instanceof Array)) {
    return null;
  }

  const myVote = myVotes.find((myVote) => myVote.movieId === movieId);
  if (myVote === undefined) {
    return null;
  }

  return myVote;
}
