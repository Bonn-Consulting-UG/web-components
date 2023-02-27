import { css, html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';

export class BcgOverlay extends ScopedElementsMixin(LitElement) {

  @property({type: Boolean}) showCloseButton = true;
  @property({type: Function}) closeButtonCallback = () => { };

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  static get styles() {
    return css`
    .overlay {
      width: 100%;
      height: 100%;
      background-color: white;
      box-shadow: var(--core-shadow-plus-10);
      position: relative;
      z-index: 3;
    }

    .close-button {
      position: absolute;
      cursor: pointer;
      right: 20px;
      top: 20px;
      width: 25px;
      height: 25px;
    }

    .content {
      position: absolute;
      top: 50px;
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
    }
    `
  }

  render() {
    return html`
      <div class="overlay">
        <lion-icon
        @click=${() => this.closeButtonCallback()}
        class="close-button"
        icon-id="bcg:general:close">
        </lion-icon>

        <div class="content"><slot></slot></div>
      </div>
     `;
  }
}
