export const MovieValidation = (statusCode: number) => {
  if (statusCode === 1) return;

  switch (statusCode) {
    case 2:
      throw new Error("서버");
      console.log("서버오류입니다.");
      break;
    case 3:
    case 7:
    case 10:
    case 14:
    case 16:
    case 17:
      throw new Error("접근");
      console.log("접근 권한이 없습니다.");
      break;
    case 6:
    case 34:
    case 37:
      throw new Error("경로");
      console.log("잘못된 경로입니다.");
      break;
    default:
      throw new Error("알수없음");
      console.log("알 수 없는 오류가 발생했습니다.");
  }
};
