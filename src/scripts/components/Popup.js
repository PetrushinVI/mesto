export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closeElement = this._popup.querySelector('.popup__close')
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _closeClickOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._closeElement.addEventListener('click', () => {
            this.closePopup();
        })
        this._popup.addEventListener('mousedown', (evt) => {
            this._closeClickOverlay(evt)
        })
    }
}