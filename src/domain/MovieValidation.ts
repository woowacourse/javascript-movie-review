import { ERROR } from "../abstract/constants";

export const MovieValidation = (statusCode: number) => {
  if (statusCode === 1) return;

  switch (statusCode) {
    case 2:
      throw new Error(ERROR.SERVER);
    case 3:
    case 7:
    case 10:
    case 14:
    case 16:
    case 17:
      throw new Error(ERROR.ACCESS);
    case 6:
    case 34:
    case 37:
      throw new Error(ERROR.ROUTE);
    default:
      throw new Error(ERROR.UNKNOWN);
  }
};
