// массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// задаю переменные
const openButton = document.querySelector('.profile__button-edit_open-popup');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let nameInput = document.querySelector('.popup__input_type_name');
let bioInput = document.querySelector('.popup__input_type_bio');
const gallery = document.querySelector('.gallery');
const listElement = document.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-template').content;

function renderList(data) {
  data.forEach((item) => renderItem(item));
}

function renderItem(data) {
  const itemElement = galleryTemplate.cloneNode(true);/*клонируем содержимое template*/
  const galleryImage = itemElement.querySelector(".gallery__image");
  const galleryTitle = itemElement.querySelector(".gallery__title");
  galleryImage.src = data.link; /*передаем значение атрибутов из массива*/
  galleryTitle.textContent = data.name;
  galleryImage.alt = data.name;
  btnlikeElement = itemElement.querySelector('.gallery__like').addEventListener("click", function(event) { /*ставим лайк*/
    event.target.classList.toggle('gallery__like_active');
  })
  listElement.append(itemElement); /*вставляемкарточки в конец списка*/
}
renderList(initialCards);/*загружаем 6 карточек из массива на сайт*/



/* функция открытия попапа с прописанными значениями из профиля*/
function togglePopup () {
  popup.classList.toggle('popup_opened')
  if (popup.classList.contains('popup_opened')) {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}
}

// функция обновления информации после внесения изменений в форму
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  togglePopup();
}

// слушатели событий открытия попапа, закрытия попапа, сохранения изменений в попапе
openButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
