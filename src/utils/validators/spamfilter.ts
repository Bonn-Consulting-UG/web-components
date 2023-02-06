import { Unparseable, Validator } from '@lion/form-core';

const isInterpretableValue = (mv: any) => mv && !(mv instanceof Unparseable);

export class SpamMatch extends Validator {
  static get validatorName() {
    return 'SpamMatch';
  }

  static async getMessage() {
    return `Bitte wähle sie das richtige Icon aus`;
  }

  // eslint-disable-next-line class-methods-use-this
  execute(input: any, expected: any) {
    if (isInterpretableValue(input) && isInterpretableValue(expected)) {
      return input !== expected;
    }
    return false;
  }
}
