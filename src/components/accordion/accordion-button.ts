import {
  css,
  html,
  LitElement,
  property,
  ScopedElementsMixin,
} from '@lion/core';

export class BcgAccordionButton extends ScopedElementsMixin(LitElement) {
  @property() label: any = 'No Label Set ';

  static get styles() {
    return [
      css`
        button {
          font-size: 25px;
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          color: var(--primary-color);
        }
      `,
    ];
  }
  render() {
    return html`<button>${this.label}</button> `;
  }
}
