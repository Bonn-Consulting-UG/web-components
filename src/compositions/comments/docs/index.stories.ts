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
  html` <bcg-comments moduleId="2b3006fd-8e18-41ad-a763-6b63482cbcdf"></bcg-comments> `;

const Default = TemplateComments.bind({});

Default.args = {};

export { Default };
