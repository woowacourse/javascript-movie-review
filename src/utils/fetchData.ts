const fetchData = async <T>(
  { url, options }: FetchOptions,
  onSuccess: (data: T) => void,
  onError: (res: Response) => void,
  onLoading: () => void,
) => {
  onLoading();

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        onError(response);
      }

      return response.json();
    })
    .then((data: T) => {
      onSuccess(data);
    });
};

export default fetchData;
