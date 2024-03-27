interface FetchOptions {
  url: string;
  options: {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  };
}

// 원래 여기서 ErrorMessage를 사용해줬음.
const fetchData = async (
  { url, options }: FetchOptions,
  onSuccess: (data: MovieResponse) => void,
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
    .then((data) => {
      onSuccess(data);
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
};

export default fetchData;
