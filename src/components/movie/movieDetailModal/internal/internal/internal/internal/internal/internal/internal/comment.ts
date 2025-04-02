export type Rate = keyof typeof COMMENTS;

const COMMENTS = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
} as const;

export const getComment = (rate: Rate) => {
  return COMMENTS[rate];
};

export const SCORES = Object.keys(COMMENTS).map((score) =>
  Number.parseInt(score, 10)
);

export const isScore = (value: number): value is Rate => {
  return SCORES.includes(value);
};
