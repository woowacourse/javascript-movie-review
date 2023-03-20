function convertKeysToCamelCase<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase) as unknown as T;
  }

  const camelCaseObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const camelCaseKey = key.replace(/(_\w)/g, (match) => match[1].toUpperCase());

      camelCaseObj[camelCaseKey] = convertKeysToCamelCase(value);
    }
  }

  return camelCaseObj as T;
}

export { convertKeysToCamelCase };
