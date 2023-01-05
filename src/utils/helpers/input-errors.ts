import { IsEmail, MaxLength, MinLength, Required } from '@lion/form-core';

Required.getMessage = async value => {
  let label: any;

  switch (value?.params) {
    case 'Textarea':
      label = `Bitte geben Sie eine Nachricht ein`;
      break;
    case 'Checkbox':
      label = `Bitte überprüfen Sie die Eingabe`;
      break;

    case 'Input':
      label = `Angabe benötigt`;
      break;
    default:
      label = `Angabe benötigt`;
      break;
  }

  return label;
};

IsEmail.getMessage = async () => 'Muss eine gültige Email sein';

MaxLength.getMessage = async value =>
  `Hier sind maximal ${value?.params} Zeichen erlaubt`;

MinLength.getMessage = async value =>
  `Bitte geben Sie mindestens ${value?.params} Zeichen ein`;

export { Required, MaxLength, MinLength, IsEmail };
