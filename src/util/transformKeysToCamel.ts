const convertSnakeCaseToCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const transformKeysToCamel = <T>(input: T): T => {
  if (Array.isArray(input)) {
    return input.map(transformKeysToCamel) as T;
  }

  if (input !== null && typeof input === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      const camelKey = convertSnakeCaseToCamelCase(key);
      result[camelKey] = transformKeysToCamel(value);
    }
    return result as T;
  }

  return input;
};
