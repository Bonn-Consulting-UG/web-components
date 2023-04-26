import { html, LitElement, property } from '@lion/core';
import jwtDecode from 'jwt-decode';
import { PropertyValueMap } from 'lit';
import { getSubmission } from '../../utils/services/comments';
import {
  sendGetNewAccessTokenRequest,
  sendLoginRequest,
} from '../../utils/services/login';
import { testResp } from './testIAMResponse';
import { getModule, getPermissions } from '../../utils/services/module';
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

  @property({ type: Object }) config: any = {};

  @property({ type: Boolean }) showNotification: Boolean = false;

  @property({ type: Boolean }) disabledNotification: Function = () => {
    this.showNotification = !this.showNotification;
    this.notificationType = '';
  };

  @property({ type: String }) notificationMessage: string =
    'Ihre Nachricht wurde Erfolgreich übersendet';

  @property({ type: String }) notificationType: string = 'success';

  @property({ type: Boolean }) showDialog: any = false;

  @property({ type: LitElement || null }) notificationHtml: any = this
    .showNotification
    ? html` <bcg-notification
        variant=${this.notificationType}
        message=${this.notificationMessage}
      ></bcg-notification>`
    : null;

  @property({ type: Boolean }) isLoading: Boolean = false;

  @property({ type: String }) onConfirmLabel: string = 'Ja';

  @property({ type: String }) onCancelLabel: string = 'Nein';

  @property({ type: Boolean }) dialogContent: any = 'Test';

  @property() loadingHtml: any = this.isLoading
    ? html` <bcg-progress></bcg-progress>`
    : null;

  @property({ type: Function }) confirmHandler: Function = () =>
    console.log('close dialog in module');

  @property({ type: Function }) closeHandler: Function = () =>
    console.log('close dialog in module');

  @property({ type: LitElement || null }) dialogHtml: any = null;

  // Permissions
  @property({ type: Boolean }) canViewSubmissions = false;
  @property({ type: Boolean }) canCreateSubmissions = false;

  checkAuthToken() {
    if (
      this.accessToken === undefined ||
      this.accessToken === 'undefined' ||
      this.accessToken === null
    ) {
      localStorage.removeItem('accessToken');
    }
  }

  update(changedProperties: any) {
    this.updateDialog();
    super.update(changedProperties);
  }

  updateDialog() {
    this.dialogHtml = html` <bcg-dialog
      .onConfirmHandler=${this.confirmHandler}
      .onCloseHandler=${this.closeHandler}
      .showDialog=${this.showDialog}
      .content=${this.dialogContent}
      .onConfirmLabel=${this.onConfirmLabel}
      .onCancelLabel=${this.onCancelLabel}
    ></bcg-dialog>`;
  }

  logOutHandler = () => {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
  };

  setupLoggedinUser() {
    this.user = this.accessToken ? jwtDecode(this.accessToken) : null;
    if (this.user) {
      if (Date.now() >= this.user.exp * 1000) {
        this.getNewAccessToken();
      }
      if (Date.now() <= this.user.exp * 1000) {
        this.isLoggedIn = true;
      }
    }
    console.log(this.user);
  }

  async getNewAccessToken() {
    if (Date.now() >= this.refreshTokenDecoded.exp * 1000) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    } else {
      const response: any = await sendGetNewAccessTokenRequest(
        this.refreshToken
      );
      if (response.accessToken) {
        this.isLoggedIn = true;
      }
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
  }

  async logInHandler(email: string, password: string) {
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
    if (this.moduleId !== 0 && this.submissionId === 0) {
      this.config = await getModule(this.moduleId);
      console.table(this.config);
    }
    if (this.submissionId !== 0 && this.moduleId === 0) {
      this.config = await getSubmission(this.submissionId);
      console.table(this.config);
    }
  }

  async fetchPermissions() {
    /*
    this.user = 'franz.moderator@example.org'
    if  (!this.user) {
      return;
    }
    const resp = await getPermissions()
    return resp.json();
    */
    return testResp;
  }

  async loadPermissions() {
    const allowKey = 'EFFECT_ALLOW';
    const resp = await this.fetchPermissions();
    const submissionPermissions = resp?.results.find(permission => permission.resource.kind === 'epart-submission')?.actions;
    this.canViewSubmissions = submissionPermissions.view === allowKey;
    this.canCreateSubmissions = submissionPermissions.create === allowKey;
    console.log('Can view Submissions: ', this.canViewSubmissions);
    console.log('Can create Submissions: ',this.canCreateSubmissions);
  }

  connectedCallback() {
    this.loadConfig();
    this.checkAuthToken();
    this.setupLoggedinUser();
    this.loadPermissions();
    super.connectedCallback();
    console.log(this.isLoggedIn);
  }
}
