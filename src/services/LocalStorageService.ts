const LocalStorageService = {
  get(key: LocalStorageKey): UserMovie[] {
    const item = window.localStorage.getItem(key);

    if (item) return JSON.parse(item);
    return [];
  },

  set(key: LocalStorageKey, value: UserMovie[]) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};

export default LocalStorageService;
