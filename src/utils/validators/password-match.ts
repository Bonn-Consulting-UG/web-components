import { Unparseable, Validator } from '@lion/form-core';

const isInterpretableValue = (mv: any) => mv && !(mv instanceof Unparseable);

export class PasswordMatch extends Validator {
  static get validatorName() {
    return 'PasswordsMatch';
  }

  static async getMessage() {
    return `Passwörter stimmen nicht überein`;
  }

  // eslint-disable-next-line class-methods-use-this
  execute({ password, passwordrepeat }: any, param: any) {
    console.log(password);
    if (isInterpretableValue(password) && isInterpretableValue(password)) {
      return password !== passwordrepeat;
    }
    return false;
  }
}
