const checkNestedData = (data) => {
  for (const key in data) {
    if (typeof data[key] === 'object') {
      return true;
    }
  }
};

const validateCondition = (rule) => {
  const conditions = ['eq', 'neq', 'gt', 'gte', 'contains'];
  for (let i = 0; i < conditions.length; i++) {
    const validCondition = conditions.includes(rule.condition);
    if (validCondition) {
      return true;
    }
    return false;
  }
};
export { checkNestedData, validateCondition };
