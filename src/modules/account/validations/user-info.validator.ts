import { presenceCost, validateEmailRule } from 'shared';
import { validate } from 'validate.js';

const conditionalValidation = (fieldName: string, value: string) => {
  if (value && value.trim() !== '') {
    return {
      [fieldName]: constraints[fieldName],
    };
  }
  return {};
};

const constraints: any = {
  firstName: {
    length: {
      minimum: 2,
      message: 'At least two characters.',
    },
    format: {
      pattern: /^[a-zA-Zа-яА-ЯіїєІЇЄ\s-]+$/,
      message: 'Only letters and hyphens',
    },
  },
  lastName: {
    length: {
      minimum: 2,
      message: 'At least two characters.',
    },
    format: {
      pattern: /^[a-zA-Zа-яА-ЯіїєІЇЄ\s-]+$/,
      message: 'Only letters and hyphens',
    },
  },
  nickName: {
    presence: presenceCost,
  },
  dateOfBirth: {
    datetime: {
      dateOnly: true,
      latest: new Date(new Date().setFullYear(new Date().getFullYear() - 12)),
      message: 'You must be at least 12 years old.',
    },
  },
  email: {
    email: validateEmailRule,
  },
  phoneNumber: {},
  dialCode: {},
};

export const validateUserInfo = (data: any) => {
  const conditionalConstraints = {};

  Object.keys(constraints).forEach(field => {
    const value = data[field];

    if (typeof value === 'string' && value.trim() !== '') {
      Object.assign(
        conditionalConstraints,
        conditionalValidation(field, value),
      );
    }
  });

  return validate(data, conditionalConstraints);
};

