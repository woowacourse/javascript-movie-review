import Component from '../../types/component';

class MovieDetailHeader implements Component {
  readonly node: HTMLDivElement;
  readonly props?: { [key: string]: any };

  private closeButton!: HTMLDivElement;
  private movieTitle: string;

  constructor(movieTitle: string, props?: { [key: string]: any }) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-header');
    this.props = props;

    this.movieTitle = movieTitle;

    this.composeNode().setElements().addEvents();
  }

  composeNode(): this {
    this.node.innerHTML = `
    <h2>${this.movieTitle}</h2>
    <button>
      <div class="close close-button" type="reset">
        <img src="./close_button">
      </div>
    </button>
    `;

    return this;
  }

  setElements(): this {
    const closeButton = this.node.querySelector<HTMLDivElement>('.close-button');
    if (!closeButton) return this;

    this.closeButton = closeButton;

    return this;
  }

  addEvents(): this {
    this.closeButton.addEventListener('click', this.handleClickClose.bind(this));

    return this;
  }

  handleClickClose(): void {
    if (this.props && 'onClose' in this.props) {
      this.props.onClose();
    }
  }
}

export default MovieDetailHeader;
