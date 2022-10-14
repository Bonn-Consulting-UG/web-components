import { html, LitElement, property } from '@lion/core';
import jwtDecode from 'jwt-decode';

export class BcgModule extends LitElement {
  isLoggedIn: Boolean = false;

  moduleId: number = 0;

  authToken: any = '';

  user: any = '';

  isOpen: any = false;

  config: any = {};


  @property()
  showNotification: Boolean = false;

  @property()
  notificationMessage: string = 'Ihre Nachricht wurde Erfolgreich übersendet';
  
  @property()
  notificationType: string = 'success';

  @property()
  notificationHtml: any = this.showNotification
    ? html` <bcg-notification
        variant=${this.notificationType}
        message=${this.notificationMessage}
      ></bcg-notification>`
    : null;

  static get properties() {
    return {
      moduleId: { type: String }
    };
  }

  checkAuthToken(){
    if(this.authToken === undefined || this.authToken === 'undefined' ) {
      localStorage.removeItem('auth-token')
    } 
  }

  clickHandler() {
    this.isOpen = !this.isOpen;
    this.requestUpdate();

    console.log(this.isOpen);
  }

  logOutHandler() {
    localStorage.removeItem('auth-token');
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  logInHandler() {
    this.isLoggedIn = true;
    console.log('login', this.isOpen);
  }

  connectedCallback() {
    super.connectedCallback();
    this.authToken = localStorage.getItem('auth-token') !== 'undefined' ? localStorage.getItem('auth-token') : null
    this.user = this.authToken ? jwtDecode(this.authToken) : null
    this.checkAuthToken()

    console.log(this.authToken,this.user)
  }
}
