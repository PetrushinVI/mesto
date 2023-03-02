import Card from "../scripts/components/Card.js";
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Api from '../scripts/components/Api.js';
import './index.css'
import {
    infoBtn, addCard, cardContainer, initialCards, validationConfig, userData,editAvatarButton,popupDeleteCardButton, profileForm,
    popupFormAdd, popupFormAvatar, inputNameCard, inputUrlCard,
    inputName, inputAbout, inputAvatarName, popupAvatarButton
} from '../scripts/utils/constants';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '4515d0f2-bb83-494a-804c-6a6db4ace47a',
        'Content-Type': 'application/json'
    }
});

const avatarValidation = new FormValidator(validationConfig, popupFormAvatar);
const profileValidation = new FormValidator(validationConfig, profileForm);
const cardValidation = new FormValidator(validationConfig, popupFormAdd);

const userInfo = new UserInfo({
    userName: '.profile__name',
    userInfo: '.profile__description',
    userAvatar: '.profile__avatar'
})

const popupBigImage = new PopupWithImage('.popup_type_big-img');
const popupConfirmation = new PopupWithConfirmation ('.popup_card-delete', (id, card) => deleteClick(id, card));

const cardList = new Section (
    {
        data: initialCards,
        renderer: (item) => {cardList.addItemAppend(createCard(item))},
    },
    cardContainer
)

const editAvatar = new PopupWithForm ('.popup_avatar', () => {
    editAvatar.renderLoading(true);
    api.editUserAvatar(inputAvatarName.value)
        .then((data) => {
            userInfo.setUserInfo(data);
            editAvatar.close();
        })
        .catch((err) => {console.error(err)})
        .finally(() => {editAvatar.renderLoading(false);
        });
});

const editProfile = new PopupWithForm ('.popup_profile', (data) => {
    editProfile.renderLoading(true);
    api.editUserInfo(data.inputName, data.inputAbout)
        .then((data) => {
            userInfo.setUserInfo(data);
            editProfile.close()
        })
        .catch((err) => {console.error(err)})
        .finally(() => {editProfile.renderLoading(false)})
})

const popupAddCard = new PopupWithForm ('.popup_cards',
    (data) => {
        popupAddCard.renderLoading(true);
        api.addCard(data.inputNameCard, data.inputUrlCard)
            .then((data) => {
                cardList.addItem(createCard(data));
                popupAddCard.close();})
            .catch((err) => {console.error(err);})
            .finally(() => popupAddCard.renderLoading(false));
    });


const createCard = (data) => {
    const newCard = new Card(data, userId, '#card-template', {
        cardClick: (name, link) => {popupBigImage.open(name, link)},
        likeClick: (id) => {
            if (newCard.checkLike()){
                 api.deleteLike(id)
                 .then((res) => {newCard.setLike(res.likes)})
                 .catch((err) => console.log(err))}
            else {
                 api.addLike(id)
                 .then((res) => {newCard.setLike(res.likes)})
                 .catch((err) => {console.log(err)})
            }
        },
        deleteClick: (id, card) => {popupConfirmation.open(id, card)}
    })

    return newCard.createElement()
}

const deleteClick = (id, card) => {
    popupConfirmation.renderLoading(true);
    api.deleteCard(id)
        .then(() => {
            popupConfirmation.deleteCard();
            popupConfirmation.close()
        })
        .catch((error) => {
            console.log(error)
                .finally(() => popupConfirmation.renderLoading(false))
        })
}

const renderInitialCard = (items) => {cardList.renderItems(items)};

let userId = null;

Promise.all([api.getUserInfo(), api.getInitialCard()])
    .then(([data, items]) => {
        userInfo.setUserInfo(data);
        userId = data._id;
        renderInitialCard(items)
    })
    .catch((err) => {console.log(err)});


popupAvatarButton.addEventListener('click', () => {
    avatarValidation.resetValidation();
    editAvatar.open();
});

infoBtn.addEventListener('click', () => {
    profileValidation.resetValidation();
    profileValidation.toggleButtonState();
    const { name, about } = userInfo.getUserInfo()
    inputName.value = name;
    inputAbout.value = about;
    editProfile.open();
});

addCard.addEventListener('click', function () {
    cardValidation.resetValidation();
    cardValidation.toggleButtonState();
    popupAddCard.open();
})


editAvatar.setEventListeners();
editProfile.setEventListeners();
popupAddCard.setEventListeners();
popupBigImage.setEventListeners();
popupConfirmation.setEventListeners();


avatarValidation.enableValidation();
profileValidation.enableValidation();
cardValidation.enableValidation();




