import { Component } from '@/components/core';
import { Obserable } from '@/modules';

class Cache {
  #cache = new Map<string, any>();

  get(key: string) {
    return this.#cache.get(key);
  }

  set(key: string, value: any) {
    this.#cache.set(key, value);
  }
}

interface Query<TResponse> {
  queryKey: string;
  queryFn: () => Promise<TResponse>;
}

class ServerStore {
  #cache = new Cache();

  async query<TResponse>({ queryKey, queryFn }: Query<TResponse>) {
    const cachedValue = this.#cache.get(queryKey);
    if (cachedValue) return cachedValue;

    const response = await queryFn();
    this.#cache.set(queryKey, response);

    return response;
  }
}

const serverStore = new ServerStore();
export default serverStore;
