/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { sendUserDeleteRequest } from '../../utils/services/login';

export class BcgEditDelete extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  // break span down '<span>Schritt ${currentStep} von ${maxStep - 1} </span>' to be able to export string to data

  render() {
    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      sendUserDeleteRequest('');
    };
    return html`
      <h2>Profil löschen</h2>
      <p>
        Wenn Sie sich nicht länger beteiligen möchten, können Sie Ihr
        Nutzer*innenprofil hier löschen. Dabei werden all Ihre persönlichen
        Daten gelöscht. Sofern Sie im Rahmen der Beteiligung Beiträge verfasst
        haben, bleiben diese unter der Angabe „Profil gelöscht“ erhalten.
      </p>
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <bcg-button-submit>Profil löschen</bcg-button-submit>
        </form>
      </bcg-form>
    `;
  }
}
