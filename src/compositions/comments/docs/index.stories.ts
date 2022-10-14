import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/Comments',
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
  html` <bcg-comments moduleId="3275cc46-38da-4033-a281-acedadc93db6"></bcg-comments> `;

const Default = TemplateComments.bind({});

Default.args = {};

export { Default };
