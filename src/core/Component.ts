import { observable, observe } from './observer.js';

export class Component {
  state: any;
  $el;

  constructor($el: any) {
    this.$el = $el;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState());
    observe(() => {
      this.render();
      this.setEvent();
    });
  }

  initState() {
    return {};
  }
  template() {
    return '';
  }
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
}
