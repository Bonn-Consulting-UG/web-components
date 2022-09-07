import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/InputDatepicker',
  component: 'bcg-input-datepicker',
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
  html` <bcg-input-datepicker></bcg-input-datepicker> `;

export const Default = Template.bind({});
