import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
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
