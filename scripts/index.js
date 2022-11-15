const infoBtn = document.querySelector('.info__btn');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.form__close');
const form = document.querySelector('.form');
let nameInput = document.querySelector('.nameInput');
let jobInput = document.querySelector('.jobInput');

infoBtn.addEventListener('click', () => {
   popup.classList.add('popup_opened');
});
popupClose.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    let newName = document.querySelector('.info__name');
    let newDiscription = document.querySelector('.info__description');
    newName.textContent = nameInput.value;
    newDiscription.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

form.addEventListener('submit', formSubmitHandler);



