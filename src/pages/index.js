import "./index.css";
// Импорт классов

import { Card } from "../scripts/components/Card.js";
//import { initialCards } from "../scripts/utils/cards.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Section from "../scripts/components/Section.js";
import Api from "../scripts/components/Api";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

//задаю переменные
const profileSelector = ".popup_content_profile";
const gallerySelector = ".popup_content_gallery";
const imageSelector = ".popup_content_image-view";
const profileName = ".profile__name";
const profileBio = ".profile__bio";

const avatarSelector = ".popup-avatar";
const avatarPopup = document.querySelector(".popup-avatar");
//const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarButton = avatarPopup.querySelector(".popup__button");

const avatarEditPhoto = document.querySelector(".profile__photo");

const confirmSelector = ".popup_confirm";
//onst confirmPopup = document.querySelector(".popup_confirm");
//const confirmButton = confirmPopup.querySelector(".popup__button");

const galleryPopup = document.querySelector(".popup_content_gallery");
const galleryButton = galleryPopup.querySelector(".popup__button");

const profilePopup = document.querySelector(".popup_content_profile");
const profileButton = profilePopup.querySelector(".popup__button");

const buttonOpenProfile = document.querySelector(
  ".profile__button-edit_open-popup"
);
const buttonAddImage = document.querySelector(
  ".profile__button-add_open-popup"
);

const listSelector = ".gallery__list";

const formEdit = document.forms.profileForm;
const nameInput = formEdit.elements.nameInput;
const bioInput = formEdit.elements.bioInput;

const formAdd = document.forms.addForm;

const formAvatar = document.forms.avatarEdit;

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

const config = {
  url: "https://nomoreparties.co/v1/cohort-46/",
  headers: {
    authorization: "fca940e1-04e1-4b78-84e8-f1d5400ed073",
    "Content-Type": "application/json",
  },
};

let userId;

const api = new Api(config);

//валидация
const profileFormValidation = new FormValidator(validationSelectors, formEdit);
const formAddValidation = new FormValidator(validationSelectors, formAdd);
const avatarFormValidation = new FormValidator(validationSelectors, formAvatar);

avatarFormValidation.enableValidation();
profileFormValidation.enableValidation();
formAddValidation.enableValidation();

// Создаем карточку
const createItem = (data) => {
  const newCard = new Card(
    data,

    () => {
      newCard.handleLikeClick();
    },
    () => {
      newCard.handleDeleteCard();
    },
    () => {
      popupConfirm.handleConfirm(() => {
        api
          .deleteCard(data._id)
          .then(() => {
            newCard.handleDeleteCard();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      popupConfirm.open();
    },
    userId,
    galleryTemplate
  );
  return newCard.createCard();
};

//рендер карточек из массива
const renderList = new Section(createItem, listSelector);

//экземпляр класса с отображением информации о пользователе
const userInfo = new UserInfo(profileName, profileBio, avatarSelector);

//попап показа фото
const popupShowImage = new PopupWithImage(imageSelector);

//попап удаления фото
const popupConfirm = new PopupWithConfirmation(confirmSelector);

//попап редактирования формы профиля
const popupEditForm = new PopupWithForm({
  popupSelector: profileSelector,
  handleFormSubmit: (data) => {
    profileButton.textContent = "Сохранение...";
    api
      .setUserInfo({
        name: data.name,
        about: data.about,
      })
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileButton.textContent = "Сохранить";
      });
  },
});

//попап для добавления фото
const popupAddImage = new PopupWithForm({
  popupSelector: gallerySelector,
  handleFormSubmit: (item) => {
    galleryButton.textContent = "Сохранение...";
    api
      .addCard({ name: item.name, link: item.link })
      .then((data) => {
        renderList.addItem(createItem(data));
        popupAddImage.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        galleryButton.textContent = "Сохранить";
      });
  },
});

//попап аватара
const popupAvatar = new PopupWithForm({
  popupSelector: avatarSelector,
  handleFormSubmit: (item) => {
    avatarButton.textContent = "Сохранение...";
    api
      .addUserAvatar({ avatar: item.avatar_link })
      .then((data) => {
        userInfo.setAvatarInfo(data.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarButton.textContent = "Сохранить";
      });
  },
});

//слушатели на 5 попапа
popupEditForm.setEventListeners();
popupShowImage.setEventListeners();
popupAddImage.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();

//получение данных с сервера
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    renderList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// слушатели событий открытия попапа, сохранения изменений в попапе
buttonOpenProfile.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  bioInput.value = data.bio;
  profileFormValidation.clearError();
  popupEditForm.open();
});

buttonAddImage.addEventListener("click", () => {
  formAddValidation.clearError();
  popupAddImage.open();
});

avatarEditPhoto.addEventListener("click", () => {
  popupAvatar.open();
  avatarFormValidation.clearError();
});
