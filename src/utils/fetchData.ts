const fetchData = async <T>(
  { url, options }: FetchOptions,
  onSuccess: (data: T) => void,
  onError: (statusCode: HTTPStatusCode) => void,
  onLoading: () => void,
) => {
  onLoading();

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then((data: T) => {
      onSuccess(data);
    })
    .catch((statusCode: HTTPStatusCode) => {
      onError(statusCode);
    });
};

export default fetchData;
