export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._title = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.element__picture');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._card.querySelector('.element__text').textContent = this._title;
        this._cardDeleteButton = this._card.querySelector('.element__delete');
        this._cardLikeButton = this._card.querySelector('.element__btn');
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._link));
        this._cardDeleteButton.addEventListener('click', () => this._handleDeleteButton());
        this._cardLikeButton.addEventListener('click', this._handleLikeButton);
    }

    _handleLikeButton = function (evt) {
        evt.target.classList.toggle('element__btn_active');
    }

    _handleDeleteButton = () => {
        this._card.remove();
        this._card = null;
    }
}
