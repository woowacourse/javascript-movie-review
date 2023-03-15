export const objectToAttributeString = (obj) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
};
