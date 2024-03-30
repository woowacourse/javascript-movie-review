import DOM from '../../utils/DOM';
import './style.css';

const { $ } = DOM;

const Skeleton = {
  render(count: number) {
    const skeleton = document.createElement('ul');
    skeleton.classList.add('item-list', 'item-list--skeleton');
    skeleton.innerHTML = this.get(count);

    return skeleton;
  },

  get(count: number = 20) {
    return /* html */ `
      <li>
      <a>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>
      `.repeat(count);
  },

  remove() {
    $('.item-list--skeleton')?.remove();
  },
};

export default Skeleton;
