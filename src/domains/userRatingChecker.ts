const userRatingChecker = {
  check(ratingData: unknown): ratingData is Record<number, number> {
    if (!(typeof ratingData === 'object' && ratingData)) {
      return false;
    }

    const checkResult = Object.entries(ratingData).every(([key, value]) => {
      return !(this.isDecimal(key) && this.isDecimal(value));
    });

    return checkResult;
  },

  isDecimal(value: unknown) {
    return typeof value === 'number' && value % 1 === 0;
  },
};

export default userRatingChecker;
