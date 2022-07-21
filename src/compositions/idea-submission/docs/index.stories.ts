import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/IdeaSubmission',
  component: 'bcg-comments',
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
  html`<bcg-idea-submission></bcg-idea-submission> `;

const LoggedInTemplate: Story<ArgTypes> = () =>
  html` <bcg-idea-submission isLoggedIn></bcg-idea-submission> `;

const Default = DefaultTemplate.bind({});
const LoggedIn = LoggedInTemplate.bind({});

Default.args = {};

export { Default, LoggedIn };
