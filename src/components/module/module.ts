import { LitElement } from '@lion/core';
import jwtDecode from 'jwt-decode';

export class BcgModule extends LitElement {
  isLoggedIn: Boolean = false;

  moduleId: number = 0;

  authToken: any = localStorage.getItem('auth-token');

  user: any = this.authToken !== null ? jwtDecode(this.authToken) : null;

  isOpen: any = false;

  config: any = {};

  static get properties() {
    return {
      moduleId: { type: String }
    };
  }

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
    this.isLoggedIn = true;
    console.log('login', this.isOpen);
  }
}
