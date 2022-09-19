import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Input',
  component: 'bcg-input',
  argTypes: {}
};

interface ContentArgs {
  label: string;
  helpText: string;
  placeholder: string;
}

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

const Template: Story<ContentArgs> = args =>
  html`
    <bcg-input
      name=${args.label}
      label=${args.label}
      help-text=${args.helpText}
      placeholder=${args.placeholder}
    ></bcg-input>
  `;

const Default = Template.bind({});

Default.args = {
  label: 'Firstname',
  helpText: 'Please tell us your Firstname',
  placeholder: 'Joe'
};

export { Default };
