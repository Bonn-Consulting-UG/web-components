import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/IdeaSubmission',
  component: 'bcg-idea-submission',
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
  html`<bcg-idea-submission
    moduleId="2b3004fd-8e18-41ad-a763-6b63482cbcdf"
  ></bcg-idea-submission> `;

const Default = DefaultTemplate.bind({});

Default.args = {};

export { Default };
