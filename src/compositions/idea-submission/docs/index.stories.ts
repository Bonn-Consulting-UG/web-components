import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Compositions/IdeaSubmission',
  component: 'bcg-idea-submission',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}

const DefaultTemplate: Story<ArgTypes> = () =>
  html`<bcg-idea-submission
    moduleId="5b81a51e-11b6-4718-a971-e95d13e27595"
  ></bcg-idea-submission> `;

const IdeaUserMenuTemplate: Story<ArgTypes> = () =>
  html`<bcg-idea-user-menu
    moduleId="5b81a51e-11b6-4718-a971-e95d13e27595"
  ></bcg-idea-user-menu> `;

const Default = DefaultTemplate.bind({});
const IdeaUserMenu = IdeaUserMenuTemplate.bind({});

Default.args = {};

export { Default, IdeaUserMenu };
