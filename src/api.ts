const API_KEY = import.meta.env.VITE_API_KEY;



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

type resultData = {
  title: string,
  poster_path: string,
  vote_average: number,
}

interface PreviewData {
    page: number,
    resultData: resultData[],
}

export const fetchPopularMovies = async (): Promise<PreviewData> => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);

  if (!response.ok) {
    throw new Error('영화 데이터를 불러오는 데 실패했습니다.');
  }

  const data = await response.json() as PreviewData;
  return data;
};
