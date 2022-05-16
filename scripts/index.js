// задаю переменные
const openButton = document.querySelector('.profile__button-edit_open-popup');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let nameInput = document.querySelector('.popup__input_type_name');
let bioInput = document.querySelector('.popup__input_type_bio');

// функция открытия попапа с прописанными значениями из профиля
function togglePopup (){
  popup.classList.toggle('popup__opened');
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
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
