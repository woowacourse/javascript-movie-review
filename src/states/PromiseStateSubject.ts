import { StateSubject } from './StateSubject';

export type PromiseState<Fulfilled, DefaultValue = undefined, Rejected = Error> =
  | {
      label: 'pending';
      value: DefaultValue;
    }
  | {
      label: 'fulfilled';
      value: Fulfilled;
    }
  | {
      label: 'rejected';
      value: Rejected;
    };

export class PromiseStateSubject<
  Fulfilled,
  DefaultValue = undefined,
  GenericError extends Error = Error,
> extends StateSubject<PromiseState<Fulfilled, DefaultValue, GenericError>, GenericError> {
  fetchFn: (() => Promise<Fulfilled>) | null = null;

  defaultValue?: DefaultValue;

  fetch(fetchFn: () => Promise<Fulfilled>, defaultValue: DefaultValue) {
    this.fetchFn = fetchFn;
    this.defaultValue = defaultValue;
    this.nextPromise(this.fetchFn(), this.defaultValue);
  }

  refetch() {
    if (this.fetchFn === null) return;

    this.nextPromise(this.fetchFn(), this.defaultValue);
  }

  protected async nextPromise(promise: Promise<Fulfilled>, defaultValue?: DefaultValue) {
    this.next({
      label: 'pending',
      value: defaultValue!,
    });

    try {
      const fulfilled = await promise;
      this.next({
        label: 'fulfilled',
        value: fulfilled,
      });
    } catch (e) {
      const error = e as GenericError;
      this.next({
        label: 'rejected',
        value: error,
      });
      this.error(error);
    }
  }
}
