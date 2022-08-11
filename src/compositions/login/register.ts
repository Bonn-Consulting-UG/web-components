/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

import { BcgRegisterStepOne } from './register-step-one';
import { BcgRegisterStepTwo } from './register-step-two';
import { BcgRegisterStepThree } from './register-step-three';
import { BcgRegisterStepFinished } from './register-step-finished';
import {
  sendRegisterRequest,
  checkVerifyCode
} from '../../utils/services/login';

import registerData from '../../utils/data/composition/register.json' assert { type: 'json' };

export class BcgRegister extends ScopedElementsMixin(LitElement) {
  currentStep: number = 1;

  maxStep: number = 4;

  verifyCode: number = 0;

  user: any = 0;

  nextStep = async (payload: any) => {
    console.log(payload);
    let response: any = null;

    if (this.currentStep < this.maxStep) {
      if (this.currentStep === 2) {
        response = await sendRegisterRequest(payload);
        this.user = await response.json();

        console.log(this.user);
        if (response.status !== 201) return;
      }
      if (this.currentStep === 3) {
        await checkVerifyCode(this.user.id, payload);
        if (response.status !== 204) return;
      }
      this.currentStep += 1;
    } else {
      console.log('close Dialog');
    }
    this.requestUpdate();
  };

  static get scopedElements() {
    return {
      'bcg-register-step-one': BcgRegisterStepOne,
      'bcg-register-step-two': BcgRegisterStepTwo,
      'bcg-register-step-three': BcgRegisterStepThree,
      'bcg-register-step-finished': BcgRegisterStepFinished
    };
  }

  static get styles() {
    return [css``];
  }

  // break span down '<span>Schritt ${currentStep} von ${maxStep - 1} </span>' to be able to export string to data

  render() {
    const { maxStep, currentStep, nextStep } = this;

    return html`
    <form>
    <div style="display:flex;">
      <div class="left-side" style="flex-direction:row-reverse;flex-basis:50%;"> 
          ${
            currentStep >= maxStep - 1
              ? null
              : html`<h1>${registerData.headline}</h1>
                  <h2>${registerData.headlineTwo}</h2>
                  <span>Schritt ${currentStep} von ${maxStep - 1} </span>`
          }
          
          ${
            currentStep === 1
              ? html`<bcg-register-step-one
                  .nextStep="${nextStep}"
                ></bcg-register-step-one>`
              : null
          }

          ${
            currentStep === 2
              ? html`<bcg-register-step-two
                  .nextStep="${nextStep}"
                ></bcg-register-step-two> `
              : null
          }
          ${
            currentStep === 3
              ? html`<bcg-register-step-three
                  .nextStep="${nextStep}"
                ></bcg-register-step-three> `
              : null
          }
          ${
            currentStep === 4
              ? html`<bcg-register-step-finished
                  .user=${this.user}
                  .nextStep="${nextStep}"
                ></bcg-register-step-finished> `
              : null
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
