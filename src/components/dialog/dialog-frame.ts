import { LitElement, html, css } from '@lion/core';

export class BcgDialogFrame extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 600px;
        position: relative;
        box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.4);
        background-color: grey;
        border-radius: 3px;
      }
      .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
      }
      :host(:not([no-padding])) .content-container {
        padding: 10px 10px;
      }
      ::slotted([slot='header']) {
        text-align: center !important;
        padding: 3px !important;
        border-bottom: 1px solid grey !important;
      }
    `;
  }

  hasCloseButton: boolean = false;

  static get properties() {
    return {
      hasCloseButton: {
        type: Boolean,
        reflect: true,
        attribute: 'has-close-button'
      },
      noPadding: {
        type: Boolean,
        reflect: true,
        attribute: 'no-padding'
      }
    };
  }

  render() {
    return html`
      ${this.hasCloseButton
        ? html`
            <bcg-button
              variation="teritary"
              class="close-btn"
              @click=${() => {
                this.dispatchEvent(
                  new Event('close-overlay', { bubbles: true })
                );
              }}
            >
              ✖
            </bcg-button>
          `
        : ''}
      <slot name="header"></slot>
      <div class="content-container">
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}
