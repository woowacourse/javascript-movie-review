export const deepEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (obj1 === obj2) return true;

  if (obj1 === null || obj2 === null) return false;

  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 === "object" && typeof obj2 === "object") {
    const keys1 = Object.keys(obj1 as object);
    const keys2 = Object.keys(obj2 as object);

    if (keys1.length !== keys2.length) return false;

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      return (
        obj1.length === obj2.length &&
        obj1.every((item, index) => deepEqual(item, obj2[index]))
      );
    }

    return keys1.every((key) =>
      deepEqual(
        (obj1 as Record<string, unknown>)[key],
        (obj2 as Record<string, unknown>)[key]
      )
    );
  }

  return false;
};
