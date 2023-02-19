import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Accordion',
  component: 'bcg-accordion',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}
const Template: Story<ArgTypes> = () => html` <bcg-accordion></bcg-accordion> `;

const Default = Template.bind({});

Default.args = {
  buttonLabel: 'Show Nutritional value',
  content: ` Orange flesh is 87% water, 12% carbohydrates, 1% protein, and contains
  negligible fat (table). In a 100 gram reference amount, orange flesh
  provides 47 calories, and is a rich source of vitamin C, providing 64%
  of the Daily Value. No other micronutrients are present in significant
  amounts (table).`,
};

export { Default };
