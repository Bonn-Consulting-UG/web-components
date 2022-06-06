import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'Radio Group',
  component: 'bcg-radio-group',
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
  html` <bcg-radio-group> </bcg-radio-group> `;

export const Default = Template.bind({});
