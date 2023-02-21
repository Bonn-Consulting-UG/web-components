import { html } from '@lion/core';
import { Required } from '@lion/form-core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/InputPassword',
  component: 'bcg-input-password',
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

let password = '';

const Template: Story<ArgTypes> = () =>
  html`
    <bcg-input-password
      .validators=${[new Required()]}
      type="password"
      label="Password Input"
      name="password"
      placeholder="Enter password"
      .modelValue=${password}
      @model-value-changed=${({ target }: any) => {
        password = target.value;
      }}
    ></bcg-input-password>
  `;

export const Default = Template.bind({});
