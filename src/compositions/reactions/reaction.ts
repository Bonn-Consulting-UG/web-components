import { html, property, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';
import { css, PropertyValueMap } from 'lit';
import { BcgModule } from '../../components/module';

export class BcgReaction extends ScopedElementsMixin(BcgModule) {
  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  @property({ type: Function }) clickHandler: Function = () =>
    console.log('123');

  @property({ type: String }) value: any;

  @property({ type: String }) iconclass: any;

  @property({ type: String }) icon: any;

  static get styles() {
    return [
      css`
        .filled svg {
          fill: var(--primary-color);
        }
        .filled svg path {
          stroke: var(--neutral-color-0);
          stroke-width: 1px;
        }
      `,
    ];
  }

  render() {
    return html` <div style="display:flex;">
      <div
        @click=${() => this.clickHandler()}
        style="display:flex;flex-diretion:row;margin-right:10px;padding:10px;align-items: center;"
      >
        <lion-icon class=${this.iconclass} icon-id="${this.icon}"></lion-icon>
        <span style="margin-left:10px;">${this.value} </span>
      </div>
    </div>`;
  }
}
