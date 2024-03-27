import { BrowserStorageInterface } from "./Storage.type";

export default class BrowserStorage<T> implements BrowserStorageInterface<T> {
  private KEY: string | null = null;

  private storage: Storage | null = null;

  constructor(key: string, storage: Storage) {
    this.KEY = key;
    this.storage = storage;
  }

  private fromJson<T>(data: string): T {
    return JSON.parse(data);
  }

  private toJson<T>(data: T): string {
    return JSON.stringify(data);
  }

  get<T>() {
    const storedData = this.storage?.getItem(this.KEY ?? "");
    if (!storedData) return;

    return this.fromJson<T>(storedData);
  }

  set(data: T) {
    const stringifiedData = this.toJson(data);

    this.storage?.setItem(this.KEY ?? "", stringifiedData);
  }

  remove() {
    this.storage?.removeItem(this.KEY ?? "");
  }
}
