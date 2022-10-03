import { css, html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';
import { BcgIcon } from '../icon';

export class BcgNotification extends ScopedElementsMixin(LitElement) {
  message: string;

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  static get properties() {
    return {
      ...super.properties,
      variant: {
        type: String,
        reflect: true
      },
      message: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.message = '';
  }

  static get styles() {
    return [
      css`
        :host([disabled]) .wrapper {
          display: none;
        }
        .wrapper {
          position: absolute;
          position: absolute;
          width: 90%;
          left: 5%;
          top: 50px;
          background-color: white;
          display: flex;
          align-item: center;
          padding: 8px;
          box-sizing: border-box;
          border: var(--border-m) solid var(--primary-color);
        }
        .wrapper lion-icon {
          align-self: center;
        }
        .wrapper span {
          margin-left: 10px;
        }
        :host([variant='success']) .wrapper,
        :host([variant='success']) .wrapper svg > path {
          stroke: var(--alert-color-success);
          fill: var(--alert-color-success);
          border-color: var(--alert-color-success);
        }
        :host([variant='error']) .wrapper,
        :host([variant='error']) .wrapper svg > path {
          stroke: var(--alert-color-error);
          fill: var(--alert-color-error);
          border-color: var(--alert-color-error);
        }
        :host([variant='warning']) .wrapper,
        :host([variant='warning']) .wrapper svg > path {
          stroke: var(--alert-color-warning);
          fill: var(--alert-color-warning);
          border-color: var(--alert-color-warning);
        }
        :host([variant='info']) .wrapper,
        :host([variant='info']) .wrapper svg > path {
          stroke: var(--alert-color-info);
          fill: var(--alert-color-info);
          border-color: var(--alert-color-info);
        }
      `
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <lion-icon icon-id="bcg:comments:message"></lion-icon>
        <span>${this.message}</span>
      </div>
    `;
  }
}
