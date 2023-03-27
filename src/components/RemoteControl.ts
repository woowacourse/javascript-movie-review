class RemoteContainer {
  private $remoteContainer: HTMLDivElement;

  constructor() {
    this.$remoteContainer = document.createElement('div');
    this.$remoteContainer.className = 'remote-container';

    const $topButton = document.createElement('button');
    $topButton.className = 'top-button';
    $topButton.innerText = '▲';

    const $buttonButton = document.createElement('button');
    $buttonButton.className = 'bottom-button';
    $buttonButton.innerText = '▼';

    this.$remoteContainer.appendChild($topButton);
    this.$remoteContainer.appendChild($buttonButton);

    this.$remoteContainer.addEventListener('click', this.remoteControlHandler);
  }

  render($target: HTMLElement) {
    $target.insertAdjacentElement('beforeend', this.$remoteContainer);
  }

  private remoteControlHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (e.target.classList.contains('top-button')) {
      window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }

    if (e.target.classList.contains('bottom-button')) {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }
}

export default RemoteContainer;
