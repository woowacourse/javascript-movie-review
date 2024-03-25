export type Rate = 0 | 2 | 4 | 6 | 8 | 10;

export const MENT_BY_RATE: Record<Rate, string> = {
  0: '미입력',
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
} as const;

type StarRate = typeof MENT_BY_RATE;

export default StarRate;
