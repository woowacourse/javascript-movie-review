export const MY_VOTES = "myVotes";

export type VoteScoreType = 2 | 4 | 6 | 8 | 10;

export interface MyVote {
  movieId: number;
  score: VoteScoreType;
}
