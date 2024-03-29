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

// TODO: API 공통 모듈 만들기 참고
// TODO: 비동기 함수로 선언되어 있는데, 실제로 바깥에서 비동기를 사용하진 않는다. 코드의 일관성을 해치진 않을지 생각해보기.
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
