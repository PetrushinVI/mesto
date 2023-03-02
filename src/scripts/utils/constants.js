const infoBtn = document.querySelector('.profile__btn');
const editProfile = document.querySelector('.edit-profile');
const addCard = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.elements');
const popupImage = document.querySelector('.popup-image');
const profileAvatar = document.querySelector('.profile__avatar');
const editAvatarButton = document.querySelector('.profile__avatar_edit');
const popupDeleteCardButton = document.querySelector('.popup__button_type_delete');
const profileForm = document.forms['profileForm'];
const popupFormAdd = document.forms['popupFormAdd'];
const popupFormAvatar = document.querySelector('.popup__form_type_avatar');
const inputNameCard = document.querySelector('.form__input_type_name-card');
const inputUrlCard = document.querySelector('.form__input_type_url-card');
const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');
const inputAvatarName = document.querySelector('.form__input_type_avatar');
const popupAvatarButton = document.querySelector('.profile__avatar-button');

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
    inputErrorClass: 'form__input_type_error',
    errorClass: 'popup__error_visible',
};
const userData = {
    name: profileName,
    about: profileAbout,
    avatar: profileAvatar
}

export {
    infoBtn, addCard, cardContainer, initialCards, validationConfig, userData,editAvatarButton,popupDeleteCardButton, profileForm,
    popupFormAdd, popupFormAvatar, inputNameCard, inputUrlCard,
    inputName, inputAbout, inputAvatarName, popupAvatarButton
};