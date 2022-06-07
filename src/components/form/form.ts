import { LionForm } from '@lion/form';
import { html, css, ScopedElementsMixin, LitElement } from '@lion/core';

import { BcgInput } from '../input/input.js';

export class BcgForm extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-form': LionForm, 'bcg-input': BcgInput };
  }

  static get styles() {
    return [
      css`
      }`,
    ];
  }

  render() {
    return html`
      <lion-form>
        <form>
          <bcg-input label="First Name"></bcg-input>
          <bcg-input label="Last Name"></bcg-input>
        </form>
      </lion-form>
    `;
  }
}
