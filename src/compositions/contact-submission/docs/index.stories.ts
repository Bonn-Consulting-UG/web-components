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
    moduleId="2b3006fd-8e18-41ad-a763-6b63482cbcdf"
  ></bcg-contact-submission> `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
