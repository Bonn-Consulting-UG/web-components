import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Spamfilter',
  component: 'bcg-spamfilter',
  argTypes: {
    content: {
      options: []
    }
  }
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
  html` <bcg-spamfilter></bcg-spamfilter> `;

export const Default = Template.bind({});