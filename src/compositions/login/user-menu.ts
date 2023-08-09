import { html, css, ScopedElementsMixin, property } from '@lion/core';
import { BcgModule } from '../../components/module';
import { LionIcon } from '@lion/icon';
import { UserMenuStyles } from './user-menu-styles'

export class BcgUserMenu extends ScopedElementsMixin(BcgModule) {
  @property() easyLanguage:any;
  @property() signLanguage:any;
  @property({type:Array}) extraMenu:any = [];

  static get styles() {
    return [UserMenuStyles,
      
    ];
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  // @property() isOpen = false;

  // clickHandler = () => {
  //   this.isOpen = !this.isOpen;
  // };

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
      // this.isOpen = false;
    });

    closeButtonEdit?.addEventListener('click', () => {
      profileDialog?.close();
    });
  }

 



  render() {
    let { isLoggedIn, user, logOutHandler, registerHandler } = this;


    // epart nav background = --navigation-background-color
    // epart nav item color = --navigation-item-color
    // epart nav langlangues icon background color  = --navigation-icon-color


    return html`
          <div class="wrapper" > 
            <div class="extra-menu-wrapper">
              <ul class="extra-menu-list">
                ${this.extraMenu && this.extraMenu.map ? this.extraMenu.map(e => html`<li><a class="extra-menu-listitem" href=${e.url}>${e.label}</a><li>`): null} 
                ${this.signLanguage ? html`<li><bcg-icon icon-id="bcg:general:signLanguage" alt=${this.signLanguage.label} class="accessibility-icon"></bcg-icon><a class="extra-menu-listitem extra-menu-accessibility" href=${this.signLanguage.url}>${this.signLanguage.label}</a><li>` : null}  
                ${this.easyLanguage ? html`<li><bcg-icon icon-id="bcg:general:easyLanguage" alt=${this.signLanguage.label} class="accessibility-icon"></bcg-icon><a class="extra-menu-listitem extra-menu-accessibility" href=${this.easyLanguage.url}>${this.easyLanguage.label}</a><li>` : null}        
        </div>
          ${!isLoggedIn ? html`
              <div class="login-menu-wrapper">
                  <bcg-button id="login-button" variant="secondary" class="login-button" >Anmelden</bcg-button>
                  <bcg-button id="register-button" variant="secondary" @click=${registerHandler}>Registrieren</bcg-button>
              </div>`
            : html`<span>Hallo, ${user.given_name} ${user.family_name}</bcg-button>`
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

          <dialog id="edit-dialog">
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
            <bcg-button 
              variant="secondary"
              id="edit-button">
               Mein Profil </bcg-button>
            
            
            <bcg-button
              variant="secondary"
              @click="${() => {
                logOutHandler();
              }}"
            >
              Abmelden
            </bcg-button->
            
            </a>`
              : null
          }
          </a> 
    `;
  }
}
