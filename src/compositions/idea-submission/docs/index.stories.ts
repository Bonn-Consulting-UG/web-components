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
    moduleId="28bf3d9e-a00a-44fb-af21-e3b30ffa4473"
  ></bcg-idea-submission> `;

const IdeaUserMenuTemplate: Story<ArgTypes> = () =>
  html`<bcg-idea-user-menu
    moduleId="5b81a51e-11b6-4718-a971-e95d13e27595"
  ></bcg-idea-user-menu> `;

const IdeaUserMenuSubmissionTemplate: Story<ArgTypes> = () =>
  html`<bcg-idea-user-menu
    submissionId="65347e88-80f1-43d1-af0b-fda63f6c9f50"
  ></bcg-idea-user-menu> `;

const Default = DefaultTemplate.bind({});
const IdeaUserMenu = IdeaUserMenuTemplate.bind({});

Default.args = {};

export { Default, IdeaUserMenu, IdeaUserMenuSubmissionTemplate };
