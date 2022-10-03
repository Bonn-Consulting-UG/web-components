import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Notification',
  component: 'bcg-notification',
  argTypes: {
    type: {
      control: 'radio',
      options: ['success', 'info', 'error', 'warning']
    }
  }
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  type: string;
  message: string;
}
const Template: Story<ArgTypes> = args =>
  html`
    <bcg-notification
      disabled
      variant="${args.type}"
      message="${args.type}"
    ></bcg-notification>
  `;

const Default = Template.bind({});

Default.args = {
  type: 'success',
  message: `success`
};

export { Default };
