export class Card {
  constructor(
    data,
    likeCard,
    handleCardClick,
    openImageView,
    userId,
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;

    this._userId = userId;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._openImageView = openImageView;

    this._likeCard = likeCard;
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
      this._buttonDeletElement.classList.add("gallery__button-delete_visible");
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
  checkLike() {
    return this._buttonLikeElement.classList.contains("gallery__like_active");
  }

  setIdCard() {
    this._element.dataset.id = this._id;
    this._cardId = this._element.dataset.id;
    console.log(this._id);
    return this._cardId;
  }

  updateLikes(info) {
    this._data = info;
    this._likeCount.textContent = this._data.likes.length;
    this._buttonLikeElement.classList.toggle(
      "gallery__like_active",
      !this.checkLike()
    );
  }

  _isLiked() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._buttonLikeElement.classList.add("gallery__like_active");
      }
    });
  }

  // Обработчики событий
  _setEventListener() {
    this._buttonLikeElement.addEventListener("click", () => {
      this._likeCard(this);
    });

    this._buttonDeletElement.addEventListener("click", () => {
      this._handleCardClick(this);
    });

    this._galleryImage.addEventListener("click", () => {
      this._openImageView(this._name, this._link);
    });
  }

  // Получаем готовую карточку с данными
  createCard() {
    //this._element = this._getTemplate();
    this.setIdCard();
    this._isLiked();
    this._setEventListener();
    this._deleteIcon();
    this.generateCard();

    return this._element;
  }
}
