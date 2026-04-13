export interface MovieStore {
  get(key: number): Promise<string | null>;
  save(key: number, value: number): Promise<void>;
}
