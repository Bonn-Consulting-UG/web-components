import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/FaqOverview',
  component: 'bcg-faq-overview',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
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

const DefaultTemplate: Story<ArgTypes> = () =>
  html`<bcg-faq-overview></bcg-faq-overview> `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
