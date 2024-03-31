const ERRORS: { [key: string | number]: string } = Object.freeze({
  noOverview: '줄거리 정보가 없어요. 🥲',

  301: 'Moved Permanently',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
});

export default ERRORS;
