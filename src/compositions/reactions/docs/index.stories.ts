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
      moduleId="3275cc46-38da-4033-a281-acedadc93db6"
    ></bcg-idea-reaction>
  `;

const IdeaReaction = Template.bind({});

IdeaReaction.args = {};

export { IdeaReaction };
