export default class Section {
    constructor({ renderer }, selectorContainer) {
        this._renderer = renderer;
        this._container = selectorContainer;
    }

    renderItems(items) {
        items.forEach(this._renderer)
    }

    addItem(item) {
        this._container.prepend(item);
    }

    addItemAppend(item) {
        this._container.append(item)
    }
}


