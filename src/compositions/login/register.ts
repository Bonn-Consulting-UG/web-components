/* eslint-disable import/extensions */
import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';

import { BcgRegisterStepOne } from './register-step-one';
import { BcgRegisterStepTwo } from './register-step-two';
import { BcgRegisterStepThree } from './register-step-three';
import { BcgRegisterStepFinished } from './register-step-finished';
import {
  sendRegisterRequest,
  checkVerifyCode,
} from '../../utils/services/login';
import { BcgModule } from '../../components/module';
import jwtDecode from 'jwt-decode';

export class BcgRegister extends ScopedElementsMixin(BcgModule) {
  @property({ type: Number }) currentStep: number = 1;

  maxStep: number = 3;

  verifyCode: number = 0;

  userData: any = null;

  nextStep = async (payload: any) => {
    let response: any = null;

    if (this.currentStep < this.maxStep) {
      if (this.currentStep === 1) {
        this.isLoading = true;

        response = await sendRegisterRequest(payload);
        const responseBody = await response.json();
        this.userData = responseBody;

        if (responseBody.accessToken) {
          localStorage.setItem('accessToken', responseBody.accessToken);
          this.user = jwtDecode(responseBody.accessToken);
        }

        if (response.status === 409 || response.status === 500) {
          this.showNotification = true;
          this.notificationMessage = `Scheinbar sind Sie mit dieser E-Mail-Adresse bei uns schon registriert! Bitte melden Sie sich an. `;
          this.notificationType = 'error';
          this.isLoading = false;
        } else {
          this.notificationType = '';
          this.showNotification = false;
        }

        this.isLoading = false;
        if (response.status !== 201) return;
      }
      if (this.currentStep === 2) {
        if (payload === 'back') {
          this.currentStep -= 1;
          return;
        }
        this.isLoading = true;
        response = await checkVerifyCode(this.userData.id, payload);

        this.isLoading = false;

        if (response.status !== 200) {
          this.showNotification = true;
          this.notificationMessage = `Oh, da stimmt etwas nicht! Bitte überprüfen Sie den Verifizierungscode.`;
          this.notificationType = 'error';
        } else {
          this.notificationType = '';
          this.showNotification = false;
        }
      }
      if (this.notificationType !== 'error') {
        this.currentStep += 1;
      }
    } else {
      location.reload();
    }
  };

  static get scopedElements() {
    return {
      'bcg-register-step-one': BcgRegisterStepOne,
      'bcg-register-step-two': BcgRegisterStepTwo,
      'bcg-register-step-three': BcgRegisterStepThree,
      'bcg-register-step-finished': BcgRegisterStepFinished,
    };
  }

  static get styles() {
    return [css``];
  }

  render() {
    const { maxStep, notificationHtml, currentStep, nextStep } = this;

    return html`
    <div style="display:flex;">
    <div class="left-side" style="flex-direction:row-reverse;width:640px;min-height:300px;"> 

    ${
      this.isLoading
        ? html`<bcg-progress></bcg-progress>`
        : html`
            ${this.notificationHtml}
            ${currentStep >= maxStep - 1
              ? null
              : html`<h1>Willkommen!</h1>
                  <h2>Registrierung</h2>
                  <span>Schritt ${currentStep} von ${maxStep - 1} </span>`}
            <!-- ${currentStep === 1
              ? html`<bcg-register-step-one
                  .nextStep="${nextStep}"
                ></bcg-register-step-one>`
              : null} -->
            ${currentStep === 1
              ? html`<bcg-register-step-two
                  .nextStep="${nextStep}"
                ></bcg-register-step-two> `
              : null}
            ${currentStep === 2
              ? html`<bcg-register-step-three
                  .user=${this.userData}
                  .nextStep="${nextStep}"
                ></bcg-register-step-three> `
              : null}
            ${currentStep === 3
              ? html`<bcg-register-step-finished
                  .user=${this.userData}
                  .nextStep="${nextStep}"
                ></bcg-register-step-finished> `
              : null}
          `
    }
        </div>
        </div>
      </div>
      
    `;
  }
}
