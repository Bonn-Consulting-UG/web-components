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
    moduleId="01378418-d181-4cea-8998-63bc84e0c0cc"
  ></bcg-idea-submission> `;

const IdeaUserMenuTemplate: Story<ArgTypes> = () =>
  html`<bcg-idea-user-menu
    moduleId="2b3004fd-8e18-41ad-a763-6b63482cbcdf"
  ></bcg-idea-user-menu> `;

const Default = DefaultTemplate.bind({});
const IdeaUserMenu = IdeaUserMenuTemplate.bind({});

Default.args = {};

export { Default, IdeaUserMenu };
