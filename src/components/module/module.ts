import { html, LitElement, property } from '@lion/core';
import jwtDecode from 'jwt-decode';
import { PropertyValueMap } from 'lit';
import { sendLoginRequest } from '../../utils/services/login';
import { thumbsdown } from '../icon/export-comment-icons';

export class BcgModule extends LitElement {
  @property({ type: Boolean }) isLoggedIn: Boolean = false;

  @property({ type: String }) moduleId: number = 0;

  @property({ type: String }) refreshToken: any =
    localStorage.getItem('refreshToken');

  @property({ type: String }) accessToken: any =
    localStorage.getItem('accessToken');

  @property({ type: Object }) user: any = '';

  isOpen: any = false;

  config: any = {};

  @property({ type: Boolean }) showNotification: Boolean = false;

  @property({ type: Boolean }) disabledNotification: Function = () =>
    (this.showNotification = !this.showNotification);

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
    if (
      this.accessToken === undefined ||
      this.accessToken === 'undefined' ||
      this.accessToken === null
    ) {
      localStorage.removeItem('accessToken');
    }
  }

  logOutHandler() {
    localStorage.removeItem('accessToken');
    this.accessToken = null;
    this.user = null;
    this.isLoggedIn = false;
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  setupLoggedinUser() {
    localStorage.getItem('accessToken');
    this.user = this.accessToken ? jwtDecode(this.accessToken) : null;
    console.log(this.user);

    if (this.user) {
      this.isLoggedIn = true;
    }
  }

  getNewAccessToken() {}

  async logInHandler(email: string, password: string) {
    console.log('huh');
    const resp: any = await sendLoginRequest({ email, password });
    const respData = await resp.json();
    if (respData.accessToken && resp.status === 201) {
      localStorage.setItem('accessToken', respData.accessToken);
      localStorage.setItem('refreshToken', respData.refreshToken);

      this.setupLoggedinUser();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
    return resp;
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkAuthToken();
    this.setupLoggedinUser();
  }
}
