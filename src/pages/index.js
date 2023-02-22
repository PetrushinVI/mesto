import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css'
import {
    infoBtn, addCard, formAddCard, profileForm, cardContainer, popupImageItem, popupImageTitle, initialCards, validationConfig, userData
} from '../scripts/utils/constants';

function createCard(cardData) {
    const card = new Card(cardData,'#card-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

const rendererCard = new Section({
        data: initialCards,
        renderer: (cardData) => {
            const cardElement = createCard(cardData);
            rendererCard.addDefaultItem(cardElement);
        }
    },
    cardContainer
)

const profilePopup = new PopupWithForm({
    selector: '.edit-profile',
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData);
    }
})

const cardPopup = new PopupWithForm({
    selector: '.add-card',
    handleFormSubmit: (formData) => {
        const cardElement = createCard(formData);
        rendererCard.addUserItem(cardElement);
    }
});

const userInfo = new UserInfo(userData);
const imagePopup = new PopupWithImage({popupImageTitle, popupImageItem}, '.popup-image');
const profileValidation = new FormValidator(validationConfig, profileForm);
const cardValidation = new FormValidator(validationConfig, formAddCard);


const handleCardClick = (title, link) => imagePopup.openPopup(title, link);

rendererCard.rendererItems();

addCard.addEventListener('click', () => {
    cardValidation.disableButton();
    cardPopup.openPopup();
})

infoBtn.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profilePopup.openPopup();
})

profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();


profileValidation.enableValidation();
cardValidation.enableValidation();
























