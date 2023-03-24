import { Subject } from './Subject';

export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;

export const persisted = <
  GenericSubject extends Subject<State, GenericError>,
  State = any,
  GenericError extends Error = Error,
>(
  key: string,
  subject: GenericSubject,
): GenericSubject => {
  // 상태가 변경될 때 저장
  subject.subscribe((state) => localStorage.setItem(key, JSON.stringify(state)));

  // 처음 상태를 로드
  const serialized = localStorage.getItem(key);
  if (serialized !== null) {
    subject.next(JSON.parse(serialized));
  }
  return subject;
};
