import ERROR_MESSAGE from '../constant/errorMessage';

async function fetchAPI({ url, method, body }: { url: string; method: string; body?: object }) {
  const response = await getResponse({ url, method, body });
  const result = await response.json();
  return result;
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

export default fetchAPI;
