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

  const response = await getFetchResult(url, requestData);
  if (!response.ok) {
    throw new Error(getResponseErrorMessage(response.status));
  }
  return response;
}

async function getFetchResult(url: string, requestData: RequestInit): Promise<Response> {
  try {
    const response = await fetch(url, requestData);
    return response;
  } catch (error) {
    throw new Error(getNetworkErrorMessage(error));
  }
}

function getNetworkErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return ERROR_MESSAGE.NETWORK_DISCONNECTED;
  }
  return ERROR_MESSAGE.UNKNOWN_ERROR;
}

function getResponseErrorMessage(status: number): string {
  if (status >= 500) {
    return ERROR_MESSAGE.SERVER_ERROR;
  }
  if (status === 401 || status === 403) {
    return ERROR_MESSAGE.AUTHENTICATION_FAILED;
  }
  if (status >= 400) {
    return ERROR_MESSAGE.FETCHING_FAILED;
  }
  return ERROR_MESSAGE.UNKNOWN_ERROR;
}

export default fetchAPI;
