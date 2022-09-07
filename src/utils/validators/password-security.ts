import { IsString, Unparseable, Validator } from '@lion/form-core';

const isInterpretableValue = (mv: any) => mv && !(mv instanceof Unparseable);

export class PasswordSecurity extends Validator {
  static get validatorName() {
    return 'PasswordSecurity';
  }

  static async getMessage() {
    return `Password besteht nicht aus 12 Zeichen , 1 Großbuchstaben, 1 Sonderzeichen`;
  }

  // eslint-disable-next-line class-methods-use-this
  execute(value: any) {
    const isStringValidator = new IsString();

    console.log(typeof value);

    if (isInterpretableValue(value)) {
      // if (isStringValidator.execute(value) || !isInitialsRegex.test(value)) {
      // }
      // console.log(value);
      // return value.test(
      //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{12,}$'
      // );
    }
    return false;
  }
}
