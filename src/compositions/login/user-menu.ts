/* eslint-disable import/extensions */
import { html, css, ScopedElementsMixin } from '@lion/core';
import { PropertyValueMap } from 'lit';
import { thumbsdown } from '../../components/icon/export-icons';
import { BcgModule } from '../../components/module';

export class BcgUserMenu extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [css``];
  }

  isOpen: boolean = false;

  clickHandler() {
    this.isOpen = !this.isOpen;
    this.requestUpdate();

    console.log(this.isOpen);
  }

  registerHandler() {
    console.log('deez',this)
  }


  connectedCallback(): void {
    super.connectedCallback();
  }

  protected updated():  void {
    const loginDialog:any  = this.shadowRoot?.querySelector('#login-dialog');
    const loginButton =  this.shadowRoot?.querySelector('#login-button');
    const closeButton =  this.shadowRoot?.querySelector('#close-button');


    const registerDialog:any  = this.shadowRoot?.querySelector('#register-dialog');
    const registerButton =  this.shadowRoot?.querySelector('#register-button');
    const closeButtonReg =  this.shadowRoot?.querySelector('#close-button-reg');
    

    const profileDialog:any  = this.shadowRoot?.querySelector('#edit-dialog');
    const editButton =  this.shadowRoot?.querySelector('#edit-button');
    const closeButtonEdit =  this.shadowRoot?.querySelector('#close-button-edit');
    
    loginButton?.addEventListener("click", () => {
      loginDialog?.showModal();
    });

    closeButton?.addEventListener("click", () => {
      loginDialog?.close();
    });



    closeButtonReg?.addEventListener("click", () => {
      registerDialog?.close();
    });


    registerButton?.addEventListener("click", () => {
      registerDialog?.showModal();
    });




    editButton?.addEventListener("click", () => {
      profileDialog?.show();
      this.isOpen = false;
      this.requestUpdate();
    });


    closeButtonEdit?.addEventListener("click", () => {
      profileDialog?.close();
    });

  }

  

  render() {
    let {
      isLoggedIn,
      user,
      isOpen,
      clickHandler,
      logOutHandler,
      logInHandler,
      registerHandler
    } = this;

    return html`
      <div >
        <div style="display:flex;flex-direction:column; flex-grow:0; max-width: 250px;"> 
        ${!isLoggedIn && user == null
          ? html`<div style="display:flex; flex-direction:row;"><bcg-button id="login-button" style="margin-right:10px;" @click="${logInHandler}" variant="primary" >Anmelden</bcg-button><bcg-button  id="register-button" variant="primary" @click="${registerHandler}">Registrieren </bcg-button></div>`
          : html`<bcg-button @click="${clickHandler}" style="margin-bottom:3px;" variant="primary"
              >Hallo, ${user.given_name} ${user.family_name}</bcg-button
            >`}

            <dialog id="login-dialog">
              <header style=" display:flex;justify-content: flex-end;
    align-content: flex-end;
">
              <bcg-button id="close-button" variant="tertiary">x</bcg-button>
            </header>
              <bcg-login></bcg-login>
            </dialog>



            <dialog style="    max-width: 670px;" id="edit-dialog">
              <header style=" display:flex;justify-content: flex-end;
    align-content: flex-end;
">
              <bcg-button id="close-button-edit" variant="tertiary">x</bcg-button>
            </header>
              <bcg-edit-user></bcg-edit-user>
            </dialog>


            <dialog id="register-dialog"> 
            <header style=" display:flex;justify-content: flex-end;align-content: flex-end;">
              <bcg-button id="close-button-reg" variant="tertiary">x</bcg-button>
            </header><bcg-register></bcg-register></dialog>



        ${isOpen
          ? html`<bcg-button style="margin-bottom:3px; " variant="primary" id="edit-button">Mein Profil</bcg-button>
              <bcg-button  variant="primary" @click="${() => {logOutHandler()}}">Abmelden</bcg-button> `
          : null}
        </div>
      </div>
    `;
  }
}
