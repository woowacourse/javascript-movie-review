import { Nullable } from "../../types/utility";
import { DataStorage } from "./Storage.type";

export default class BrowserStorage<T> implements DataStorage<T> {
  private key: Nullable<string> = null;

  private storage: Nullable<Storage> = null;

  constructor(key: string, storage: Storage) {
    this.key = key;
    this.storage = storage;
  }

  private fromJson<T>(data: string): T {
    return JSON.parse(data);
  }

  private toJson<T>(data: T): string {
    return JSON.stringify(data);
  }

  get<T>() {
    const storedData = this.storage?.getItem(this.key ?? "");
    if (!storedData) return;

    return this.fromJson<T>(storedData);
  }

  set(data: T) {
    const stringifiedData = this.toJson(data);

    this.storage?.setItem(this.key ?? "", stringifiedData);
  }

  remove() {
    this.storage?.removeItem(this.key ?? "");
  }
}
