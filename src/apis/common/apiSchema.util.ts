import ApiSchema from './apiSchema';

export const isErrorStatusCode = (status: number): status is keyof typeof ApiSchema.ERROR_MESSAGES_MAP => {
  return status in ApiSchema.ERROR_MESSAGES_MAP;
};
