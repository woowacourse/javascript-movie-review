import { StateSubject } from './StateSubject';

export type PromiseState<Fulfilled, DefaultValue = undefined> =
  | {
      label: 'pending';
      value: DefaultValue;
    }
  | {
      label: 'fulfilled';
      value: Fulfilled;
    };

export class PromiseStateSubject<
  Fulfilled,
  DefaultValue = undefined,
  GenericError extends Error = Error,
> extends StateSubject<PromiseState<Fulfilled, DefaultValue>, GenericError> {
  async nextPromise(promise: Promise<Fulfilled>, defaultValue?: DefaultValue) {
    this.next({
      label: 'pending',
      value: defaultValue!,
    });

    await promise
      .then((fulfilled) => {
        this.next({
          label: 'fulfilled',
          value: fulfilled,
        });
      })
      .catch((error) => {
        this.error(error);
      });
  }
}
