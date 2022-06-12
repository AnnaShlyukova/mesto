const validationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//функция отображения ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  formSettings
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formSettings.inputErrorClass);
  errorElement.classList.add(formSettings.errorClass);
  errorElement.textContent = errorMessage;
};

//функция срытия ошибки
const hideInputError = (formElement, inputElement, formSettings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formSettings.inputErrorClass);
  errorElement.classList.remove(formSettings.errorClass);
};

//функция проверки корректности введенных данных
const checkInputValidity = (formElement, inputElement, formSettings) => {
  //если поле не валидно, то показываем ошибку
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formSettings
    );
    //иначе скрываем ошибку
  } else {
    hideInputError(formElement, inputElement, formSettings);
  }
};

//задаем функцию проверки валидности всех полей формы
const hasInvalidInput = (inputList) => {
  //проходим по всему массиву полей, если хотя бы одно невалидное поле, то true
  //если все поля валидны, то false
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//задаем функцию включения-отключения кнопки
const toggleButtonState = (inputList, buttonElement, formSettings) => {
  //если есть хотя бы одно невалидное поле делаем кнопку неактивной
  if (hasInvalidInput(inputList)) {
    if (!buttonElement.classList.contains(formSettings.inactiveButtonClass)) {
      buttonElement.classList.add(formSettings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    }
  } else {
    //если все валидно, то делаем активной
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(formSettings.inactiveButtonClass);
  }
};

//удаляем ошибки из формы и делаем кнопку неактивной
const clearError = (formElement, buttonElement, formSettings) => {
  const errorSpan = formElement.querySelectorAll(`.${formSettings.errorClass}`);
  const errorInputs = formElement.querySelectorAll(
    `.${formSettings.inputErrorClass}`
  );
  clearClassError(errorSpan, formSettings.errorClass);
  clearClassError(errorInputs, formSettings.inputErrorClass);
  inactiveButton(buttonElement, formSettings);
};

//удаляем класс ошибки с элементов
const clearClassError = (elements, className) => {
  elements.forEach((span) => {
    span.classList.remove(className);
  });
};

//делаем кнопку неактивной
function inactiveButton(buttonElement, formSettings) {
  buttonElement.classList.add(formSettings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

//задаем функцию, которая добавляет обработчики сразу всем полям формы
const setEventListeners = (formElement, formSettings) => {
  //находим все поля внутри формы и делаем из них массив
  const inputList = Array.from(
    formElement.querySelectorAll(formSettings.inputSelector)
  );
  //находим кнопку сабмита формы
  const buttonElement = formElement.querySelector(
    formSettings.submitButtonSelector
  );
  //вызываем функцию проверки состояния кнопки при первой загрузки страницы
  toggleButtonState(inputList, buttonElement, formSettings);
  //обходим все поля формы и добавляем каждому полю обработчик события input и проверку валидности формы
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, formSettings);
      //вызываем функцию проверки состояния кнопки при каждом вводе
      toggleButtonState(inputList, buttonElement, formSettings);
    });
  });
  //добавляем слушателя событий на форму для очистки ошибок и отключения кнопки
  formElement.addEventListener("reset", () =>
    clearError(formElement, buttonElement, formSettings)
  );
};

//функция валидации формы
const enableValidation = (formSettings) => {
  const formList = Array.from(
    document.querySelectorAll(formSettings.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formSettings); //вызываем для всех форм функцию добавления обработчиков всех полей формы
  });
};
