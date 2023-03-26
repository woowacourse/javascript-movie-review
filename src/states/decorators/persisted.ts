import { Subject } from '../Subject';

export const persisted = <GenericSubject extends Subject<any>>(
  key: string,
  subject: GenericSubject,
): typeof subject => {
  // 상태가 변경될 때 저장
  subject.subscribe((state) => localStorage.setItem(key, JSON.stringify(state)));

  // 처음 상태를 로드
  const serialized = localStorage.getItem(key);
  if (serialized !== null) {
    subject.next(JSON.parse(serialized));
  }
  return subject;
};
