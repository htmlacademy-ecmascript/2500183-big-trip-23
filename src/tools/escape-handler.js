export default class EscapeHandler {
  #listener = null;
  constructor(listener) {
    this.#listener = listener;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#listener(evt);
    }
  };

  enable() {
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  disable() {
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }
}
