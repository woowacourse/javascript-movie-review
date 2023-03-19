export const MovieValidation = (statusCode: number) => {
  if (statusCode === 1) return;

  switch (statusCode) {
    case 2:
      throw new Error("서버");
    case 3:
    case 7:
    case 10:
    case 14:
    case 16:
    case 17:
      throw new Error("접근");
    case 6:
    case 34:
    case 37:
      throw new Error("경로");
    default:
      throw new Error("알수없음");
  }
};
