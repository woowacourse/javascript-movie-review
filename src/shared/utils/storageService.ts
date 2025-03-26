export const storageService = (id?: number, rating?: number) => {
  if (id && rating) {
    localStorage.setItem(String(id), rating?.toString());
  }

  return localStorage.getItem(String(id)) ?? 0;
};
