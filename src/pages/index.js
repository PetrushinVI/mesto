import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';


const infoBtn = document.querySelector('.profile__btn');
const editProfile = document.querySelector('.edit-profile');
const addCard = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.add-card');
const formAddCard = popupAddCard.querySelector('.form');
const form = editProfile.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.elements');
const popupImage = document.querySelector('.popup-image');
const popupImageItem = popupImage.querySelector('.popup__image-item');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
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
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_disabled',
    errorClass: 'form__input_type_error',
};
const userData = {
    name: profileName,
    job: profileAbout
}



const rendererCard = new Section({
        data: initialCards,
        renderer: (cardData) => {
            const card = new Card(cardData, '#card-template', handleCardClick);
            const cardElement = card.generateCard();
            rendererCard.addDefaultItem(cardElement);
        }
    },
    cardContainer
)

const profileInfo = new PopupWithForm({
    selector: '.edit-profile',
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData);
    }
})

const newCard = new PopupWithForm({
    selector: '.add-card',
    handleFormSubmit: (formData) => {
        const userCard = new Card(formData, '#card-template', handleCardClick);
        const cardElement = userCard.generateCard();
        rendererCard.addUserItem(cardElement);
    }
});

const userInfo = new UserInfo(userData);
const openImage = new PopupWithImage({popupImageTitle, popupImageItem}, '.popup-image');
const profileValidation = new FormValidator(validationConfig, form);
const cardValidation = new FormValidator(validationConfig, formAddCard);


const handleCardClick = (title, link) => openImage.openPopup(title, link);

rendererCard.rendererItems();

addCard.addEventListener('click', () => {
    formAddCard.reset();
    cardValidation.disableButton();
    newCard.openPopup();
})

infoBtn.addEventListener('click', () => {
    profileInfo.setInputValues(userInfo.getUserInfo());
    profileInfo.openPopup();
})

profileInfo.setEventListeners();
newCard.setEventListeners();
openImage.setEventListeners();


profileValidation.enableValidation();
cardValidation.enableValidation();
























