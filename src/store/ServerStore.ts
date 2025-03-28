class Cache {
  #cache = new Map<string, any>();

  get(key: string) {
    return this.#cache.get(key);
  }

  set(key: string, value: any) {
    this.#cache.set(key, value);
  }
}

interface Query<Response> {
  queryKey: string;
  queryFn: () => Promise<Response>;
}

class ServerStore {
  cache = new Cache();

  async query<Response>({ queryKey, queryFn }: Query<Response>) {
    const cachedValue = this.cache.get(queryKey);
    if (cachedValue) return cachedValue;

    const response = await queryFn();
    this.cache.set(queryKey, response);
    return response;
  }
}

const serverStore = new ServerStore();
export default serverStore;
