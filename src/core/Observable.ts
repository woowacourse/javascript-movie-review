class Observable<T> {
  #callbacks: Array<(value: T) => void>;
  #value: T;

  constructor(value: T) {
    this.#callbacks = [];
    this.#value = value;
  }

  notify() {
    this.#callbacks.forEach((callback) => callback(this.#value));
  }

  subscribe(callback: (value: T) => void) {
    this.#callbacks.push(callback);
  }

  getValue() {
    return this.#value;
  }

  setValue(value: T) {
    this.#value = value;
    this.notify();
  }
}

export default Observable;
