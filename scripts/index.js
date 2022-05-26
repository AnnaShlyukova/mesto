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
/*const popup = document.querySelector('.popup');*/
const popupProfile = document.querySelector('.popup__profile');
const popupGallery = document.querySelector('.popup__gallery');
const popupImage = document.querySelector('.popup__image-view');
const closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let nameInput = document.querySelector('#profile-name');
let bioInput = document.querySelector('#profile-bio');
const openButtonadd = document.querySelector('.profile__button-add_open-popup');
let nameImage = document.querySelector('#gallery-name');
let linkImage = document.querySelector('#gallery-link');
const gallery = document.querySelector('.gallery');
const listElement = document.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-template').content;
const itemElement = galleryTemplate.cloneNode(true);



function renderList(data) {
  data.forEach((item) => renderItem(item));
}
function deleteButtonItem (event) {
  let buttonElement = event.target;
  let listItemElement = buttonElement.closest(".gallery__item");
  listItemElement.remove();
}

function likeButtonItem (event) {
  let buttonElement = event.target;
  buttonElement.classList.toggle('gallery__like_active');
}
/* функция открытия попапа с прописанными значениями из профиля*/
function togglePopup (event) {
  popupProfile.classList.toggle('popup_opened');
  if (popupProfile.classList.contains('popup_opened')) {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}
}

function openPopupGallery(event) {
  popupGallery.classList.add('popup_opened');
}
function openPopupImage(event) {
  popupImage.classList.add('popup_opened');
}



function renderItem(data) {
  const itemElement = galleryTemplate.cloneNode(true);/*клонируем содержимое template*/
  let galleryImage = itemElement.querySelector(".gallery__image");
  const galleryTitle = itemElement.querySelector(".gallery__title");
  galleryImage.src = data.link; /*передаем значение атрибутов из массива*/
  galleryTitle.textContent = data.name;
  galleryImage.alt = data.name;
  let buttonlikeElement = itemElement.querySelector(".gallery__like");
  buttonlikeElement.addEventListener('click', likeButtonItem); /*ставим лайк*/
  let buttondeletElement = itemElement.querySelector(".gallery__button-delete");
  buttondeletElement.addEventListener('click', deleteButtonItem);

/*открываем попап с картинкой*/
  itemElement.querySelector(".gallery__image").addEventListener('click', function (event){
    openPopupImage();
    popupImage.querySelector('.popup__image').src = `${event.target.src}`;
    popupImage.querySelector('.popup__image').alt = `${event.target.alt}`;
    popupImage.querySelector('.popup__image-caption').textContent = `${event.target.alt}`;
  });

  listElement.append(itemElement); /*вставляемкарточки в конец списка*/
}
renderList(initialCards);/*загружаем 6 карточек из массива на сайт*/


// функция обновления информации после внесения изменений в форму*/
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  togglePopup();
}



// слушатели событий открытия попапа, закрытия попапа, сохранения изменений в попапе
openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
openButtonadd.addEventListener('click', openPopupGallery);
formElement.addEventListener('submit', formSubmitHandler);
