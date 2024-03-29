import { css, html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionCollapsible } from '@lion/collapsible';
import { LionIcon } from '@lion/icon';
import { PropertyValueMap } from 'lit';

export class BcgCollapsible extends ScopedElementsMixin(LionCollapsible) {
  buttonLabel: string;

  content: string;

  static get styles() {
    return [
      css`
        .invoker {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 700;
          font-size: 25px;
          line-height: 40px;
          width: 100%;
          color: var(--primary-color);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.buttonLabel = 'Default';
    this.content = '123';
  }
}
