export type Subscriber<State> = (state: State) => void;

export type OfPromise<Resolved> =
  | {
      state: 'pending';
    }
  | {
      state: 'fulfilled';
      resolved: Resolved;
    };

export class Subject<State, GenericError extends Error = Error> {
  protected state: State | null = null;

  protected subscribers: Subscriber<State>[] = [];

  protected errorSubscribers: Subscriber<GenericError>[] = [];

  subscribe(subscriber: Subscriber<State>) {
    if (this.state !== null) {
      subscriber(this.state);
    }
    this.subscribers.push(subscriber);
  }

  next(state: State) {
    this.subscribers.forEach((subscriber) => subscriber(state));
    this.state = state;
  }

  error(error: GenericError) {
    this.errorSubscribers.forEach((subscriber) => subscriber(error));
  }

  subscribeError(subscriber: Subscriber<GenericError>) {
    this.errorSubscribers.push(subscriber);
  }
}
