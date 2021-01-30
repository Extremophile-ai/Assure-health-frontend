import { checkNestedData, validateCondition } from '../service/service';

const checkRule = (rule) => {
  let error;
  typeof rule === 'undefined' ? error = 'rule is required.'
    : typeof rule !== 'object' ? error = 'rule should be an object.'
      : !rule.field ? error = 'field is required.'
        : !rule.condition ? error = 'condition is required.'
          : typeof rule.condition !== 'string' ? error = 'condition should be a string.'
            : !rule.condition_value ? error = 'condition_value is required.'
              : typeof rule.field !== 'string' ? error = 'field should be a string.'
                : true;
  return error;
};

const checkPayload = (rule, data) => {
  let error;
  if (!rule && !data) {
    error = 'Invalid JSON payload passed.';
    return error;
  }

  if (typeof data === 'undefined') {
    error = 'data is required.';
    return error;
  }

  const nestedData = checkNestedData(data);
  if (nestedData) {
    const formatField = rule.field.split('.');
    for (const key in data) {
      if (typeof data[key] === 'object') {
        const checkField = data[key].hasOwnProperty(formatField[1]);
        if (!checkField) {
          error = `field ${rule.field} is missing from data.`;
          return error;
        }
      }
    }
  }

  //  if data does not contain nested objects
  if (nestedData === undefined) {
    const dataContents = Object.keys(data);
    const checkField = dataContents.includes(rule.field);
    if (!checkField) {
      error = `field ${rule.field} is missing from data.`;
      return error;
    }
  }
};

const checkCondition = (rule) => {
  let error;
  const isValid = validateCondition(rule);
  if (!isValid) {
    error = 'Condition is invalid.';
    return error;
  }
};

export {
  checkRule,
  checkPayload,
  checkCondition
};
