const infoBtn = document.querySelector('.profile__btn');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.form__close');
const form = document.querySelector('.form');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');

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



