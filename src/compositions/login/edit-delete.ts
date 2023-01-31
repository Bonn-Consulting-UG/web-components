/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { sendUserDeleteRequest } from '../../utils/services/login';

export class BcgEditDelete extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [css``];
  }

  user: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      onChange: { type: Function },
    };
  }

  dialogState: string = 'open';

  protected updated(): void {
    const deleteDialog: any = this.shadowRoot?.querySelector('#dialog');
    const openButton = this.shadowRoot?.querySelector('#open-button-delete');
    const closeButton = this.shadowRoot?.querySelector('#close-button');
    const closeButtonWithinDialog = this.shadowRoot?.querySelector(
      '#close-button-secondary'
    );
    openButton?.addEventListener('click', () => {
      deleteDialog?.showModal();
    });

    closeButton?.addEventListener('click', () => {
      deleteDialog?.close();
    });
    closeButton?.addEventListener('click', () => {
      deleteDialog?.close();
    });
    closeButtonWithinDialog?.addEventListener('click', () => {
      deleteDialog?.close();
    });
  }

  render() {
    const submitHandler = async (ev: any) => {
      console.log('hihi');
      // const res = await sendUserDeleteRequest(this.user.sub);
      // console.log(res);
    };
    return html`


     <dialog id="dialog">
          <header style=" display:flex;justify-content: flex-end;align-content: flex-end;">
              <bcg-button id="close-button" variant="tertiary"
                ><lion-icon icon-id="bcg:general:cross"></bcg-icon
              ></bcg-button>
            </header>

           <p>Sind Sie sicher, dass Sie Ihr Profil wirklich löschen möchten?</p>
          <div>
          <bcg-button variant="primary" id="close-button-secondary">Nein, Profil nicht löschen</bcg-button>
          <bcg-button variant="primary" @click=${submitHandler}>Ja, Profil löschen</bcg-button>
          
          </div>
    </dialog>
      ${
        this.showNotification
          ? html`<bcg-notification
              .closeHandler=${this.disabledNotification}
              variant=${this.notificationType}
              message=${this.notificationMessage}
            ></bcg-notification> `
          : null
      }
      <h2>Profil löschen</h2>
      <p>
        Wenn Sie sich nicht länger beteiligen möchten, können Sie Ihr
        Nutzer*innenprofil hier löschen. Dabei werden all Ihre persönlichen
        Daten gelöscht. Sofern Sie im Rahmen der Beteiligung Beiträge verfasst
        haben, bleiben diese unter der Angabe „Profil gelöscht“ erhalten.
      </p>
     
          <bcg-button variant="primary" id="open-button-delete">Profil löschen</bcg-button-submit>

    `;
  }
}
