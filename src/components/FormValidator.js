export default class FormValidator {
    constructor(validationConfig, form) {
        this._config = validationConfig;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    }

    _getErrorElement(inputElement) {
        return this._form.querySelector(`#${inputElement.id}-error`);
    }


    _showError(inputElement, validationMessage) {
        const errorElement = this._getErrorElement(inputElement);
        const {errorClass, inputErrorClass} = this._config;
        errorElement.classList.add(errorClass);
        errorElement.textContent = validationMessage;
        inputElement.classList.add(inputErrorClass);
    }

    _hideError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        const {errorClass, inputErrorClass} = this._config;
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(inputErrorClass)
    }

    resetValidation = () => {
        this.toggleButtonState()
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
    }

    _checkValidateInput(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }

    toggleButtonState() {
        const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
        if (hasInvalidInput) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners = () => {
        this.toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkValidateInput(inputElement);
                this.toggleButtonState();
            });
            this._form.addEventListener('reset', () => {
                setTimeout(() => {
                    this.toggleButtonState();
                }, 0)
            })
        })
    };

    enableValidation = () => {
        this._setEventListeners()
    };
}




