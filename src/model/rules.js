import mongoose from 'mongoose';

const RuleSchema = new mongoose.Schema({
  rule: {
    field: {
      type: String,
    },
    condition: {
      type: String,
      enum: ['eq', 'neq', 'gt', 'gte', 'contains']
    },
    condition_value: {
      type: String,
    }
  },
  data: {
    name: {
      type: String,
      required: true
    },
    crew: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    position: {
      type: String,
      enum: ['Captain', 'Major General', 'lieutenant', 'Colonel', 'sergeant'],
      required: true
    },
    missions: {
      count: {
        type: Number
      },
      successful: {
        type: Number
      },
      failed: {
        type: Number
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Rule', RuleSchema);
