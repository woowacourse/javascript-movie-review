import './Tooltip.style.css';

const Tooltip = {
  template(message: string) {
    return `
      <div class="tooltip">
        <p>${message}</p>
      </div>
    `;
  },
};

export default Tooltip;
