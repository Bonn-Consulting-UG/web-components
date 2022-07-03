/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

import { BcgInputMaskStepOne } from './input-mask-step-one';
import { BcgInputMaskStepTwo } from './input-mask-step-two';
import { BcgInputMaskStepFinished } from './input-mask-step-finished';

export class BcgInputMask extends ScopedElementsMixin(LitElement) {
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
      'bcg-input-mask-step-one': BcgInputMaskStepOne,
      'bcg-input-mask-step-two': BcgInputMaskStepTwo,
      'bcg-input-mask-step-finished': BcgInputMaskStepFinished,
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
            ? html`<bcg-input-mask-step-one></bcg-input-mask-step-one>
                <bcg-button
                  @click="${() => nextStep()}"
                  label="Registrieren"
                ></bcg-button>`
            : null
        }
        ${
          currentStep === 1
            ? html`<bcg-input-mask-step-two></bcg-input-mask-step-two>
                <bcg-button
                  @click="${() => nextStep()}"
                  label="Code abschicken"
                ></bcg-button> `
            : null
        }
        ${
          currentStep === 2
            ? html`<bcg-input-mask-step-finished></bcg-input-mask-step-one-finished>
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
