import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'Select',
  component: 'bcg-select',
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

const Template: Story<ArgTypes> = () => html` <bcg-select> </bcg-select> `;

export const Default = Template.bind({});
