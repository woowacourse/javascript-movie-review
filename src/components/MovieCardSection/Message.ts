import { CLASS } from '../../constants/selector';

const Message = {
  template() {
    return `
      <div class="${CLASS.MESSAGE} ${CLASS.HIDE}">
        <p class="message-title">🔎 검색 결과가 없습니다. 🔎</p>
        <p class="message-paragraph">검색 값이 올바른지 확인해주세요.</p>
      </div>
    `;
  },

  handleVisibility(state: boolean) {
    const message = document.querySelector<HTMLDivElement>(`.${CLASS.MESSAGE}`);

    if (state) {
      return message?.classList.add(CLASS.HIDE);
    }

    return message?.classList.remove(CLASS.HIDE);
  },
};

export default Message;
