const infoBtn = document.querySelector('.profile__btn');
const addCard = document.querySelector('.profile__add-btn');
const popup = document.querySelector('.popup');
const popupAddCard = document.getElementById('add-card');
const inputNameAddCard = document.getElementById('nameAddCardInput');
const inputLinkAddCard = document.getElementById('linkAddCardInput');
const formAddCard = popupAddCard.querySelector('.form');
const popupClose = popup.querySelector('.form__close');
const popupAddCardClose = popupAddCard.querySelector('.form__close');
const form = document.querySelector('.form');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
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

const handleDeleteCard = (event) => {
    event.target.closest('.element').remove();
}

const handleLikeCard = (event) => {
    event.target.closest('.element__btn').classList.toggle('element__btn_active');
}


// попап картинок
function openPopupImage() {
    popupImage.classList.add('popup_opened');
}

function closePopupImage () {
    popupImage.classList.remove('popup_opened');
}

closeImagePopup.addEventListener('click', closePopupImage);



const generateCard = (elemCard) => {
    const newCard = cardTemplate.cloneNode(true);
    const title = newCard.querySelector('.element__text');
    const link = newCard.querySelector('.element__picture');
    title.textContent = elemCard.name;
    link.setAttribute('src', `${elemCard.link}`);
    link.setAttribute('alt', `${elemCard.name}`);
    const deleteBtn = newCard.querySelector('.element__delete');
    deleteBtn.addEventListener('click', handleDeleteCard);
    const likeBtn = newCard.querySelector('.element__btn');
    likeBtn.addEventListener('click', handleLikeCard);
    link.addEventListener('click', function () {
        popupImageItem.src = elemCard.link;
        popupImageItem.alt = elemCard.name;
        popupImageTitle.textContent = elemCard.name;
        openPopupImage()
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
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

infoBtn.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup();
}

form.addEventListener('submit', formSubmitHandler);



// попап добавления карточек
function openPopupAddCard() {
    popupAddCard.classList.add('popup_opened');
}

function closePopupAddCard () {
    popupAddCard.classList.remove('popup_opened');
}

addCard.addEventListener('click', openPopupAddCard);

popupAddCardClose.addEventListener('click', closePopupAddCard);

const handleSubmitAddCard = (event) => {
    event.preventDefault();
    renderCard({name:inputNameAddCard.value,link:inputLinkAddCard.value});
    inputNameAddCard.value='';
    inputLinkAddCard.value='';
    closePopupAddCard();
}

formAddCard.addEventListener('submit', handleSubmitAddCard);







