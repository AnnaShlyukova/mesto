export class Card {
  constructor(
    data,
    likeCard,
    deleteCard,
    handleCardClick,
    userId,
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data.id;

    this._userId = userId;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;

    this._likeCard = likeCard;
    this._deleteCard = deleteCard;
    this._element = this._getTemplate();
    this._buttonLikeElement = this._element.querySelector(".gallery__like");
    this._likeCount = this._element.querySelector(".gallery__like-count");
    this._buttonDeletElement = this._element.querySelector(
      ".gallery__button-delete"
    );
    this._galleryTitle = this._element.querySelector(".gallery__title");
    this._galleryImage = this._element.querySelector(".gallery__image");
  }

  // Метод получения копии темплейта
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  //Метод добавления иконки корзины
  _deleteIcon() {
    if (this._ownerId === this._userId) {
      this._buttonDeletElement.classList.add(".gallery__button-delete_visible");
    }
  }
  generateCard() {
    this._galleryImage.src = this._link;
    this._galleryTitle.textContent = this._name;
    this._galleryImage.alt = this._name;
    this._likeCount.textContent = this._likes.length;
  }
  // Метод удаления карточки
  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Метод лайка карточки
  handleLikeClick() {
    if (!this._buttonLikeElement.classList.contains(".gallery__like_active")) {
      this._api
        .setlike(this._id)
        .then((data) => {
          this._buttonLikeElement.classList.add(".gallery__like_active");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .removeLike(this._id)
        .then((data) => {
          this._buttonLikeElement.classList.remove(".gallery__like_active");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Обработчики событий
  _setEventListener() {
    this._buttonLikeElement.addEventListener("click", () => {
      this._likeCard(this);
    });

    this._buttonDeletElement.addEventListener("click", () => {
      this._deleteCard(this);
    });

    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Получаем готовую карточку с данными
  createCard() {
    //this._element = this._getTemplate();
    this._setEventListener();
    this._deleteIcon();
    this.generateCard();

    return this._element;
  }
}
