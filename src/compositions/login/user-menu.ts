/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import jwt_decode from 'jwt-decode';

export class BcgUserMenu extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  isLoggedIn: any = localStorage.getItem('auth-token');

  user: any = null;

  isOpen: boolean = false;

  clickHandler() {
    this.isOpen = !this.isOpen;
    this.requestUpdate();

    console.log(this.isOpen);
  }

  logOutHandler() {
    localStorage.removeItem('auth-token');
    this.isOpen = !this.isOpen;
    this.requestUpdate();
  }

  logInHandler() {
    window.location.href =
      'iframe.html?id=compositions-userlogin--user-menu&viewMode=story';
  }

  render() {
    let {
      isLoggedIn,
      user,
      isOpen,
      clickHandler,
      logOutHandler,
      logInHandler
    } = this;
    if (isLoggedIn != null) {
      user = jwt_decode(isLoggedIn);
    }
    return html`
      <div style="display:flex;flex-direction:column; width:200px; ">
        ${!isLoggedIn && user == null
          ? html`<bcg-button @click="${logInHandler}">Anmelden</bcg-button>`
          : html`<bcg-button @click="${clickHandler}"
              >Hallo, ${user.firstname} ${user.lastname}</bcg-button
            >`}
        ${isOpen
          ? html`<bcg-button>Mein Profil</bcg-button>
              <bcg-button @click="${logOutHandler}">Abmelden</bcg-button> `
          : null}
      </div>
    `;
  }
}
