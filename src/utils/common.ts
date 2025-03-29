export const isError = (error: Error | unknown): error is Error => error instanceof Error;
export const isString = (str: string | unknown): str is string => typeof str === 'string';

export const variant = (object: Record<string, boolean>): string => {
  return Object.entries(object).reduce((prev, [str, condition]) => (condition ? str + prev : prev), '');
};

export const isEqual = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);
