interface LocalStorage {
  setJSON: (key: string, JSONdata: Object | any[]) => void;
  getJSON: (key: string) => any | undefined;
}

const LocalStorage: LocalStorage = {
  setJSON(key, JSONdata) {
    localStorage.setItem(key, JSON.stringify(JSONdata));
  },

  getJSON(key: string) {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return undefined;
  },
};

export default LocalStorage;
