// Импорт классов

import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

//задаю переменные
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup_content_profile");
const popupGallery = document.querySelector(".popup_content_gallery");
export const popupImage = document.querySelector(".popup_content_image-view");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
export const imageElement = popupImage.querySelector(".popup__image");
export const imageCaption = popupImage.querySelector(".popup__image-caption");

const buttonOpen = document.querySelector(".profile__button-edit_open-popup");
const buttonAdd = document.querySelector(".profile__button-add_open-popup");

const listElement = document.querySelector(".gallery__list");

const formEdit = document.forms.profileForm;
const nameInput = formEdit.elements.nameInput;
const bioInput = formEdit.elements.bioInput;

const formAdd = document.forms.addForm;
const nameGalleryInput = formAdd.elements.nameGalleryInput;
const linkGalleryInput = formAdd.elements.linkGalleryInput;

// селектор карточки
const galleryTemplate = "#gallery-template";

//селекторы валидации

const validationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//валидация
const profileFormValidation = new FormValidator(validationSelectors, formEdit);
const addFormValidation = new FormValidator(validationSelectors, formAdd);
profileFormValidation.enableValidation();
addFormValidation.enableValidation();

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
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      closePopup(popup);
    }
  });
});

//открытие любого попапа
export function openPopup(item) {
  document.addEventListener("keydown", handleEscClose);
  item.classList.add("popup_opened");
}

//функция открытия попапа с прописанными значениями из профиля
function openPopupProfile() {
  formEdit.reset();
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}
//функция открытия попапа для добавления фото
function openPopupGallery(event) {
  formAdd.reset();
  openPopup(popupGallery);
}

// Создаем карточку
function createItem(data) {
  const newCard = new Card(data, galleryTemplate).generateCard();
  return newCard;
}

//рендерим фото
function renderItem(newCard) {
  listElement.prepend(newCard);
}

//рендерим все фото
function renderList(data) {
  data.reverse().forEach((newCard) => renderItem(createItem(newCard)));
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
  //сбрасываем значения полей формы после ее закрытия*/
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
formEdit.addEventListener("submit", handleProfileSubmit);
