import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Compositions/UserLogin',
  component: 'bcg-login',
  argTypes: {
    content: {},
    buttonLabel: {}
  }
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  buttonLabel: string;
  content: string;
}
const TemplateLogin: Story<ArgTypes> = () => html` <bcg-login></bcg-login> `;
const TemplateRegister: Story<ArgTypes> = () =>
  html` <bcg-register></bcg-register> `;
const TemplateLogout: Story<ArgTypes> = () => html` <bcg-logout></bcg-logout> `;
const TemplateProfile: Story<ArgTypes> = () =>
  html` <bcg-edit-user></bcg-edit-user> `;

const Login = TemplateLogin.bind({});
const Profile = TemplateProfile.bind({});
const Register = TemplateRegister.bind({});
const Logout = TemplateLogout.bind({});

Login.args = {};
Register.args = {};
Profile.args = {};

export { Login, Logout, Register, Profile };
