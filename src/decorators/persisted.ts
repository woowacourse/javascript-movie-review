import { LocalStorage, LocalStorageKeyType } from '@/modules';
import { Store } from '@/store';

export const persisted = (key: LocalStorageKeyType, store: Store<any>) => {
  const localData = LocalStorage.get(key);
  if (!localData) LocalStorage.set(key, store.getState());

  store.setState(LocalStorage.get(key));

  store.subscribe((state) => LocalStorage.set(key, state));

  return store;
};
