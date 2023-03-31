import { validation } from '../src/validation';

describe('validation test', () => {
  test('검색어가 없는 경우 오류 던지기', () => {
    expect(() => validation.inputText('')).toThrow('1자 이상 입력해주세요.');
  });
  test('검색어가 10자 초과인 경우 오류 던지기', () => {
    expect(() => validation.inputText('aaaaaaaaaaa')).toThrow('10자 이하로 입력해주세요.');
  });

  test('검색어가 공백만 존재하는 경우 오류 던지기', () => {
    expect(() => validation.inputText('    ')).toThrow('1자 이상 입력해주세요.');
  });

  test('검색어가 공백이 섞여 10자 이하인 경우 오류 던지지 않기', () => {
    expect(() => validation.inputText(' a   ')).not.toThrow();
  });

  test('HTTP 상태가 400코드를 반환할 때 오류메세지 던지기', () => {
    expect(() => validation.api(404)).toThrow('잘못된 요청입니다. 확인해주세요.😥');
  });

  test('HTTP 상태가 500코드를 반환할 때 오류메세지 던지기', () => {
    expect(() => validation.api(502)).toThrow(
      '현재 페이지를 실행할 수 없습니다.\n 잠시후 다시 시도해주세요.😥'
    );
  });
});
