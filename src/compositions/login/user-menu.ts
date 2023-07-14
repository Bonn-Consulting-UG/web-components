import { html, css, ScopedElementsMixin, property } from '@lion/core';
import { BcgModule } from '../../components/module';
import { LionIcon } from '@lion/icon';
export class BcgUserMenu extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [
      css`
        dialog {
          color: var(--primary-color);
          border-radius: var(--border-radius-l);
        }
      `,
    ];
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  @property({ type: Boolean }) isOpen: boolean = false;

  clickHandler = () => {
    this.isOpen = !this.isOpen;
  };

  registerHandler() {}

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected updated(): void {
    const loginDialog: any = this.shadowRoot?.querySelector('#login-dialog');
    const loginButton = this.shadowRoot?.querySelector('#login-button');
    const closeButton = this.shadowRoot?.querySelector('#close-button');

    const registerDialog: any =
      this.shadowRoot?.querySelector('#register-dialog');
    const registerButton = this.shadowRoot?.querySelector('#register-button');
    const closeButtonReg = this.shadowRoot?.querySelector('#close-button-reg');

    const profileDialog: any = this.shadowRoot?.querySelector('#edit-dialog');
    const editButton = this.shadowRoot?.querySelector('#edit-button');
    const closeButtonEdit =
      this.shadowRoot?.querySelector('#close-button-edit');

    loginButton?.addEventListener('click', () => {
      loginDialog?.showModal();
    });

    closeButton?.addEventListener('click', () => {
      loginDialog?.close();
    });

    closeButtonReg?.addEventListener('click', () => {
      registerDialog?.close();
    });

    registerButton?.addEventListener('click', () => {
      registerDialog?.showModal();
    });

    editButton?.addEventListener('click', () => {
      profileDialog?.show();
      this.isOpen = false;
    });

    closeButtonEdit?.addEventListener('click', () => {
      profileDialog?.close();
    });
  }

  render() {
    let {
      isLoggedIn,
      user,
      isOpen,
      clickHandler,
      logOutHandler,
      registerHandler,
    } = this;

    return html`
          <div style="background-color: var(--primary-color); padding:20px;display:flex;justify-content:space-between; color:white"> 
  

          ${
            !isLoggedIn
              ? html`
                  <a
                    id="login-button"
                    style="margin-right:10px;"
                    variant="secondary"
                    href=""
                    onclick="()=>ev.preventDefault()"
                    >Anmelden</a
                  ><a
                    id="register-button"
                    variant="primary"
                    @click=${registerHandler}
                    >Registrieren
                  </a>
                `
              : html`<span
                  @click="${clickHandler}"
                  style="margin-bottom:3px;align-self:flex-start"
                  variant="primary"
                  >Hallo, ${user.given_name} ${user.family_name}</bcg-button
                >`
          }

          <dialog id="login-dialog">
            <header
              style="MIN-width: 320px; display:flex;justify-content: flex-end;align-content: flex-end;"
            >
              <bcg-button id="close-button" variant="tertiary"
                ><lion-icon icon-id="bcg:general:cross"></bcg-icon
              ></bcg-button>
            </header>
            <bcg-login></bcg-login>
          </dialog>

          <dialog style="" id="edit-dialog">
            <header
              style=" display:flex;justify-content: flex-end;align-content: flex-end;"
            >
              <bcg-button id="close-button-edit" variant="tertiary"
                ><lion-icon icon-id="bcg:general:cross"></bcg-icon
              ></bcg-button
              >
            </header>
            <bcg-edit-user></bcg-edit-user>
          </dialog>

          <dialog id="register-dialog">
            <header
              style=" display:flex;justify-content: flex-end;align-content: flex-end;"
            >
              <bcg-button id="close-button-reg" variant="tertiary"><lion-icon icon-id="bcg:general:cross"></bcg-icon
              ></bcg-button>
            </header>
            <bcg-register></bcg-register>
          </dialog>

          ${
            this.isLoggedIn
              ? html`<div>
            <a
              style="margin-bottom:3px; "
              variant="secondary"
              id="edit-button"
            >
              <a onclick="()=>ev.preventDefault()" )> Mein Profil </a>
          </a>
            <a
              variant="secondary"
              @click="${() => {
                clickHandler();
                logOutHandler();
              }}"
            >
              Abmelden
            </a>
            
            </a>`
              : null
          }
          </a> 
    `;
  }
}
