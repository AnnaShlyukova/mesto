export class FormValidator {
  constructor(validationSelectors, formElement) {
    this._formSelector = validationSelectors.formSelector;
    this._inputSelector = validationSelectors.inputSelector;
    this._submitButtonSelector = validationSelectors.submitButtonSelector;
    this._inactiveButtonClass = validationSelectors.inactiveButtonClass;
    this._inputErrorClass = validationSelectors.inputErrorClass;
    this._errorClass = validationSelectors.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  //Метод отображения ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  //Метод скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  }

  //Метод проверки корректности введенных данных
  _checkInputValidity(inputElement) {
    //если поле не валидно, то показываем ошибку
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      //иначе скрываем ошибку
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Метод проверки валидности всех полей формы
  _hasInvalidInput() {
    //проходим по всему массиву полей, если хотя бы одно невалидное поле, то true
    //если все поля валидны, то false
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Метод включения-отключения кнопки
  _toggleButtonState() {
    //если есть хотя бы одно невалидное поле делаем кнопку неактивной
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      //если все валидно, то делаем активной
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //Метод удаления ошибки из формы и делаем кнопку неактивной
  clearError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  //Метод добавления обработчиков сразу всем полям формы
  _setEventListeners() {
    //вызываем функцию проверки состояния кнопки при первой загрузки страницы
    this._toggleButtonState();
    //обходим все поля формы и добавляем каждому полю обработчик события input и проверку валидности формы
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        //вызываем функцию проверки состояния кнопки при каждом вводе
        this._toggleButtonState();
      });
    });
  }

  //Публичный метод валидации формы
  enableValidation() {
    this._setEventListeners(); //вызываем для всех форм функцию добавления обработчиков всех полей формы
  }
}
