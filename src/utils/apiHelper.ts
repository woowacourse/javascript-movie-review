export const makeURL = (router: string) => {
  return `https://api.themoviedb.org/3/${router}?api_key=${process.env.API_KEY}&language=en-US&`;
};

export const makeParams = <T extends Object>(query: T) => {
  const params = new URLSearchParams();

  [...Object.entries(query)].forEach(([key, value]) => {
    params.append(key, value);
  });

  return params.toString();
};

export const getApiData = async <T>(
  url: string,
  params: string
): Promise<T> => {
  const fetchingData = await fetch(url + params);

  return fetchingData.json();
};
