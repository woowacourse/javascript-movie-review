const axios = require('axios');
const { HOST, TMDB_API_KEY } = process.env;

exports.handler = async (event, context) => {
  const { path, queryStringParameters } = event;
  const params = new URLSearchParams({
    ...queryStringParameters,
  });
  params.set('api_key', TMDB_API_KEY);

  const url = new URL(path, 'https://api.themoviedb.org/3');
  url.searchParams = params;

  const response = await axios.get(url);

  return {
    statusCode: response.status,
    ok: response.statusText === 'OK',
    headers: {
      ...response.headers,
      'Access-Control-Allow-Origin': HOST,
    },
    body: JSON.stringify(response.data),
  };
};
