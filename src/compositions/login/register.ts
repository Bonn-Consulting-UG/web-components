/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

import { BcgRegisterStepOne } from './register-step-one';
import { BcgRegisterStepTwo } from './register-step-two';
import { BcgRegisterStepFinished } from './register-step-finished';

export class BcgRegister extends ScopedElementsMixin(LitElement) {
  currentStep: number = 0;

  maxStep: number = 3;

  nextStep = () => {
    if (this.currentStep < 2) {
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
      'bcg-register-step-finished': BcgRegisterStepFinished,
    };
  }

  static get styles() {
    return [css``];
  }

  render() {
    const { maxStep, currentStep, nextStep } = this;
    return html`
    <form>
    <div style="display:flex;">

      <div class="left-side" style="flex-direction:row-reverse; width:640px;"> 
    
      ${
        currentStep >= 2
          ? null
          : html`<h1>Willkommen!</h1>
              <h2>Registrierung</h2>
              <span>Schritt ${currentStep + 1} von ${maxStep - 1} </span>`
      }

        ${
          currentStep === 0
            ? html`<bcg-register-step-one></bcg-register-step-one>
                <bcg-button
                  @click="${() => nextStep()}"
                  label="Registrieren"
                ></bcg-button>`
            : null
        }
        ${
          currentStep === 1
            ? html`<bcg-register-step-two></bcg-register-step-two>
                <bcg-button
                  @click="${() => nextStep()}"
                  label="Code abschicken"
                ></bcg-button> `
            : null
        }
        ${
          currentStep === 2
            ? html`<bcg-register-step-finished></bcg-register-step-finished>
                <bcg-button
                  @click="${() => nextStep()}"
                  label="Jetzt beteiligen"
                ></bcg-button>`
            : null
        }


      </div>
      <div class="right-side">
        <img src="https://images.unsplash.com/photo-1654729746829-87fc9bc48ad7" style="width:629px;height:864px;" alt="123"></img>
      </div>


    

      </div>
      
    `;
  }
}
