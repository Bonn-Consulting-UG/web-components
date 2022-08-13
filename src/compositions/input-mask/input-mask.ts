/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

import { BcgInputMaskStepOne } from './input-mask-step-one';
import { BcgInputMaskStepTwo } from './input-mask-step-two';

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
    };
  }

  static get styles() {
    return [css``];
  }

  render() {
    const { currentStep, nextStep } = this;
    return html` <form>
      <div style="display:flex;">
        <div style="flex-direction:row-reverse;">
          ${currentStep === 0
            ? html`<bcg-input-mask-step-one
                .nextStep="${nextStep}"
              ></bcg-input-mask-step-one>`
            : null}
          ${currentStep === 1
            ? html`<bcg-input-mask-step-two></bcg-input-mask-step-two>`
            : null}
        </div>
      </div>
    </form>`;
  }
}
