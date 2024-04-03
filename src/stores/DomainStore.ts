import { StoreMapper } from "./mappers/StoreMapper";
import Store from "./Store";

interface DomainStoreProps<T> {
  key: string;
  mapper: StoreMapper<T>;
  store?: Store;
}

export default class DomainStore<T> {
  private key: string;
  private mapper: StoreMapper<T>;
  private store: Store;

  constructor({ key, mapper, store = new Store() }: DomainStoreProps<T>) {
    this.key = key;
    this.mapper = mapper;
    this.store = store;
  }

  public get(): T {
    try {
      const item = this.store.get(this.key);
      return this.mapper.fromJSON(item);
    } catch {
      this.reset();
      return this.mapper.fromJSON(null);
    }
  }

  public set(value: T): void {
    this.store.set(this.key, this.mapper.toJSON(value));
  }

  public reset(): void {
    this.store.remove(this.key);
  }
}
