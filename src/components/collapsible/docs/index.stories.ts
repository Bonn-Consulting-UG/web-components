import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Collapsible',
  component: 'bcg-collapsible',
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  content: string;
  buttonLabel: string;
}

const Template: Story<ArgTypes> = args =>
  html`
    <bcg-collapsible
      .content=${args.content}
      .buttonLabel=${args.buttonLabel}
    ></bcg-collapsible>
  `;
const Default = Template.bind({});

Default.args = {
  buttonLabel: 'Show Nutritional value',
  content: `Orange flesh is 87% water, 12% carbohydrates, 1% protein, and contains
  negligible fat (table). In a 100 gram reference amount, orange flesh
  provides 47 calories, and is a rich source of vitamin C, providing 64%
  of the Daily Value. No other micronutrients are present in significant
  amounts (table).`,
};

export { Default };
