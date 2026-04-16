export const deepCopy = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copy = [] as any[];
    for (const item of obj) {
      copy.push(deepCopy(item));
    }
    return copy as any as T;
  }

  const copy = {} as { [key: string]: any };
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy((obj as any)[key]);
    }
  }

  return copy as T;
};
