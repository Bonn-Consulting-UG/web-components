import { LionTextarea } from '@lion/textarea';
import { css, html } from '@lion/core';

export class BcgTextareaWithCounter extends LionTextarea {
  render() {
    return html`<bcg-textarea></bcg-textarea>`;
  }

  updated() {
    console.log(this.querySelector('textarea')?.value.length);
  }
}
