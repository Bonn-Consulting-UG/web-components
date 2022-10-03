import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/ContactSubmission',
  component: 'bcg-cantact-submission',
  argTypes: {
    content: {},
    buttonLabel: {}
  }
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
  html`<bcg-contact-submission
    moduleId="402647a9-ee85-4dfc-aa2d-f3a76fc09dad"
  ></bcg-contact-submission> `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
