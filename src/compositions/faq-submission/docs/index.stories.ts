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
  html`<bcg-faq-submission moduleId="2b3006fd-8e18-41ad-a763-6b63482cbcdf"></bcg-faq-submission> `;

const LoggedInTemplate: Story<ArgTypes> = () =>
  html` <bcg-faq-submission isLoggedIn></bcg-faq-submission> `;

const Default = DefaultTemplate.bind({});
const LoggedIn = LoggedInTemplate.bind({});

Default.args = {};

export { Default, LoggedIn };
