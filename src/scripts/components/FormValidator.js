export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
        this._buttonElement = this._form.querySelector(config.submitButtonSelector);
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        }
        else {
            this._showInputError(input);
        }
    }

    _showInputError(input) { 
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        errorElement.textContent = input.validationMessage;
        input.classList.add(this._config.errorClass);
      }

    _hideInputError(input) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        errorElement.textContent = '';
        input.classList.remove(this._config.errorClass);
      }

    _hasInvalidInput() {
        return this._inputList.some((input) => !input.validity.valid);
      }

    _toggleButtonState(inputList) {
        if (this._hasInvalidInput(inputList)) {
            this.disableButton()
        }
        else {
            this._enableButton()
        }
    }

    _enableButton() {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    disableButton() {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
      }

    _setEventListeners() {
         this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
               this._checkInputValidity(input);
               this._toggleButtonState(this._buttonElement, this._inputList);
              });
            });
         this._form.addEventListener('reset', () =>  setTimeout(() => {}, 0));
          };


    enableValidation() {
            this._form.addEventListener('submit', (evt) => evt.preventDefault());
            this._setEventListeners();
          }
      }
