!function(){"use strict";class e{constructor(e,t,s,n,r,i){this._name=e.name,this._link=e.link,this._likes=e.likes,this._ownerId=e.owner._id,this._id=e._id,this._userId=r,this._cardSelector=i,this._handleCardClick=s,this._openImageView=n,this._likeCard=t,this._element=this._getTemplate(),this._buttonLikeElement=this._element.querySelector(".gallery__like"),this._likeCount=this._element.querySelector(".gallery__like-count"),this._buttonDeletElement=this._element.querySelector(".gallery__button-delete"),this._galleryTitle=this._element.querySelector(".gallery__title"),this._galleryImage=this._element.querySelector(".gallery__image")}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".gallery__item").cloneNode(!0)}_deleteIcon(){this._ownerId===this._userId&&this._buttonDeletElement.classList.add("gallery__button-delete_visible")}generateCard(){this._galleryImage.src=this._link,this._galleryTitle.textContent=this._name,this._galleryImage.alt=this._name,this._likeCount.textContent=this._likes.length}handleDeleteCard(){this._element.remove(),this._element=null}checkLike(){return this._buttonLikeElement.classList.contains("gallery__like_active")}setIdCard(){return this._element.dataset.id=this._id,this._cardId=this._element.dataset.id,console.log(this._id),this._cardId}updateLikes(e){this._data=e,this._likeCount.textContent=this._data.likes.length,this._buttonLikeElement.classList.toggle("gallery__like_active",!this.checkLike())}_isLiked(){this._likes.forEach((e=>{e._id===this._userId&&this._buttonLikeElement.classList.add("gallery__like_active")}))}_setEventListener(){this._buttonLikeElement.addEventListener("click",(()=>{this._likeCard(this)})),this._buttonDeletElement.addEventListener("click",(()=>{this._handleCardClick(this)})),this._galleryImage.addEventListener("click",(()=>{this._openImageView(this._name,this._link)}))}createCard(){return this.setIdCard(),this._isLiked(),this._setEventListener(),this._deleteIcon(),this.generateCard(),this._element}}class t{constructor(e,t){this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}_showInputError(e,t){const s=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),s.classList.add(this._errorClass),s.textContent=t}_hideInputError(e){const t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._inactiveButtonClass))}clearError(){this._inputList.forEach((e=>{this._hideInputError(e)})),this._toggleButtonState()}_setEventListeners(){this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}enableValidation(){this._setEventListeners()}}class s{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popup.addEventListener("mousedown",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__button-close"))&&this.close()}))}}class n extends s{constructor(e){let{popupSelector:t,handleFormSubmit:s}=e;super(t),this._form=this._popup.querySelector(".popup__form"),this._inputList=this._form.querySelectorAll(".popup__input"),this._handleFormSubmit=s,this._popupButton=this._form.querySelector(".popup__button"),this._popupButtonText=this._popupButton.textContent}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())}))}close(){super.close(),this._form.reset()}renderLoading(e){this._popupButton.textContent=e?"Сохранение...":this._popupButtonText}}document.querySelector(".popup-avatar").querySelector(".popup__button");const r=document.querySelector(".profile__photo"),i=(document.querySelector(".popup_content_gallery").querySelector(".popup__button"),document.querySelector(".popup_content_profile").querySelector(".popup__button"),document.querySelector(".profile__button-edit_open-popup")),o=document.querySelector(".profile__button-add_open-popup"),a=document.forms.profileForm,l=a.elements.nameInput,h=a.elements.bioInput,_=document.forms.addForm,c=document.forms.avatarEdit,u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};let d;const p=new class{constructor(e){this._url=e.url,this._headers=e.headers}_checkResponse(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}getCards(){return fetch("".concat(this._url,"cards"),{method:"GET",headers:this._headers}).then(this._checkResponse)}getUserInfo(){return fetch("".concat(this._url,"users/me"),{method:"GET",headers:this._headers}).then(this._checkResponse)}setUserInfo(e){let{name:t,about:s}=e;return fetch("".concat(this._url,"users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:s})}).then(this._checkResponse)}addCard(e){let{name:t,link:s}=e;return fetch("".concat(this._url,"cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:s})}).then(this._checkResponse)}deleteCard(e){return fetch("".concat(this._url,"cards/").concat(e),{method:"DELETE",headers:this._headers,body:JSON.stringify({_id:"".concat(e)})}).then(this._checkResponse)}addUserAvatar(e){let{avatar:t}=e;return fetch("".concat(this._url,"users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then(this._checkResponse)}changeLikeCard(e,t){return fetch("".concat(this._url,"cards/likes/").concat(e),{method:t?"DELETE":"PUT",headers:this._headers}).then(this._checkResponse)}}({url:"https://nomoreparties.co/v1/cohort-46/",headers:{authorization:"fca940e1-04e1-4b78-84e8-f1d5400ed073","Content-Type":"application/json"}}),m=new t(u,a),E=new t(u,_),g=new t(u,c);g.enableValidation(),m.enableValidation(),E.enableValidation();const v=t=>{const s=new e(t,(e=>{p.changeLikeCard(e.setIdCard(),e.checkLike()).then((t=>{e.updateLikes(t)})).catch((e=>console.log(e)))}),(()=>{b.handleConfirm((()=>{p.deleteCard(t._id).then((()=>{s.handleDeleteCard(),b.close()})).catch((e=>{console.log(e)}))})),b.open()}),((e,t)=>{L.open(e,t)}),d,"#gallery-template");return s.createCard()},f=new class{constructor(e,t){this._renderer=e,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}renderItems(e){e.reverse().forEach((e=>{this.addItem(this._renderer(e))}))}}(v,".gallery__list"),y=new class{constructor(e,t,s){this._nameElement=document.querySelector(e),this._bioElement=document.querySelector(t),this.avatar=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,bio:this._bioElement.textContent}}setUserInfo(e){this._nameElement.textContent=e.name,this._bioElement.textContent=e.about,this.setAvatarInfo(e.avatar)}setAvatarInfo(e){this.avatar.src=e}}(".profile__name",".profile__bio",".profile__avatar"),L=new class extends s{constructor(e){super(e),this._image=this._popup.querySelector(".popup__image"),this._title=this._popup.querySelector(".popup__image-caption")}open(e,t){this._image.src=t,this._title.textContent=e,this._image.alt=e,super.open()}}(".popup_content_image-view"),b=new class extends s{constructor(e){super(e),this._form=this._popup.querySelector(".popup__form")}handleConfirm(e){this._handleSubmit=e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit()}))}}(".popup_confirm"),S=new n({popupSelector:".popup_content_profile",handleFormSubmit:e=>{S.renderLoading(!0),p.setUserInfo({name:e.nameInput,about:e.bioInput}).then((e=>{y.setUserInfo(e),S.close()})).catch((e=>{console.log(e)})).finally((()=>{S.renderLoading(!1)}))}}),k=new n({popupSelector:".popup_content_gallery",handleFormSubmit:e=>{k.renderLoading(!0),p.addCard({name:e.name,link:e.link}).then((e=>{f.addItem(v(e)),k.close()})).catch((e=>{console.log(e)})).finally((()=>{k.renderLoading(!1)}))}}),C=new n({popupSelector:".popup-avatar",handleFormSubmit:e=>{C.renderLoading(!0),p.addUserAvatar({avatar:e.avatar}).then((e=>{console.log(e),y.setAvatarInfo(e.avatar),C.close()})).catch((e=>{console.log(e)})).finally((()=>{C.renderLoading(!1)}))}});S.setEventListeners(),L.setEventListeners(),k.setEventListeners(),b.setEventListeners(),C.setEventListeners(),Promise.all([p.getUserInfo(),p.getCards()]).then((e=>{let[t,s]=e;d=t._id,y.setUserInfo(t),f.renderItems(s)})).catch((e=>{console.log(e)})),i.addEventListener("click",(()=>{const e=y.getUserInfo();l.value=e.name,h.value=e.bio,m.clearError(),S.open()})),o.addEventListener("click",(()=>{E.clearError(),k.open()})),r.addEventListener("click",(()=>{C.open(),g.clearError()}))}();