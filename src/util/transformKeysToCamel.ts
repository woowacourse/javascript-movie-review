const convertSnakeCaseToCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const transformKeysToCamel = (data: Record<string, any>): Record<string, any> => {
  if (data !== null && typeof data === 'object') {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      const camelKey = convertSnakeCaseToCamelCase(key);
      result[camelKey] = transformKeysToCamel(value);
    }

    return result;
  }

  return data;
};
