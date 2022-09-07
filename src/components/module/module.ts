import { LitElement } from '@lion/core';

export class BcgModule extends LitElement {
  constructor() {
    super();
    this.isLoggedIn = false;
    this.modulesId = 12354;
  }

  isLoggedIn: Boolean;

  modulesId: number;

  authToken: any = localStorage.getItem('auth-token');

  isOpen: any = false;

  config: any = {};

  static get properties() {
    return {
      isLoggedIn: { type: Boolean },
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
    console.log('login', this.isOpen);
  }

  updated() {
    this.config = 'updated';
    this.authToken = localStorage.getItem('auth-token');
    console.log(this.isLoggedIn, this.config);
  }
}
