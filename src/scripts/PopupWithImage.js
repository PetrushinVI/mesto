import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor({popupImageTitle, popupImageItem}, selector) {
        super(selector);
        this.description = popupImageTitle;
        this.image = popupImageItem
    }

    openPopup(title, link) {
        this.image.src = link;
        this.image.alt = title;
        this.description.textContent = title;
        super.openPopup();
    }

}