import { css } from '@lion/core';
import { LionSwitchButton } from '@lion/switch';

export class BcgSwitchButton extends LionSwitchButton {
  static get styles() {
    return [
      ...super.styles,
      css`
        .input-group__container > .input-group__input ::slotted(.form-control) {
          border: 2px solid var(--primary-color) !important;
        }
        .input-group__container
          > .input-group__input
          ::slotted(.form-control:focus) {
          box-shadow: none !important;
        }
        .switch-button__thumb {
          border-radius: 20px;
          top: -3px;
        }

        .switch-button__track {
          border-radius: 20px;
          height: 60%;
        }

        :host([checked]) .switch-button__track {
          background-color: var(--alert-color-success);
        }

        .switch-button__track {
          background-color: var(--alert-color-error);
        }
        .switch-button__thumb {
        }
        :host([checked]) .switch-button__thumb {
        }
      `,
    ];
  }

  // TODO: _handleKeyup once merged: https://github.com/ing-bank/lion/pull/1482
  _handleKeyup(ev: any) {
    switch (ev.key) {
      case ' ':
      case 'Enter':
        this._toggleChecked();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (!this.checked) {
          this._toggleChecked();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (this.checked) {
          this._toggleChecked();
        }
        break;
      /* no default */
    }
  }
}
