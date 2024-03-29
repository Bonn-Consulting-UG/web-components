import { html, TemplateResult } from '@lion/core';

export default {
  title: 'Components/Stats',
  component: 'bcg-textarea',
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

const Template: Story<ArgTypes> = () => html` <bcg-textarea> </bcg-textarea> `;

export const Default = Template.bind({});
