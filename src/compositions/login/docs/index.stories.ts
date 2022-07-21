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
const Login = TemplateLogin.bind({});
const Register = TemplateRegister.bind({});
const Logout = TemplateLogout.bind({});

Register.args = {};
Login.args = {};

export { Login, Logout, Register };
