export type Rate = 0 | 2 | 4 | 6 | 8 | 10;

export function verifyRate(number: number) {
  const rateRange = number >= 0 && number <= 10;
  const isEven = number % 2 === 0;

  if (rateRange && isEven) return number as Rate;

  // 비정상적인 경우 체크하지 않음으로 변경
  return 0;
}

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
