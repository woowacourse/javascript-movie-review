export const TopButton = {
  template: `<button class="scroll-to-top"><img src="assets/scroll_to_top.png" /></button>`,
  render() {
    document.querySelector('.popup-container')?.insertAdjacentHTML('afterend', this.template);
  },
};
