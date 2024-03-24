import { API_ERROR_MESSAGE } from '../constants';

/**
 * api 요청이 실패했을 경우 그에 대한 오류 메세지를 반환
 * @param status api 응답 코드
 */
const makeErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return API_ERROR_MESSAGE.notFound;
    case 404:
      return API_ERROR_MESSAGE.badRequest;
    case 500:
      return API_ERROR_MESSAGE.serverError;
    default:
      return API_ERROR_MESSAGE.default;
  }
};

/**
 * api 요청 시 , 응답 코드에 대한 오류 처리
 */
const checkAPIStatus = (response: Response) => {
  if (!response.ok) {
    const message = makeErrorMessage(response.status);
    throw new Error(message);
  }
};
/**
 * api 요청시, JSON이 아니라는 오류에 대한 처리
 */
const checkInvalidJSON = (error: unknown | Error) => {
  if (!(error instanceof Error)) return;
  if (error.message.includes('Unexpected end of JSON input')) {
    return new Error(API_ERROR_MESSAGE.inValidJSON);
  }

  return error;
};

/**
 * api를 통해서 데이터를 불러와, 요청 결과에 따라서 오류 또는 데이터를 반환하는 함수
 * @param  {Promise<Response>} func api에서 데이터를 불러오는 비동기 함수 

 */
const handleFetchData = async (func: Promise<Response>) => {
  try {
    const response = await func;
    checkAPIStatus(response);
    return await response.json();
  } catch (error) {
    const apiError = checkInvalidJSON(error);
    return apiError;
  }
};

export default handleFetchData;
