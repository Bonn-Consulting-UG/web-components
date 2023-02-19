import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Compositions/Reaction',
  component: 'bcg-reaction',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}
const Template: Story<ArgTypes> = () =>
  html`
    <bcg-idea-reaction
      submissionId="e49a4102-822e-41c7-b308-2af32736c079"
    ></bcg-idea-reaction>
  `;

const IdeaReaction = Template.bind({});

IdeaReaction.args = {};

export { IdeaReaction };
