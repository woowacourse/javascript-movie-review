import { $ } from '../../util/selector';
import './LoadingAnimation.css';

export function showLoadingAnimation(movieItem: HTMLElement) {
  const overlayElement = document.createElement('div');
  overlayElement.classList.add('loading-overlay');

  const loadingElement = document.createElement('div');
  loadingElement.classList.add('loading-animation');

  overlayElement.append(loadingElement);
  $('.item-thumbnail-box', movieItem).appendChild(overlayElement);
}

export function removeLoadingAnimation(movieItem: HTMLElement) {
  $('.loading-overlay', movieItem).remove();
}
