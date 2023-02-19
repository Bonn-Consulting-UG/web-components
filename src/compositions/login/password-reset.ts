/* eslint-disable import/extensions */

import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { Required, IsEmail } from '../../utils/helpers/input-errors';
import {
  checkVerifyCode,
  sendPasswordChangeInitRequest,
  sendPasswordResetRequest,
  sendRegisterRequest,
} from '../../utils/services/login';
import { BcgPasswordResetConfirm } from './password-reset-confirm';
import { BcgPasswordResetFinished } from './password-reset-finished';
import { BcgPasswordResetStart } from './password-reset-start';

export class BcgPasswordReset extends ScopedElementsMixin(BcgModule) {
  @property({ type: Number }) currentStep: number = 1;

  @property({ type: Function }) back: any = () => console.log('back default');

  maxStep: number = 4;

  verifyCode: number = 0;

  user: any = 0;
  resetEmail: any = '';

  static get scopedElements() {
    return {
      'bcg-password-reset-start': BcgPasswordResetStart,
      'bcg-password-reset-confirm': BcgPasswordResetConfirm,
      'bcg-password-reset-finished': BcgPasswordResetFinished,
    };
  }

  nextStep = async (payload: any) => {
    let response: any = null;

    if (this.currentStep < this.maxStep) {
      if (this.currentStep === 1) {
        this.resetEmail = payload;

        const response = await sendPasswordChangeInitRequest({
          email: payload,
        });
      }

      if (this.currentStep === 2) {
        response = await sendPasswordResetRequest({
          resetPasswordToken: payload.code,
          password: payload.password,
        });

        if (response.status !== 201) {
          this.showNotification = true;
          this.notificationMessage = `Oh, da stimmt etwas nicht! Bitte überprüfen Sie den Verifizierungscode.`;
          this.notificationType = 'error';
          return;
        } else {
          this.notificationType = '';
          this.showNotification = false;
        }
      }
      this.currentStep += 1;
    } else {
      console.log('close Dialog');
    }
  };

  render() {
    const { maxStep, currentStep } = this;

    return html`
      ${currentStep >= maxStep - 1 ? null : html`<h1>Willkommen zurück!</h1>`}
      ${this.showNotification
        ? html`<bcg-notification
            .closeHandler=${this.disabledNotification}
            variant=${this.notificationType}
            message=${this.notificationMessage}
          ></bcg-notification> `
        : null}
      ${currentStep === 1
        ? html`<bcg-password-reset-start
            .resetEmail=${this.resetEmail}
            .nextStep=${this.nextStep}
            .back=${this.back}
          ></bcg-password-reset-start>`
        : null}
      ${currentStep === 2
        ? html`<bcg-password-reset-confirm
            .resetEmail=${this.resetEmail}
            .nextStep=${this.nextStep}
          ></bcg-password-reset-confirm> `
        : null}
      ${currentStep === 3
        ? html`<bcg-password-reset-finished
            .nextStep=${this.nextStep}
          ></bcg-password-reset-finished> `
        : null}
    `;
  }
}
