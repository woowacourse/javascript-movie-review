import './style.css';

class Fallback {
  STATUS_LOOKUP_TABLE: Record<string, string> = {
    '401': '접근 권한이 없어요 :(',
    '404': '잘못된 URL로 접근했어요 :(',
    '500': '서버에 일시적인 문제가 있어요 :(',
    '503': '서비스를 이용할 수 없어요 :(',
  };

  private template: HTMLLIElement;

  constructor() {
    const main = document.createElement('li');
    main.classList.add('fallback');
    const p = document.createElement('p');
    p.classList.add('fallback_message');
    main.appendChild(p);

    this.template = main;
  }

  setFallbackMessage(status: string) {
    const p = this.template.querySelector('p') as HTMLElement;
    p.textContent = this.STATUS_LOOKUP_TABLE[status];
  }

  setEmptyMessage() {
    const p = this.template.querySelector('p') as HTMLElement;
    p.textContent = '조건에 맞는 영화가 없어요 :(';
  }

  get element() {
    return this.template;
  }
}

export default Fallback;
