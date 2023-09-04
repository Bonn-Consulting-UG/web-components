import { css, html } from '@lion/core';
import { LionIcon } from '@lion/icon';
import { BcgInput } from '../input/input';

export class BcgInputPassword extends BcgInput {

  type = 'password';

  static get styles() {
    return [
      css`
        .input-password-wrapper {
          position: relative;
        }

        .visibility-icon {
          position: absolute;
          right: 2%;
          width: 24px;
          height: 24px;
        }

        .no-label {
          top: 6px;
        }
      `,
    ];
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  constructor() {
    super();
  }

  calculateIconOffset() {
    const inputElement = this.shadowRoot?.querySelector('.form-control') as HTMLElement;
    const iconElement = this.shadowRoot?.querySelector('.visibility-icon') as HTMLElement;
    if (!iconElement || !inputElement) {
      return;
    }
    const offsetTop = inputElement.offsetTop;
    const inputHeight = inputElement.clientHeight;
    const iconHeight = iconElement.clientHeight;
    const calculatedOffset = offsetTop + inputHeight/2 - iconHeight/2;
    iconElement.style.top = calculatedOffset + 'px';
  }

  render() {
    const { validators, label, type, placeholder, name } = this;
    this.calculateIconOffset();
    return html` <div class="input-password-wrapper">
      <bcg-input
        .validators=${validators}
        label=${label}
        type=${type}
        placeholder=${placeholder}
        name=${name}
        .modelValue=${this.modelValue}
        @model-value-changed=${({ target }: any) => {
          this.modelValue = target.value;
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
