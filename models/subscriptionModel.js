import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User Identifier',
    },
  },
  {
    timestamps: true,
  }
)

const Subscription = mongoose.model('subscriptions', subscriptionSchema);

export default Subscription;