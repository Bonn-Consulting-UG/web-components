import { LitElement } from '@lion/core';
import jwtDecode from 'jwt-decode';

export class BcgModule extends LitElement {
  constructor() {
    super();
    this.isLoggedIn = false;
    this.modulesId = 12354;
  }

  isLoggedIn: Boolean;

  modulesId: number;

  authToken: any = localStorage.getItem('auth-token');

  user: any = this.authToken !== null ? jwtDecode(this.authToken) : null;

  isOpen: any = false;

  config: any = {};

  static get properties() {
    return {
      modulesId: { type: Boolean }
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

  updated() {
    console.log(this.isLoggedIn, this.user);
  }
}
