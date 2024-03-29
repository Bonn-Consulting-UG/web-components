import { html, LitElement, property } from '@lion/core';
import jwtDecode from 'jwt-decode';
import { PropertyValueMap, TemplateResult } from 'lit';
import { getSubmission } from '../../utils/services/comments';
import {
  sendGetNewAccessTokenRequest,
  sendLoginRequest,
} from '../../utils/services/login';
import { getModule } from '../../utils/services/module';
import { thumbsdown } from '../icon/export-comment-icons';
import { Required } from '@lion/form-core';

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
  @property({ type: Boolean }) hasModeratorRole = false;

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
  @property({ type: Boolean }) isRegistrationRequiredToCreateSubmissions = true;
  @property({ type: Boolean }) isHiddenUserAllowed = false;

  @property({ type: Boolean }) isEditOnlyByModeratorAllowed = true;
  @property({ type: Boolean }) isCommentsAllowed = false;
  @property({ type: Boolean }) isReactionsAllowed = false;
  @property({ type: Boolean }) isInteractionStarted = false;
  @property({ type: Boolean }) isInteractionEnded = false;
  @property({ type: Array }) commentsPublishMode: string[] = [];
  @property({ type: Array }) allowedCommentReactionTypes: any = [];
  @property({ type: Array }) commentWriters: any = [];
  @property({ type: Array }) commentReaders: any = [];
  @property({ type: Array }) submissionWriters: any = [];

  @property({ type: LitElement || null }) createSubmissionHtml = (
    content: TemplateResult
  ): any => {
    return content;

    if (this.isEditOnlyByModeratorAllowed) {
      return this.hasModeratorRole ? content : html``;
    }
    if (this.isInteractionEnded) {
      return html`<div class="submission-permission-hint">
        Diese Beteiligung ist bereits abgelaufen.
      </div>`;
    }
    if (false) {
      return html`<div class="submission-permission-hint">
        Diese Beteiligung ist noch nicht gestartet.
      </div>`;
    }
    return content;

    if (
      this.submissionWriters.includes('ANONYMOUS') ||
      this.submissionWriters.includes('USER')
    ) {
      return content;
    }
    if (this.submissionWriters.includes('REGISTERED_USER') && this.isLoggedIn) {
      return content;
    }

    return html`<div class="submission-permission-hint">
      Sie müssen angemeldet sein, um sich beteiligen zu können
    </div>`;
  };

  setCookie() {
    if (!this.user) return;
    let date = new Date();
    date.setTime(this.user.exp * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `epart_auth_token=${this.accessToken}; ${expires}; path=/`;
  }

  deleteCookie() {
    document.cookie =
      'epart_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  }

  checkAuthToken() {
    if (
      this.accessToken === undefined ||
      this.accessToken === 'undefined' ||
      this.accessToken === null
    ) {
      localStorage.removeItem('accessToken');
      ('accessToken');
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
    this.deleteCookie();
    this.isLoggedIn = false;
    location.reload();
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
    this.hasModeratorRole =
      this.user?.realm_access?.roles?.includes('MODERATOR');
    this.setCookie();
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
      this.assignAccessabilities();
    }
    if (this.submissionId !== 0 && this.moduleId === 0) {
      this.config = await getSubmission(this.submissionId);
      this.assignAccessabilities();
    }
  }

  assignAccessabilities() {
    const configOrModuleConfig = this.config.config;
    this.isRegistrationRequiredToCreateSubmissions = configOrModuleConfig
      ? this.config?.config?.isRegistrationRequired
      : this.config?.moduleConfig?.isRegistrationRequired;

    this.isHiddenUserAllowed = configOrModuleConfig
      ? this.config?.config?.isHiddenUsersAllowed
      : this.config?.moduleConfig?.isHiddenUsersAllowed;

    this.isEditOnlyByModeratorAllowed = configOrModuleConfig
      ? this.config?.config?.isEditOnlyByModeratorAllowed
      : this.config?.moduleConfig?.isEditOnlyByModeratorAllowed;

    this.isCommentsAllowed = configOrModuleConfig
      ? this.config?.config?.isCommentsAllowed
      : this.config?.moduleConfig?.isCommentsAllowed;

    this.allowedCommentReactionTypes = configOrModuleConfig
      ? this.config?.config?.allowedCommentReactionTypes
      : this.config?.moduleConfig?.allowedCommentReactionTypes;

    this.isReactionsAllowed = configOrModuleConfig
      ? this.config?.config?.isReactionsAllowed
      : this.config?.moduleConfig?.isReactionsAllowed;

    this.commentWriters = configOrModuleConfig
      ? this.config?.config?.commentWriters
      : this.config?.moduleConfig?.commentWriters;

    this.submissionWriters = configOrModuleConfig
      ? this.config?.config?.submissionWriters
      : this.config?.moduleConfig?.submissionWriters;

    this.commentReaders = configOrModuleConfig
      ? this.config?.config?.commentReaders
      : this.config?.moduleConfig?.commentReaders;

    this.isInteractionStarted = configOrModuleConfig
      ? this.config?.config?.isInteractionStarted
      : this.config?.moduleConfig?.isInteractionStarted;

    this.isInteractionEnded = configOrModuleConfig
      ? this.config?.config?.isInteractionEnded
      : this.config?.moduleConfig?.isInteractionEnded;

    this.commentsPublishMode = configOrModuleConfig
      ? this.config?.config?.commentsPublishMode
      : this.config?.moduleConfig?.commentsPublishMode;
  }

  connectedCallback() {
    this.loadConfig();
    this.checkAuthToken();
    this.setupLoggedinUser();
    super.connectedCallback();
  }
}
