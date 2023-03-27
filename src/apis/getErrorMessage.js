import { ERROR_MESSAGE } from "../constants/errorMessage";

const getErrorMessage = (error) => {
  if (error.message === "API Error") {
    return ERROR_MESSAGE.API[error.code] || ERROR_MESSAGE.API_DEFAULT;
  }
  if (error.message === "Response Error") {
    return ERROR_MESSAGE.RESPONSE;
  }
  if (error.message === "Offline Error") {
    return ERROR_MESSAGE.OFFLINE;
  }
  return ERROR_MESSAGE.DEFAULT;
};

export default getErrorMessage;
