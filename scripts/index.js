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
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup__profile');
const popupGallery = document.querySelector('.popup__gallery');
const popupImage = document.querySelector('.popup__image-view');

const nameGalleryInput = document.querySelector('#gallery-name');
const linkGalleryInput = document.querySelector('#gallery-link');
const nameInput = document.querySelector('#profile-name');
const bioInput = document.querySelector('#profile-bio');

const formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');


const openButton = document.querySelector('.profile__button-edit_open-popup');
const openButtonadd = document.querySelector('.profile__button-add_open-popup');
const closeButton = document.querySelectorAll('.popup__button-close');

const listElement = document.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-template').content;
const itemElement = galleryTemplate.cloneNode(true);

/*функция удаления фото*/
function deleteButtonItem (event) {
  let buttonElement = event.target;
  let listItemElement = buttonElement.closest(".gallery__item");
  listItemElement.remove();
}

/*функция лайка фото*/
function likeButtonItem (event) {
  let buttonElement = event.target;
  buttonElement.classList.toggle('gallery__like_active');
}


/* функция открытия попапа с прописанными значениями из профиля*/
function OpenPopupProfile (event) {
  popupProfile.classList.add('popup_opened');
  if (popupProfile.classList.contains('popup_opened')) {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}
}
 /*функция открытия попапа для добавления фото*/
function openPopupGallery(event) {
  popupGallery.classList.add('popup_opened');
}

/*функция открытия попапа просмотра фото*/
function openPopupImage(event) {
  popupImage.classList.add('popup_opened');
  popupImage.querySelector('.popup__image').src = `${event.target.src}`;
  popupImage.querySelector('.popup__image').alt = `${event.target.alt}`;
  popupImage.querySelector('.popup__image-caption').textContent = `${event.target.alt}`;
}


// слушатели событий открытия попапа, сохранения изменений в попапе
openButton.addEventListener('click', OpenPopupProfile);
openButtonadd.addEventListener('click', openPopupGallery);

function createItem(data) {
  const itemElement = galleryTemplate.cloneNode(true);/*клонируем содержимое template*/
  let galleryImage = itemElement.querySelector(".gallery__image");
  const galleryTitle = itemElement.querySelector(".gallery__title");
  galleryImage.src = data.link; /*передаем значение атрибутов из массива*/
  galleryTitle.textContent = data.name;
  galleryImage.alt = data.name;
  let buttonlikeElement = itemElement.querySelector(".gallery__like");
  buttonlikeElement.addEventListener('click', likeButtonItem); /*ставим лайк*/
  let buttondeletElement = itemElement.querySelector(".gallery__button-delete");/*удаляем фото*/
  buttondeletElement.addEventListener('click', deleteButtonItem);
/*открываем попап с картинкой*/
  itemElement.querySelector(".gallery__image").addEventListener('click', openPopupImage);
  return itemElement;
}

/*рендерим фото*/
function renderItem (itemElement) {
  listElement.prepend(itemElement);
}

/*рендерим все фото*/
function renderList(data) {
  data.reverse().forEach((item) => renderItem(createItem(item)));
}

/*загружаем 6 карточек из массива на сайт*/
renderList(initialCards);

/*функция добавления фото через форму*/
function formAddImage(event) {
  event.preventDefault();
  const name = nameGalleryInput.value;
  const link = linkGalleryInput.value;
  /*задаю условие  для запрета пустого ввода*/
  if (name && name.trim(" ") ==="" || link && link.trim(" ") ==="") {
    alert('wrong or empty input');
    return;
  }
  renderItem(createItem({name, link}));
  closePopup(popupGallery);
  /*обнуляем значения формы после ее закрытия*/
  nameGalleryInput.value = null;
  linkGalleryInput.value = null;
  }

/*слушатель добавления фото через форму*/
popupGallery.addEventListener('submit', formAddImage);

/*функция обновления информации после внесения изменений в форму*/
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(popupProfile);
}

// слушатели событий сохранения изменений в попапе
formElement.addEventListener('submit', formSubmitHandler);

/*закрытие любого попапа*/
function closePopup(item) {
item.classList.remove('popup_opened')
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__button-close')){
      closePopup(popup);
    };
  })
})
