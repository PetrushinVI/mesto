import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.form');
        this._inputs = this._popup.querySelectorAll('.form__input');
        this._submitButtonElement = this._popup.querySelector('.form__btn');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach((input) => {
            this._formValues[input.name] = input.value
        });
        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    renderLoading(isLoading) {
        if (isLoading === true) {
            this._submitButtonElement.textContent = 'Сохранение...';
        } else {
            this._submitButtonElement.textContent = 'Сохранить';
        }
    }
}





