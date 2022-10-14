import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/Dialogs',
  component: 'bcg-comments',
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  buttonLabel: string;
  content: string;
}
const TemplateComments: Story<ArgTypes> = () =>
  html`   <dialog id="dialog">
  <form method="dialog">
    <bcg-login></bcg-login>
  </form>
</dialog>

<button @click="dialog.showModal()">Open Dialog</button>
  `;

const Default = TemplateComments.bind({});

Default.args = {};

export { Default };
