import HttpError from '../error/HttpError';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isHttpError = (error: any): error is HttpError => {
  return typeof error.status === 'number';
};

export default isHttpError;
