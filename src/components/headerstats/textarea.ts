import { LionTextarea } from '@lion/textarea';
import { css, html, property, TemplateResultType } from '@lion/core';
import { MaxLength } from '@lion/form-core';
import { BcgModule } from '../module';

export class BcgTextarea extends BcgModule {
  @property({ type: Function }) count: any = 0;

  static get styles() {
    return [css``];
  }

  updated(_changed: any) {
    super.updated(_changed);
    this.count = this.querySelector('textarea')?.value.length;
  }
  render() {
    return html``;
  }
}
