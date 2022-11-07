import { html, LitElement, property } from '@lion/core';
import jwtDecode from 'jwt-decode';
import { PropertyValueMap } from 'lit';
import {
  sendGetNewAccessTokenRequest,
  sendLoginRequest,
} from '../../utils/services/login';
import { getModule } from '../../utils/services/module';
import { thumbsdown } from '../icon/export-comment-icons';

export class BcgModule extends LitElement {
  @property({ type: Boolean }) isLoggedIn: Boolean = false;

  @property({ type: String }) moduleId: number = 0;
  @property({ type: String }) submissionId: number = 0;

  @property({ type: String }) refreshToken: any =
    localStorage.getItem('refreshToken');

  @property({ type: String }) refreshTokenDecoded: any = this.refreshToken
    ? jwtDecode(this.refreshToken)
    : null;

  @property({ type: String }) accessToken: any =
    localStorage.getItem('accessToken');

  @property({ type: Object }) user: any = '';

  isOpen: any = false;

  @property({ type: Object }) config: object = {};

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

    if (this.user) {
      if (Date.now() >= this.user.exp * 1000) {
        console.log(this.user);
        this.getNewAccessToken();
      }
      this.isLoggedIn = true;
    }
  }

  async getNewAccessToken() {
    if (Date.now() >= this.refreshTokenDecoded.exp * 1000) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    } else {
      const response: any = await sendGetNewAccessTokenRequest(
        this.refreshToken
      );
      console.log(response.accessToken);
      console.log(response.refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
  }

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

  async loadConfig() {
    if (this.moduleId !== 0) {
      this.config = await getModule(this.moduleId);
      console.log(this.config);
    }
  }

  connectedCallback() {
    this.loadConfig();
    super.connectedCallback();
    this.checkAuthToken();
    this.setupLoggedinUser();
  }
}
