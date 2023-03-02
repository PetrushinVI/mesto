export default class Card {
    constructor(data, userId, templateSelector, {cardClick, deleteClick, likeClick}) {
        this._data = data
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id
        this._userId = userId
        this._templateSelector = templateSelector;
        this._cardClick = cardClick;
        this._likeClick = likeClick;
        this._deleteClick = deleteClick;
        this._element = this._getTemplate();
        this._elementImg = this._cardElement.querySelector('.element__picture');
        this._elementTitle = this._cardElement.querySelector('.element__text');
        this._elementDelete = this._cardElement.querySelector('.element__delete');
        this._elementLike = this._cardElement.querySelector('.element__btn');
        this._counterLikes = this._cardElement.querySelector('.element__like-counter');
        this._isUserCard = userId === data.owner._id;
    };

    checkLike() {
        return this._likes.some(item => item._id === this._userId)
    }

    _addLike() {
        this._elementLike.classList.add('element__btn_active')
    }

    _deleteLike() {
        this._elementLike.classList.remove('element__btn_active')
    }

    _setListenersItems() {
        this._elementDelete.addEventListener('click', this._deleteClick);
        this._elementLike.addEventListener('click', () => {
            this._likeClick(this._cardId);
            this.toggleLikes();
        })
        this._elementImg.addEventListener('click', () => {
            this._cardClick(this._name, this._link)
        });
        if (!this._isUserCard) {
            this._elementDelete.remove();
            this._elementDelete = null;
        } else {
            this._elementDelete.addEventListener('click', () => {
                this._deleteClick(this._cardId, this._element)
            });
        }
    }

    _getTemplate() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return this._cardElement;
    }

    createElement() {
        this._elementTitle.textContent = this._name;
        this._elementImg.alt = this._name;
        this._elementImg.src = this._link;
        this.setLike(this._likes);
        this._setListenersItems();
        return this._element;
    }

    toggleLikes() {
        if (this.checkLike()) {
            this._addLike()
        } else {
            this._deleteLike()
        }
    }

    setLike(likesList) {
        this._likes = likesList
        this._counterLikes.textContent = this._likes.length
        this.toggleLikes()
    }
}




