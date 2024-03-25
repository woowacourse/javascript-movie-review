import HttpError from '../error/HttpError';

const isHttpError = (error: any): error is HttpError => {
  return typeof error.status === 'number';
};

export default isHttpError;
