import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'Components/Icon',
  component: 'bcg-icon',
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
  html` <bcg-icon .icon="bcg:comments:thumbsup"></bcg-icon> `;

export const Default = Template.bind({});
