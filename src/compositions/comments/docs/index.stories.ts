import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/Comments',
  component: 'bcg-comments',
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
const Template: Story<ArgTypes> = () => html` <bcg-comments></bcg-comments> `;

const Default = Template.bind({});

Default.args = {};

export { Default };
