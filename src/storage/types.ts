export interface MovieStore {
  get(key: string): Promise<string | null>;
  save(key: string, value: string): Promise<void>;
}
