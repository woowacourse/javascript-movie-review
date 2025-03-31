const COMMENTS: { [key: number]: string } = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};
export const getComment = (rate: number) => {
  return COMMENTS[rate];
};
export const getScoresArray = () => {
  return Object.keys(COMMENTS);
};
