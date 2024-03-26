import { getDataWithAuth } from '.';
import { showAlert } from '../components/Alert';

export const catchError = async (url: string) => {
  return await getDataWithAuth(url).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      console.error(data.status_message);
      handleErrorResponse(response.status);
    }

    return data.results;
  });
};

const handleErrorResponse = (status: number) => {
  if (status === 401) throw new Error('401-인증되지 않은 사용자 입니다');
  if (status === 404) throw new Error('404-Not Found');
  if (status === 500) throw new Error('500-Internal Server Error');
  if (status === 503) throw new Error('503-Service Unavailable');
  throw new Error(`${status}-ERROR`);
};
