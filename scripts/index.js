const infoBtn = document.querySelector('.profile__btn');
const editProfile = document.querySelector('#edit-profile');
const addCard = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('#add-card');
const inputNameAddCard = document.querySelector('#nameAddCardInput');
const inputLinkAddCard = document.querySelector('#linkAddCardInput');
const formAddCard = popupAddCard.querySelector('.form');
const popupClose = editProfile.querySelector('.form__close');
const popupAddCardClose = popupAddCard.querySelector('.form__close');
const form = editProfile.querySelector('.form');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');
const popupImage = document.querySelector('#popup-image');
const popupImageItem = popupImage.querySelector('.popup__image-item');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const closeImagePopup = document.querySelector('.popup__close');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const deleteCard = (event) => {
    event.target.closest('.element').remove();
}

const likeCard = (event) => {
    event.target.closest('.element__btn').classList.toggle('element__btn_active');
}

const openPopup = function (popup) {
    popup.classList.add('popup_opened');
};

const closePopup = function (popup) {
    popup.classList.remove('popup_opened')
};


// попап картинок

closeImagePopup.addEventListener('click', () => closePopup(popupImage));

const generateCard = (elemCard) => {
    const newCard = cardTemplate.cloneNode(true);
    const title = newCard.querySelector('.element__text');
    const link = newCard.querySelector('.element__picture');
    title.textContent = elemCard.name;
    link.setAttribute('src', `${elemCard.link}`);
    link.setAttribute('alt', `${elemCard.name}`);
    const deleteBtn = newCard.querySelector('.element__delete');
    deleteBtn.addEventListener('click', deleteCard);
    const likeBtn = newCard.querySelector('.element__btn');
    likeBtn.addEventListener('click', likeCard);
    link.addEventListener('click', function () {
        popupImageItem.src = elemCard.link;
        popupImageItem.alt = elemCard.name;
        popupImageTitle.textContent = elemCard.name;
        openPopup(popupImage);
    })

    return newCard;
};

const renderCard = (elemCard) => {
    cardContainer.prepend(generateCard(elemCard));
};

initialCards.forEach((elemCard) => {
    renderCard(elemCard);
});



// попап редактирования профиля

infoBtn.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    openPopup(editProfile);
});

popupClose.addEventListener('click', () => closePopup(editProfile));

function submitFormEditProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(editProfile);
}

form.addEventListener('submit', submitFormEditProfile);



// попап добавления карточек

addCard.addEventListener('click', () => openPopup(popupAddCard));

popupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

const submitAddCard = (event) => {
    event.preventDefault();
    renderCard({name:inputNameAddCard.value,link:inputLinkAddCard.value});
    event.target.reset();
    closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', submitAddCard);







