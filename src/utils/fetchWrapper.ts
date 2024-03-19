interface FetchWrapperProps {
  url: string;
  accessToken: string;
}

async function fetchWrapper<T>({ url, accessToken }: FetchWrapperProps) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.status + response.statusText);
  }

  return response.json() as T;
}

export default fetchWrapper;
