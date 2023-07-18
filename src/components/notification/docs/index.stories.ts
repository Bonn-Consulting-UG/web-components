import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Notification',
  component: 'bcg-notification',
  argTypes: {
    type: {
      control: 'radio',
      options: ['success', 'info', 'error', 'warning'],
    },
  },
};

interface ArgTypes {
  type: string;
  message: string;
}

const Template: Story<ArgTypes> = args =>
  html`
    <bcg-notification
      variant="${args.type}"
      message="${args.message}"
    ></bcg-notification>
  `;

const Default = Template.bind({});

Default.args = {
  type: 'success',
  message: `success`,
};

export { Default };
