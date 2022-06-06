import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'InputRange',
  component: 'bcg-input-range',
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
  html` <bcg-input-range></bcg-input-range> `;

export const Default = Template.bind({});
