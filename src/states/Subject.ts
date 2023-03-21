export type Subscriber<State> = (state: State) => void;

export type OfPromise<Resolved, Rejected = unknown> =
  | {
      state: 'pending';
    }
  | {
      state: 'fulfilled';
      resolved: Resolved;
    }
  | {
      state: 'rejected';
      rejected: Rejected;
    };

export class Subject<State> {
  protected state: State | null = null;

  protected subscribers: Subscriber<State>[] = [];

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

  static ofPromise<Resolved, Rejected = unknown>(
    promise: Promise<Resolved>,
  ): Subject<OfPromise<Resolved, Rejected>> {
    const subject = new Subject<OfPromise<Resolved, Rejected>>();
    subject.next({
      state: 'pending',
    });

    promise
      .then((resolved) =>
        subject.next({
          state: 'fulfilled',
          resolved,
        }),
      )
      .catch((rejected) =>
        subject.next({
          state: 'rejected',
          rejected,
        }),
      );

    return subject;
  }
}
