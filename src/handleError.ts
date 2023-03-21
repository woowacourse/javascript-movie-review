import { FETCH_SUCCESS } from './constants/constants';
import { FetchStatusType } from './types';

const handleError = (result: string, fetchStatus?: FetchStatusType) => {
  try {
    if (result !== FETCH_SUCCESS && fetchStatus) {
      throw new Error(`${fetchStatus.statusMessage}(${fetchStatus.statusCode})`);
    }

    return false;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      return true;
    }
  }
};

export default handleError;
