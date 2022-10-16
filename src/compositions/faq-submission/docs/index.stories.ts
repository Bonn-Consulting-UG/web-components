import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/FaqSubmission',
  component: 'bcg-faq-submission',
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
  html`<bcg-faq-submission
    moduleId="7bb981b2-fda8-40fc-b23c-4b20410723df"
  ></bcg-faq-submission> `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
