const Message = {
  template() {
    return `
      <div class="message hide">
        <p class="message-title">🔎 검색 결과가 없습니다. 🔎</p>
        <p class="message-paragraph">검색 값이 올바른지 확인해주세요.</p>
      </div>
    `;
  },
  handleVisibility(state: boolean) {
    const message = document.querySelector<HTMLDivElement>('.message');

    if (state) {
      return message?.classList.add('hide');
    }

    return message?.classList.remove('hide');
  },
};

export default Message;
