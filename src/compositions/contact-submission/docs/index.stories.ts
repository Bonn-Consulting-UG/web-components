import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/ContactSubmission',
  component: 'bcg-cantact-submission',
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
  html`<bcg-contact-submission
    moduleId="3275cc46-38da-4033-a281-acedadc93db6"
  ></bcg-contact-submission> `;

const ContactSubmission = DefaultTemplate.bind({});

ContactSubmission.args = {};

export { ContactSubmission };
