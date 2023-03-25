import { HttpClientNetworkError } from '../../api/errors/HttpClientNetworkError';
import { PromiseStateSubject } from '../PromiseStateSubject';

export const autoRefetched = <GenericSubject extends PromiseStateSubject<any, any>>(
  subject: GenericSubject,
) => {
  let isSufferingFromNetwork = false;

  window.addEventListener('online', () => {
    if (isSufferingFromNetwork) {
      subject.refetch();

      isSufferingFromNetwork = false;
    }
  });

  subject.subscribeError((error) => {
    if (error instanceof HttpClientNetworkError) {
      isSufferingFromNetwork = true;
    }
  });

  subject.subscribe(({ label }) => {
    if (label === 'fulfilled') {
      isSufferingFromNetwork = false;
    }
  });

  return subject;
};
