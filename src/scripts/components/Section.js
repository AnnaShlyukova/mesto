export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // clear() {
  // this._container.innerHTML = "";
  //}

  //публичный метод добавления элементов в контейнер
  addItem(card) {
    this._container.prepend(card);
  }

  //публичный метод отрисовки всех элементов
  renderItems(data) {
    //this.clear();

    data.reverse().forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }
}
