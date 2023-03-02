import Card from "../components/Card.js";
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import './index.css'
import {
    infoBtn,
    addCard,
    cardContainer,
    validationConfig,
    userData,
    editAvatarButton,
    popupDeleteCardButton,
    profileForm,
    popupFormAdd,
    popupFormAvatar,
    inputNameCard,
    inputUrlCard,
    inputName,
    inputAbout,
    inputAvatarName,
    popupAvatarButton
} from '../utils/constants';

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
const popupConfirmation = new PopupWithConfirmation('.popup_card-delete', (id, card) => deleteClick(id, card));

const cardList = new Section(
    {
        renderer: (item) => {
            cardList.addItemAppend(createCard(item))
        },
    },
    cardContainer
)

const popupEditAvatar = new PopupWithForm('.popup_avatar', () => {
    popupEditAvatar.renderLoading(true);
    api.editUserAvatar(inputAvatarName.value)
        .then((data) => {
            userInfo.setUserInfo(data);
            popupEditAvatar.close();
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            popupEditAvatar.renderLoading(false);
        });
});

const popupEditProfile = new PopupWithForm('.popup_profile', (data) => {
    popupEditProfile.renderLoading(true);
    api.editUserInfo(data.inputName, data.inputAbout)
        .then((data) => {
            userInfo.setUserInfo(data);
            popupEditProfile.close()
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            popupEditProfile.renderLoading(false)
        })
})

const popupAddCard = new PopupWithForm('.popup_cards',
    (data) => {
        popupAddCard.renderLoading(true);
        api.addCard(data.inputNameCard, data.inputUrlCard)
            .then((data) => {
                cardList.addItem(createCard(data));
                popupAddCard.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => popupAddCard.renderLoading(false));
    });


const createCard = (data) => {
    const newCard = new Card(data, userId, '#card-template', {
        cardClick: (name, link) => {
            popupBigImage.open(name, link)
        },
        likeClick: (id) => {
            if (newCard.checkLike()) {
                api.deleteLike(id)
                    .then((res) => {
                        newCard.setLike(res.likes)
                    })
                    .catch((err) => console.log(err))
            } else {
                api.addLike(id)
                    .then((res) => {
                        newCard.setLike(res.likes)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        deleteClick: (id, card) => {
            popupConfirmation.open(id, card)
        }
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
        })
        .finally(() => popupConfirmation.renderLoading(false))
}

const renderInitialCard = (items) => {
    cardList.renderItems(items)
};

let userId = null;

Promise.all([api.getUserInfo(), api.getInitialCard()])
    .then(([data, items]) => {
        userInfo.setUserInfo(data);
        userId = data._id;
        renderInitialCard(items)
    })
    .catch((err) => {
        console.log(err)
    });


popupAvatarButton.addEventListener('click', () => {
    avatarValidation.resetValidation();
    popupEditAvatar.open();
});

infoBtn.addEventListener('click', () => {
    profileValidation.resetValidation();
    profileValidation.toggleButtonState();
    const {name, about} = userInfo.getUserInfo()
    inputName.value = name;
    inputAbout.value = about;
    popupEditProfile.open();
});

addCard.addEventListener('click', function () {
    cardValidation.resetValidation();
    cardValidation.toggleButtonState();
    popupAddCard.open();
})


popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupBigImage.setEventListeners();
popupConfirmation.setEventListeners();


avatarValidation.enableValidation();
profileValidation.enableValidation();
cardValidation.enableValidation();




