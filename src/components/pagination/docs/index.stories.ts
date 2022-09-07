import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Pagination',
  component: 'bcg-pagination',
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
  html` <bcg-pagination count="20" current="10"></bcg-pagination> `;

export const Default = Template.bind({});
