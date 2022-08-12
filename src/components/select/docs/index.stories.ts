import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Select',
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

const Template: Story<ArgTypes> = () => html`
  <bcg-select>

  <select slot="input">
    <option  selected hidden value>Sort By</option>
      <option  value="Neuste">Neuste</option>
      <option value="Beliebteste">Beliebteste</option>
      <option value="Ältest">Ältest</option>
    </select>

    </slot></bcg-select
  >
`;

export const Default = Template.bind({});
