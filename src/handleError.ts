import { STATUS_CODE } from './constants/apiStatusCode';

const handleError = (statusCode: number = 0, statusMessage: string) => {
  try {
    if (statusCode !== STATUS_CODE.SUCCESS) throw new Error(statusMessage);

    return false;
  } catch (error) {
    if (error instanceof Error) alert(error.message);

    return true;
  }
};

export default handleError;
