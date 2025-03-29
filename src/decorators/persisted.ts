import { LocalStorage, LocalStorageKeyType } from '@/modules';
import { Store } from '@/store';

export const persisted = (key: LocalStorageKeyType, store: Store<any>) => {
  store.setState(LocalStorage.get(key));

  store.subscribe((state) => LocalStorage.set(key, state));

  return store;
};
