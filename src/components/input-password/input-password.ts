import { css, html } from '@lion/core';
import { LionIcon } from '@lion/icon';
import { BcgInput } from '../input/input';

export class BcgInputPassword extends BcgInput {

  static get styles() {
    return [css`
      .input-password-wrapper {
        position: relative;
      }

      .visibility-icon {
        position: absolute;
        right: 2%;
        top: 32px;
        width: 24px;
        height: 24px;
      }
      
      .no-label {
        top: 6px;
      }
    `];
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  constructor() {
    super();
  }

  render() {
    const {
      validators,
      label,
      type,
      placeholder,
      name
      } = this;
    let { modelValue } = this;

    return html`
    <div class="input-password-wrapper">
      <bcg-input
      .validators=${validators}
      label=${label}
      type=${type}
      placeholder=${placeholder}
      name=${name}
      .modelValue=${modelValue}
      @model-value-changed=${({ target }: any) => {
        modelValue = target.value;
      }}
      ></bcg-input>

      <lion-icon
      class="visibility-icon ${this.label ? null : 'no-label'}"
      @click=${this.flipPasswordInput}
      icon-id="${this.type === 'password'
        ? 'bcg:general:eye'
        : 'bcg:general:eyeopen'}"
      ></lion-icon>
    </div>`;
  }

  flipPasswordInput() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
