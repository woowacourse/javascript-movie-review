import { getDataWithAuth } from '.';
import { ERROR_MESSAGE } from '../constant/api';

export const throwError = async (url: string) => {
  return await getDataWithAuth(url).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      console.error(data.status_message);
      handleErrorResponse(response.status);
    }

    return data;
  });
};

const handleErrorResponse = (status: number) => {
  if (status === 401) throw new Error(ERROR_MESSAGE.fourZeroOne);
  if (status === 404) throw new Error(ERROR_MESSAGE.fourZeroFour);
  if (status === 500) throw new Error(ERROR_MESSAGE.fiveZeroZero);
  if (status === 503) throw new Error(ERROR_MESSAGE.fiveZeroThree);
  throw new Error(`${status}-${ERROR_MESSAGE.etc}`);
};
