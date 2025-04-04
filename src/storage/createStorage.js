function createStorage(key) {
    return {
      get() {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
      },
  
      set(value) {
        localStorage.setItem(key, JSON.stringify(value));
      },
  
      clear() {
        localStorage.removeItem(key);
      },
    };
  }
  
  export default createStorage;
  