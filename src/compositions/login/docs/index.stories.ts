import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Compositions/UserLogin',
  component: 'bcg-login',
  argTypes: {
    content: {},
    buttonLabel: {},
  },
};

interface ArgTypes {
  buttonLabel: string;
  content: string;
}
const TemplateLogin: Story<ArgTypes> = () => html` <bcg-login></bcg-login> `;
const TemplateRegister: Story<ArgTypes> = () =>
  html` <bcg-register></bcg-register> `;
const TemplateProfile: Story<ArgTypes> = () =>
  html` <bcg-edit-user></bcg-edit-user> `;

const TemplateUserMenu: Story<ArgTypes> = () => {
  const signLanguage = {
    url: 'http://www.google.com',
    label: 'Gebärden Sprache',
  };

  const easyLanguage = {
    url: 'http://www.google.com',
    label: 'Leichte Sprache',
  };

  const extraMenu = [
    'qwehouqwh',
    {
      url: 'http://www.google.com',
      label: 'FAQ',
    },
    {
      url: 'http://www.google.com',
      label: 'Kontaktformular',
    },
    {
      url: 'http://www.google.com',
      label: 'Kontaktformular',
    },
    {
      url: 'http://www.google.com',
      label: 'Kontaktformular',
    },
  ];

  return html`
    <bcg-user-menu
      .extramenu=${extraMenu}
      .easylanguage=${easyLanguage}
      .signlanguage=${signLanguage}
    ></bcg-user-menu>
  `;
};

const PasswordReset: Story<ArgTypes> = () =>
  html` <bcg-password-reset></bcg-password-reset> `;

const TemplateVerify: Story<ArgTypes> = () => html` <bcg-verify></bcg-verify> `;

const Login = TemplateLogin.bind({});
const Profile = TemplateProfile.bind({});
const Register = TemplateRegister.bind({});
const UserMenu = TemplateUserMenu.bind({});
const UserVerify = TemplateVerify.bind({});
const PWR = PasswordReset.bind({});

Login.args = {};
Register.args = {};
Profile.args = {};

export { Login, Register, Profile, UserMenu, UserVerify, PWR };
