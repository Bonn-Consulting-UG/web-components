import { LionTooltip } from '@lion/tooltip';
import { css } from '@lion/core';

export class BcgTooltip extends LionTooltip {
  static get styles() {
    return [...super.styles, css``];
  }
}
