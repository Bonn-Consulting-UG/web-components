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
    moduleId="335eb649-8919-4d20-9797-d55b4c3e9f6d"
  ></bcg-contact-submission> `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
