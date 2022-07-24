import "./index.css";
// Импорт классов

import { Card } from "../scripts/components/Card.js";
import { initialCards } from "../scripts/utils/cards.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Section from "../scripts/components/Section.js";

//задаю переменные
const popupProfile = ".popup_content_profile";
const popupGallery = ".popup_content_gallery";
const popupImage = ".popup_content_image-view";
const profileName = ".profile__name";
const profileBio = ".profile__bio";

const buttonOpen = document.querySelector(".profile__button-edit_open-popup");
const buttonAdd = document.querySelector(".profile__button-add_open-popup");

const listSelector = ".gallery__list";

const formEdit = document.forms.profileForm;
const nameInput = formEdit.elements.nameInput;
const bioInput = formEdit.elements.bioInput;

const formAdd = document.forms.addForm;

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

// Создаем карточку
function createItem(data) {
  const newCard = new Card(
    data,
    galleryTemplate,
    handleCardClick
  ).generateCard();
  return newCard;
}

//рендер карточек из массива
const renderList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createItem(item);
      renderList.addItem(createItem(item));
    },
  },
  listSelector
);
renderList.renderItems();

//экземпляр класса с отображением информации о пользователе
const userInfo = new UserInfo(profileName, profileBio);

//попап показа фото с установкой слушателя
const PopupShowImage = new PopupWithImage(popupImage);
PopupShowImage.setEventListeners();

//попап редактирования формы профиля  с установкой слушателя
const PopupEditForm = new PopupWithForm(popupProfile, (evt) => {
  evt.preventDefault();
  const newUserInfo = PopupEditForm.getInputValues();
  userInfo.setUserInfo(newUserInfo);
  PopupEditForm.close();
});
PopupEditForm.setEventListeners();

//попап для добавления фото
const PopupAddImage = new PopupWithForm(popupGallery, (evt) => {
  evt.preventDefault();
  const newImage = PopupAddImage.getInputValues();
  renderList.addItem(createItem(newImage));
  PopupAddImage.close();
  evt.target.reset();
});
PopupAddImage.setEventListeners();

function handleCardClick(name, link) {
  PopupShowImage.open(name, link);
}

// слушатели событий открытия попапа, сохранения изменений в попапе
buttonOpen.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  bioInput.value = data.bio;
  PopupEditForm.open();
});

buttonAdd.addEventListener("click", () => {
  PopupAddImage.open();
});
