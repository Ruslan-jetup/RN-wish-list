import _ from 'lodash';

export const prepareValidatorResult = <T extends Record<string, any>>(
  result: T,
): Record<keyof T, string> => {
  if (_.isEmpty(result)) {
    return {} as Record<keyof T, string>;
  }

  _.each(result, (it, key, arr: any) => {
    arr[key] = it[0];
  });

  return result as Record<keyof T, string>;
};
