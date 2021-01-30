const payload1 = {
  rule: {
    field: 'missions.count',
    condition: 'gte',
    condition_value: 30
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: {
      count: 45,
      successful: 44,
      failed: 1
    }
  }
};

const payload2 = {
  rule: {
    field: '0',
    condition: 'eq',
    condition_value: 'a'
  },
  data: 'damien-marley'
};

const payload3 = {
  rule: {
    field: '5',
    condition: 'contains',
    condition_value: 'rocinante'
  },
  data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho']
};

const payload4 = {
  rule: {
    field: '0',
    condition: 'neq',
    condition_value: 'a'
  },
  data: 'damien-marley'
};

const validateRule = {
  rule: {
    condition: 'gte',
    condition_value: 30
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: {
      count: 45,
      successful: 44,
      failed: 1
    }
  }
};

export {
  payload1,
  payload2,
  payload3,
  payload4,
  validateRule,
};
