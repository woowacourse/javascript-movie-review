import './Modal.css';

import SELECTORS from '../../../constants/selectors';

const { modal, open, backdrop, container, header, body, closeBtn } =
  SELECTORS.MODAL;

const renderContainer = ($children: HTMLElement, $container: Element) => {
  const $header = $children.querySelector(`.${header}`);
  const $body = $children.querySelector(`.${body}`);

  if ($header) $container.appendChild($header);
  if ($body) $container.appendChild($body);
};

export const openModal = ($children: HTMLElement) => {
  const $modal = document.querySelector(`.${modal}`);
  const $container = document.querySelector(`.${container}`);

  if ($container) renderContainer($children, $container);
  if ($modal) $modal.classList.add(open);
};

export const closeModal = () => {
  const $modal = document.querySelector(`.${modal}`);
  const $container = document.querySelector(`.${container}`);

  if ($container) $container.textContent = '';
  if ($modal) $modal.classList.remove(open);
};

const createModal = () => {
  const $modal = document.createElement('div');
  $modal.classList.add(modal);

  return $modal;
};

const createBackdrop = () => {
  const $backdrop = document.createElement('div');
  $backdrop.classList.add(backdrop);

  $backdrop.addEventListener('click', () => {
    closeModal();
  });

  return $backdrop;
};

const createCloseBtn = () => {
  const $btn = document.createElement('button');
  $btn.classList.add(closeBtn);

  $btn.addEventListener('click', () => closeModal());

  return $btn;
};

const createContainer = () => {
  const $container = document.createElement('div');
  const $closeBtn = createCloseBtn();

  $container.classList.add(container);
  $container.appendChild($closeBtn);

  return $container;
};

const Modal = () => {
  const $modal = createModal();
  const $backdrop = createBackdrop();
  const $container = createContainer();

  const render = () => {
    $modal.appendChild($backdrop);
    $modal.appendChild($container);

    return $modal;
  };

  return {
    render,
    openModal,
    closeModal,
  };
};

export default Modal;
