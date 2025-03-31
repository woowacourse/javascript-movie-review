type Score = 2 | 4 | 6 | 8 | 10;
type Comment = "최악이예요" | "별로예요" | "보통이에요" | "재미있어요" | "명작이에요";

type ScoreMapping = Record<Score, Comment>;

export const scoreMapping: ScoreMapping = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};
