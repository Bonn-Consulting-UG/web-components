import { css } from '@lion/core';
import { LionCalendar } from '@lion/calendar';

export class BcgCalendar extends LionCalendar {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host > * {
          border: 1px solid #adadad;
          box-shadow: 0 0 16px #ccc;
          max-width: 500px;
        }
      `,
    ];
  }
}
