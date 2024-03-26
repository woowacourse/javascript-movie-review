import ERROR_MESSAGE from '../constant/errorMessage';
import { isError, isNetworkError } from '../util/errorTypeChecker';

async function fetchAPI({ url, method, body }: { url: string; method: string; body?: object }) {
  try {
    const response = await getResponse({ url, method, body });
    const result = await response.json();
    return result;
  } catch (error: unknown) {
    handleFetchError(error);
  }
}

async function getResponse({ url, method, body }: { url: string; method: string; body?: object }) {
  const headers = { 'Content-type': 'application/json' };
  const requestData: RequestInit = { method, headers };
  if (body) {
    requestData.body = JSON.stringify(body);
  }
  const response = await fetch(url, requestData);
  if (!response.ok) {
    handleResponseError(response.status);
  }
  return response;
}

function handleResponseError(status: number) {
  if (status >= 500) {
    throw new Error(ERROR_MESSAGE.SERVER_ERROR);
  }
  if (status === 401 || status === 403) {
    throw new Error(ERROR_MESSAGE.AUTHENTICATION_FAILED);
  }
  if (status >= 400) {
    throw new Error(ERROR_MESSAGE.FETCHING_FAILED);
  }
  throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
}

function handleFetchError(error: unknown) {
  if (isNetworkError(error)) {
    throw new Error(ERROR_MESSAGE.NETWORK_DISCONNECTED);
  }
  if (isError(error)) {
    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
}

export default fetchAPI;
