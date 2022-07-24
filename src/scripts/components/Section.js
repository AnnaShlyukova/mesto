export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = "";
  }

  //публичный метод добавления элементов в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  //публичный метод отрисовки всех элементов
  renderItems() {
    this.clear();

    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
