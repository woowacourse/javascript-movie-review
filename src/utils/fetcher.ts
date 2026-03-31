export const fetcher = async <T, U>(
  endpoint: string,
  options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  },
) => {
  try {
    const response = await fetch(endpoint, options);
    if (response.ok) {
      const data: T = await response.json();
      return data;
    }
    const error: U = await response.json();
    return error;
  } catch (error) {
    throw error;
  }
};

// TODO fetcher를 범용적인 api 호출 인스턴스로 갈건지, TMDB에서 쓰기 쉽게 하는 용도로 할건지 기준을 정하고 의도가 드러나게 수정
