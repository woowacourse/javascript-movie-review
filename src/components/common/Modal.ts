import { $ } from '@/lib/utils';
import { Component } from '../core';
import { Props, State } from '../core/Component';

export default abstract class Modal<TProps extends Props = {}, TState extends State = {}> extends Component<
  TProps,
  TState
> {
  abstract id: string;

  update() {
    this.render();
    this.show();
  }

  show() {
    $(`#${this.id}`)?.appendChild(this.element);
    this.onShow();
  }

  onShow() {}

  disableScrollOutside() {
    document.body.style.overflow = 'hidden';
  }

  enableScrollOutside() {
    document.body.style.overflow = 'scroll';
  }
}
