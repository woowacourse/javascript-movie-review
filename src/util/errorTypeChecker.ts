export function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export function isNetworkError(error: unknown): error is TypeError {
  return error instanceof TypeError;
}
