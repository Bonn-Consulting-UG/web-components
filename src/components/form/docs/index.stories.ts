import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Form',
  component: 'bcg-form',
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

const Template: Story<ArgTypes> = () => html` <bcg-form></bcg-form> `;

export const Default = Template.bind({});
