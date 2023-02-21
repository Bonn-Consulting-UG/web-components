import { css, html, LitElement, property } from '@lion/core';
import { LionDialog } from '@lion/dialog';
import { LionIcon } from '@lion/icon';
import { PropertyValueMap } from 'lit';

export class BcgDialog extends LitElement {
  @property({ type: String }) content: string = '';
  @property({ type: LitElement }) dialog: any = '';
  @property({ type: Boolean }) showDialog: any;

  @property({ type: LitElement }) onCloseHandler: any = () => {
    console.log('Close Dialogs Defaultfunction');
    this.closeDialog();
  };

  @property({ type: LitElement }) onConfirmHandler: any = () => {
    console.log('Close Dialogs Defaultfunction');
    this.closeDialog();
  };

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  closeDialog: any = () => {
    this.dialog.close();
  };

  openDialog: any = () => {
    if (this.dialog.open) return;
    this.dialog.showModal();
  };

  private _changeDialog: any = (e: Event) => {
    this.openDialog();
  };

  update(changedProperties: any) {
    this.dialog = this.shadowRoot?.querySelector('#dialog');
    if (this.showDialog === true) {
      this.openDialog();
    }
    super.update(changedProperties);
  }

  render() {
    return html`
    <p @changeDialog=${this._changeDialog}></p>
     <dialog id="dialog" >
    <header style=" display:flex;justify-content: flex-end;align-content: flex-end;">
             <bcg-button @click=${
               this.closeDialog
             } id="close-button" variant="tertiary"
               ><lion-icon icon-id="bcg:general:cross" ></bcg-icon
             ></bcg-button>
           </header>
          <p>${this.content}</p>
         <div>
         <bcg-button @click=${async () => {
           await this.onConfirmHandler();
           this.closeDialog();
         }} variant="primary">Ja</bcg-button>
         <bcg-button @click=${async () => {
           await this.onCloseHandler();
           this.closeDialog();
         }} variant="primary">Nein</bcg-button>
         </div>
   </dialog>
  `;
  }
}
