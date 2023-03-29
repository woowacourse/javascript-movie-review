import { FailedResponse } from '../types';

export const request = async (url: string) => {
  if (!navigator.onLine) {
    throw new Error('네트워크 오프라인이 감지되었습니다');
  }
  const res = await fetch(url);
  if (!res.ok) {
    const error: FailedResponse = await res.json();
    throw new Error(error.status_message);
  }
  return await res.json();
};
