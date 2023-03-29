type error = 'client' | 'server' | 'search';

class ErrorContainer {
  $errorContainer: HTMLDivElement;

  constructor() {
    this.$errorContainer = document.createElement('div');
    this.$errorContainer.className = 'alert-container';
  }

  render($target: HTMLElement, message: string, type = 'server' as error) {
    this.$errorContainer.replaceChildren('');
    if (type === 'server') this.$errorContainer.innerHTML = this.serverErrorTemplate(message);
    if (type === 'search') this.$errorContainer.innerHTML = this.searchErrorTemplate(message);

    $target.insertAdjacentElement('beforeend', this.$errorContainer);
  }

  serverErrorTemplate(message: string) {
    return `<p class="alert-message alert-title">${message}</p>
    
    <p class="alert-message alert-sub-title">❌ 새로고침 부탁드립니다.</p>
    <p class="alert-message alert-sub-title">❌ 네트워크 상태 확인 부탁드립니다.</p>
    <p class="alert-message alert-sub-title">❌ 02-000-0000으로 연락 주세요. 불편함을 드려 죄송합니다.</p>`;
  }

  searchErrorTemplate(message: string) {
    return ` 
    <p class="alert-message alert-title">${message}</p>
        
    <p class="alert-message alert-sub-title">🌕 다른 키워드를 입력해 보세요.</p>
    <p class="alert-message alert-sub-title">🌕 영화를 찾고 계신가요?</p>
    <p class="alert-message alert-sub-title">🌕 영화 제목만을 입력해 주세요</p>
  `;
  }
}

export default ErrorContainer;
