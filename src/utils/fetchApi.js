const fetchApi = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) throw new Error();
  return response.json();
};

export default fetchApi;
