import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

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
      submissionId="eee9e6ba-298e-4d75-a97a-e6c160ce68f2"
    ></bcg-idea-reaction>
  `;

const IdeaReaction = Template.bind({});

IdeaReaction.args = {};

export { IdeaReaction };
