/* eslint-disable import/extensions */

import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import {
  checkVerifyCode,
  sendPasswordChangeInitRequest,
  sendPasswordResetRequest,
  sendRegisterRequest,
} from '../../utils/services/login';
import { BcgPasswordResetConfirm } from './password-reset-confirm';
import { BcgPasswordResetFinished } from './password-reset-finished';
import { BcgPasswordResetStart } from './password-reset-start';

export class BcgPasswordReset extends ScopedElementsMixin(LitElement) {
  @property({ type: Number }) currentStep: number = 1;

  @property({ type: Function }) back: any = () => console.log('back default');

  maxStep: number = 4;

  verifyCode: number = 0;

  user: any = 0;

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
        const response = await sendPasswordChangeInitRequest({
          email: payload,
        });
      }
      if (this.currentStep === 2) {
        this.currentStep += 1;

        return;
      }
      if (this.currentStep === 3) {
        response = await sendPasswordResetRequest({
          email: this.user,
          oldPassword: payload.password,
          newPassword: payload.newpassword,
        });
        if (response.status !== 204) return;
      }
      this.currentStep += 1;
    } else {
      console.log('close Dialog');
    }
  };

  render() {
    const { maxStep, currentStep } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    return html`
      ${currentStep >= maxStep - 1 ? null : html`<h1>Willkommen zurück!</h1>`}
      ${currentStep === 1
        ? html`<bcg-password-reset-start
            .nextStep=${this.nextStep}
            .back=${this.back}
          ></bcg-password-reset-start>`
        : null}
      ${currentStep === 2
        ? html`<bcg-password-reset-confirm
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
