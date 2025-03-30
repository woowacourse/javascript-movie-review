const RATE_TEXT = {
  2: "최악이에요",
  4: "별로에요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
  0: "평가해주세요",
};

export function getRateText(rate: number): string {
  return `${RATE_TEXT[rate as keyof typeof RATE_TEXT]} (${rate}/10)`;
}
