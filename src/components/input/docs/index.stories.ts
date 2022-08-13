import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Input',
  component: 'bcg-input',
  argTypes: {
    content: {
      options: [],
    },
  },
};

interface ContentArgs {
  button: string;
  panel: string;
}

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  content: Array<ContentArgs>;
}

const Template: Story<ArgTypes> = () =>
  html`
    <bcg-input
      name="Firstname"
      help-text="Your first name"
      placeholder="Joe"
    ></bcg-input>
  `;

export const Default = Template.bind({});
