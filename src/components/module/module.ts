import { html, LitElement, property } from '@lion/core';
import jwtDecode from 'jwt-decode';

export class BcgModule extends LitElement {
  isLoggedIn: Boolean = false;

  @property({ type: String }) moduleId: number = 0;

  authToken: any = '';

  user: any = '';

  isOpen: any = false;

  config: any = {};

  @property({ type: Boolean }) showNotification: Boolean = false;

  @property({ type: String }) notificationMessage: string =
    'Ihre Nachricht wurde Erfolgreich übersendet';

  @property({ type: String }) notificationType: string = 'success';

  @property({ type: LitElement || null }) notificationHtml: any = this
    .showNotification
    ? html` <bcg-notification
        variant=${this.notificationType}
        message=${this.notificationMessage}
      ></bcg-notification>`
    : null;

  @property({ type: Boolean }) isLoading: Boolean = false;

  @property() loadingHtml: any = this.isLoading
    ? html` <bcg-progress></bcg-progress>`
    : null;

  checkAuthToken() {
    if (this.authToken === undefined || this.authToken === 'undefined') {
      localStorage.removeItem('auth-token');
    }
  }

  logOutHandler() {
    localStorage.removeItem('auth-token');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  logInHandler() {
    this.isLoggedIn = true;
    console.log('login', this.isOpen);
  }

  connectedCallback() {
    super.connectedCallback();
    this.authToken =
      localStorage.getItem('auth-token') !== 'undefined'
        ? localStorage.getItem('auth-token')
        : null;
    this.user = this.authToken ? jwtDecode(this.authToken) : null;
    this.checkAuthToken();

    console.log(this.authToken, this.user);
  }
}
