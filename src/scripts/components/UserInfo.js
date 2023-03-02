export default class UserInfo {
    constructor({userName, userInfo, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        const data = {
            name: this._userName.textContent,
            about: this._userInfo.textContent
        }
        return data;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._userAvatar.src = data.avatar;
        this._userId = data.userId;
    }

}


