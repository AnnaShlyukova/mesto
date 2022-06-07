//задаю переменные
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup_content_profile");
const popupGallery = document.querySelector(".popup_content_gallery");
const popupImage = document.querySelector(".popup_content_image-view");

const nameGalleryInput = document.querySelector("#gallery-name");
const linkGalleryInput = document.querySelector("#gallery-link");
const nameInput = document.querySelector("#profile-name");
const bioInput = document.querySelector("#profile-bio");

const formElement = document.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

const buttonOpen = document.querySelector(".profile__button-edit_open-popup");
const buttonAdd = document.querySelector(".profile__button-add_open-popup");

const listElement = document.querySelector(".gallery__list");
const galleryTemplate = document.querySelector("#gallery-template").content;

//функция удаления фото
function deleteButtonItem(event) {
  const buttonElement = event.target;
  const listItemElement = buttonElement.closest(".gallery__item");
  listItemElement.remove();
}

//функция лайка фото
function likeButtonItem(event) {
  const buttonElement = event.target;
  buttonElement.classList.toggle("gallery__like_active");
}

//функция закрытия попапа по клавише Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//закрытие любого попапа
function closePopup(item) {
  document.removeEventListener("keydown", handleEscClose);
  item.classList.remove("popup_opened");
}

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      closePopup(popup);
    }
  });
});

//открытие любого попапа
function openPopup(item) {
  document.addEventListener("keydown", handleEscClose);
  item.classList.add("popup_opened");
}

//функция открытия попапа с прописанными значениями из профиля
function openPopupProfile(event) {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}
//функция открытия попапа для добавления фото
function openPopupGallery(event) {
  openPopup(popupGallery);
}

//функция открытия попапа просмотра фото
function openPopupImage(data) {
  openPopup(popupImage);
  const imageElement = popupImage.querySelector(".popup__image");
  imageElement.src = data.link;
  imageElement.alt = data.name;
  popupImage.querySelector(".popup__image-caption").textContent = data.name;
}

function createItem(data) {
  const itemElement =
    galleryTemplate.cloneNode(true); /*клонируем содержимое template*/
  const galleryImage = itemElement.querySelector(".gallery__image");
  const galleryTitle = itemElement.querySelector(".gallery__title");
  galleryImage.src = data.link; /*передаем значение атрибутов из массива*/
  galleryTitle.textContent = data.name;
  galleryImage.alt = data.name;
  const buttonLikeElement = itemElement.querySelector(".gallery__like");
  buttonLikeElement.addEventListener("click", likeButtonItem); /*ставим лайк*/
  const buttonDeletElement = itemElement.querySelector(
    ".gallery__button-delete"
  ); /*удаляем фото*/
  buttonDeletElement.addEventListener("click", deleteButtonItem);
  /*открываем попап с картинкой*/
  galleryImage.addEventListener("click", () => openPopupImage(data));
  return itemElement;
}

//рендерим фото
function renderItem(itemElement) {
  listElement.prepend(itemElement);
}

//рендерим все фото
function renderList(data) {
  data.reverse().forEach((item) => renderItem(createItem(item)));
}

//загружаем 6 карточек из массива на сайт
renderList(initialCards);

//функция добавления фото через форму
function addImage(event) {
  event.preventDefault();
  const name = nameGalleryInput.value;
  const link = linkGalleryInput.value;
  renderItem(createItem({ name, link }));
  closePopup(popupGallery);
  /*сбрасываем значения полей формы после ее закрытия*/
  event.target.reset();
}

//функция обновления информации после внесения изменений в форму
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(popupProfile);
}

// слушатели событий открытия попапа, сохранения изменений в попапе
buttonOpen.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupGallery);
//слушатель добавления фото через форму
popupGallery.addEventListener("submit", addImage);
// слушатели событий сохранения изменений в попапе
formElement.addEventListener("submit", handleProfileSubmit);

//валидация
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
