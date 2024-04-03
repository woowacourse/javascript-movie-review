interface ErrorMessage {
  [key: number]: string;
}

const ERROR_MESSAGE: ErrorMessage = {
  301: 'Moved Permanently',
  303: 'See Other',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};
export default ERROR_MESSAGE;
