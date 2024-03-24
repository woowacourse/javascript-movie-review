interface FetchWrapperProps {
  url: string;
  accessToken: string;
}

// eslint-disable-next-line max-lines-per-function
const fetchWrapper = async <T>({ url, accessToken }: FetchWrapperProps): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return response.json() as T;
};

export default fetchWrapper;
