const fetchData = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.AUTHORIZATION_KEY}`,
    },
  });
  return response.json();
};

export default fetchData;
