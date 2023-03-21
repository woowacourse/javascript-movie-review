interface Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string; 
}

export default Storage;
