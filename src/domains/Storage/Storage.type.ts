import { Optional } from "../../types/utility";

export interface DataStorage<T> {
  get: () => Optional<T>;
  set: (data: T) => void;
  remove: () => void;
}
