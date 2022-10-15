import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';

export class BcgIcon extends ScopedElementsMixin(LitElement) {
  @property({ type: String }) iconId: String = '';

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  render() {
    const { iconId } = this;

    return html` <lion-icon icon-id="${iconId}"></lion-icon> `;
  }
}
