import { FailedResponse } from '../types';
import { handleError } from './handleError';

export const request = async (url: string) => {
  try {
    if (!navigator.onLine) {
      throw new Error('네트워크 오프라인이 감지되었습니다');
    }
    const res = await fetch(url);
    if (!res.ok) {
      const error: FailedResponse = await res.json();
      throw new Error(error.status_message);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      handleError(error.message);
    }
    throw new Error();
  }
};
