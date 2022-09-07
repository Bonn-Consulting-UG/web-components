import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/InputMask',
  component: 'bcg-input-mask',
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
const TemplateLogin: Story<ArgTypes> = () =>
  html` <bcg-input-mask></bcg-input-mask> `;

const Default = TemplateLogin.bind({});

Default.args = {};

export { Default };
