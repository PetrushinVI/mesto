import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor(selector, deleteClick) {
        super(selector);
        this._submitButton = this._popup.querySelector('.form__btn');
        this._popupForm = this._popup.querySelector('.form');
        this._deleteClick = deleteClick;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Удаление...';
        } else {
            this._submitButton.textContent = 'Да';
        }
    }

    open(id, cardItem) {
        super.open()
        this._id = id;
        this._card = cardItem
    }

    deleteCard() {
        this._card.remove();
    }

    setEventListeners() {

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._deleteClick(this._id, this._card)
        });
        super.setEventListeners();
    }
}