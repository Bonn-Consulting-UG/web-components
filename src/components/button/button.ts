import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionButton } from '@lion/button';

export class BcgButton extends ScopedElementsMixin(LitElement) {
  label: string;

  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.label = 'Default Label';
  }

  static get scopedElements() {
    return { 'lion-button': LionButton };
  }

  render() {
    console.log(this.label);
    return html` <lion-button> ${this.label} </lion-button>`;
  }
}
