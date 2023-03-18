export const Validation = {
  inputText(text: string) {
    const textArray = text.split('').filter((elem) => elem !== ' ');

    if (textArray.length < 1) throw new Error('입력을 해주세요.');
    if (textArray.length > 10) throw new Error('10자 이하로 입력해주세요.');
  },
};
