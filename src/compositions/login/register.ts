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

export class BcgRegister extends ScopedElementsMixin(BcgModule) {
  @property({ type: Number }) currentStep: number = 1;

  maxStep: number = 4;

  verifyCode: number = 0;

  user: any = 0;

  nextStep = async (payload: any) => {
    let response: any = null;

    if (this.currentStep < this.maxStep) {
      if (this.currentStep === 2) {
        this.isLoading = true;

        response = await sendRegisterRequest(payload);
        this.user = await response.json();
        if (response.status === 409 || response.status === 500) {
          console.log('HELLO ITS ME');
          this.showNotification = true;
          this.notificationMessage = `Statuscode: ${response.status} ${this.user.message}`;
          this.notificationType = 'error';
          this.isLoading = false;

          setTimeout(() => {
            this.showNotification = false;
          }, 3000);
        }

        this.isLoading = false;
        if (response.status !== 201) return;
      }
      if (this.currentStep === 3) {
        if (payload === 'back') {
          this.currentStep -= 1;
        }

        this.isLoading = true;

        response = await checkVerifyCode(this.user.id, payload);

        this.isLoading = false;

        if (response.status !== 201) return;
      }
      this.currentStep += 1;
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

  // break span down '<span>Schritt ${currentStep} von ${maxStep - 1} </span>' to be able to export string to data

  render() {
    const { maxStep, notificationHtml, currentStep, nextStep } = this;

    return html`
    <div style="display:flex;">
    <div class="left-side" style="flex-direction:row-reverse;flex-basis:50%;"> 

    ${
      this.isLoading
        ? html`<bcg-progress></bcg-progress>`
        : html`
            ${this.showNotification
              ? html`<bcg-notification
                  variant=${this.notificationType}
                  message=${this.notificationMessage}
                ></bcg-notification> `
              : null}
            ${currentStep >= maxStep - 1
              ? null
              : html`<h1>Willkommen!</h1>
                  <h2>Registrierung</h2>
                  <span>Schritt ${currentStep} von ${maxStep - 1} </span>`}
            ${currentStep === 1
              ? html`<bcg-register-step-one
                  .nextStep="${nextStep}"
                ></bcg-register-step-one>`
              : null}
            ${currentStep === 2
              ? html`<bcg-register-step-two
                  .nextStep="${nextStep}"
                ></bcg-register-step-two> `
              : null}
            ${currentStep === 3
              ? html`<bcg-register-step-three
                  .user=${this.user}
                  .nextStep="${nextStep}"
                ></bcg-register-step-three> `
              : null}
            ${currentStep === 4
              ? html`<bcg-register-step-finished
                  .user=${this.user}
                  .nextStep="${nextStep}"
                ></bcg-register-step-finished> `
              : null}
          `
    }
        </div>
        <div class="right-side" style="display:flex; flex-basis:50%;">
          <img src="https://images.unsplash.com/photo-1654729746829-87fc9bc48ad7" style="height: 100%;width: 100%;" alt="123"/>
        </div>
        </div>
      </div>
      
    `;
  }
}
