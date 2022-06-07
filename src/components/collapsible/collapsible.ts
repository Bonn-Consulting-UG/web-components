import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionCollapsible } from '@lion/collapsible';

export class BcgCollapsible extends ScopedElementsMixin(LitElement) {
  buttonLabel: string;

  content: string;

  constructor() {
    super();
    this.buttonLabel = 'Default Label';
    this.content = '123';
  }

  static get properties() {
    return {
      buttonLabel: { type: String },
      content: { type: String },
    };
  }

  static get scopedElements() {
    return { 'lion-collapsible': LionCollapsible };
  }

  render() {
    return html`
      <lion-collapsible opened>
        <button slot="invoker">${this.buttonLabel}</button>
        <div slot="content">${this.content}</div>
      </lion-collapsible>
    `;
  }
}
