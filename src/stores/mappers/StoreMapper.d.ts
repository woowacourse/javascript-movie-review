export interface StoreMapper<T> {
  fromJSON(json: any): T;
  toJSON(target: T): any;
}
