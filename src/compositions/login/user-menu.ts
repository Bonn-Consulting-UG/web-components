/* eslint-disable import/extensions */
import { html, css, ScopedElementsMixin } from '@lion/core';
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

  render() {
    const {
      isLoggedIn,
      user,
      isOpen,
      clickHandler,
      logOutHandler,
      logInHandler
    } = this;

    return html`
      <div style="display:flex;flex-direction:column; width:200px; ">
        ${!isLoggedIn && user == null
          ? html`<bcg-button @click="${logInHandler}">Anmelden</bcg-button>`
          : html`<bcg-button @click="${clickHandler}"
              >Hallo, ${user.given_name} ${user.family_name}</bcg-button
            >`}
        ${isOpen
          ? html`<bcg-button>Mein Profil</bcg-button>
              <bcg-button @click="${logOutHandler}">Abmelden</bcg-button> `
          : null}
      </div>
    `;
  }
}
