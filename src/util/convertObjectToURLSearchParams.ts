export type Params = string | number | boolean;

function convertObjectToURLSearchParams(obj: Record<string, Params>) {
  const stringObj = Object.entries(obj).map(([key, value]) => [key.toString(), value.toString()]);

  return new URLSearchParams(stringObj);
}

export { convertObjectToURLSearchParams };
