import {
  checkRule,
  checkPayload,
  checkCondition
} from '../validation/validation';
import { checkNestedData } from '../service/service';

const rulesValidation = (req, res) => {
  const { rule, data } = req.body;
  const error = checkRule(rule);
  if (error) {
    return res.status(400).json({
      message: `${error}`,
      status: 'error',
      data: null
    });
  }

  const err = checkPayload(rule, data);
  if (err) {
    return res.status(400).json({
      message: `${err}`,
      status: 'error',
      data: null
    });
  }
  //  check if rule condition is available in data
  const error2 = checkCondition(rule);
  if (error2) {
    return res.status(400).json({
      message: `${error2}`,
      status: 'error',
      data: null
    });
  }

  let validCondition;
  const conditionValue = rule.condition_value;
  const nestedData = checkNestedData(data);
  if (nestedData) {
    for (const key in data) {
      if (typeof data[key] === 'object') {
        const nestedObjects = data[key];
        const valueContents = Object.values(nestedObjects);

        if (rule.condition === 'contains') {
          validCondition = valueContents.includes(conditionValue);
          if (validCondition === true) {
            return res.status(200).json(
              {
                message: `field ${rule.field} successfully validated.`,
                status: 'success',
                data: {
                  validation: {
                    error: false,
                    field: `${rule.field}`,
                    field_value: `${valueContents}`,
                    condition: `${rule.condition}`,
                    condition_value: `${rule.condition_value}`
                  }
                }
              }
            );
          }
          return res.status(400).json(
            {
              message: `field ${rule.field} failed validation.`,
              status: 'error',
              data: {
                validation: {
                  error: true,
                  field: `${rule.field} `,
                  field_value: `${valueContents}`,
                  condition: `${rule.condition}`,
                  condition_value: `${rule.condition_value}`
                }
              }
            }
          );
        }

        for (const value in nestedObjects) {
          if ((rule.condition === 'neq') && (nestedObjects[value] !== conditionValue)) {
            validCondition = true;
          }

          if ((rule.condition === 'eq') && (nestedObjects[value] === conditionValue)) {
            validCondition = true;
          }

          if ((rule.condition === 'gte' && nestedObjects[value] >= conditionValue) || (rule.condition === 'gt' && nestedObjects[value] > conditionValue)) {
            validCondition = true;
          }

          if (validCondition === true) {
            return res.status(200).json(
              {
                message: `field ${rule.field} successfully validated.`,
                status: 'success',
                data: {
                  validation: {
                    error: false,
                    field: `${rule.field}`,
                    field_value: `${nestedObjects[value]}`,
                    condition: `${rule.condition}`,
                    condition_value: `${rule.condition_value}`
                  }
                }
              }
            );
          }

          if (!validCondition) {
            return res.status(400).json(
              {
                message: `field ${rule.field} failed validation.`,
                status: 'error',
                data: {
                  validation: {
                    error: true,
                    field: `${rule.field} `,
                    field_value: `${nestedObjects[value]}`,
                    condition: `${rule.condition}`,
                    condition_value: `${rule.condition_value}`
                  }
                }
              }
            );
          }
        }
      }
    }
  }
  if (nestedData === undefined) {
    const dataValues = Object.values(data);
    if (rule.condition === 'contains') {
      validCondition = dataValues.includes(conditionValue);
      if (validCondition === true) {
        return res.status(200).json(
          {
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
              validation: {
                error: false,
                field: `${rule.field}`,
                field_value: `${dataValues}`,
                condition: `${rule.condition}`,
                condition_value: `${rule.condition_value}`
              }
            }
          }
        );
      }
      if (validCondition === false) {
        return res.status(400).json(
          {
            message: `field ${rule.field} failed validation.`,
            status: 'error',
            data: {
              validation: {
                error: true,
                field: `${rule.field} `,
                field_value: `${dataValues}`,
                condition: `${rule.condition}`,
                condition_value: `${rule.condition_value}`
              }
            }
          }
        );
      }
    }
    for (const values in data) {
      const datakeys = Object.keys(data);
      const dataValue = Object.values(data);
      for (let i = 0; i < datakeys.length; i++) {
        if (datakeys[i] === rule.field) {
          for (let j = 0; j < dataValue.length; j++) {
            if ((rule.condition === 'neq') && (dataValue[i] !== conditionValue)) {
              validCondition = true;
            }

            if ((rule.condition === 'eq') && (dataValue[i] === conditionValue)) {
              validCondition = true;
            }

            if ((rule.condition === 'gte' && dataValue[i] >= conditionValue) || (rule.condition === 'gt' && dataValue[i] > conditionValue)) {
              validCondition = true;
            }
          }
        }
        if (validCondition === true) {
          return res.status(200).json(
            {
              message: `field ${rule.field} successfully validated.`,
              status: 'success',
              data: {
                validation: {
                  error: false,
                  field: `${rule.field}`,
                  field_value: `${data[values]}`,
                  condition: `${rule.condition}`,
                  condition_value: `${rule.condition_value}`
                }
              }
            }
          );
        }
        if (!validCondition) {
          return res.status(400).json(
            {
              message: `field ${rule.field} failed validation.`,
              status: 'error',
              data: {
                validation: {
                  error: true,
                  field: `${rule.field} `,
                  field_value: `${dataValue[i]}`,
                  condition: `${rule.condition}`,
                  condition_value: `${rule.condition_value}`
                }
              }
            }
          );
        }
      }
    }
  }
};

export default rulesValidation;
