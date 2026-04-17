export interface AsyncState<T> {
  isPending: boolean;
  error: boolean;
  data: T;
}

type Subscriber<T> = (state: AsyncState<T>) => void;

export abstract class AsyncService<T> {
  protected isPending = false;
  protected error = false;
  private subscribers: Set<Subscriber<T>> = new Set();

  subscribe(subscriber: Subscriber<T>): void {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber<T>): void {
    this.subscribers.delete(subscriber);
  }

  protected setIsPending(value: boolean, data: T): void {
    this.isPending = value;
    this.notify(data);
  }

  protected notify(data: T): void {
    this.subscribers.forEach((subscriber) =>
      subscriber({
        isPending: this.isPending,
        error: this.error,
        data,
      }),
    );
  }
}
