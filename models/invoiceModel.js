import mongoose from 'mongoose';

const invoiceSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User Identifier',
    },
  },{
    status: {
        type: String,
        required: true
    }
  },{
    amount: {
        type: Number,
        required: true
    }
  },
  {
    timestamps: true,
  }
)

const Invoice = mongoose.model('invoices', invoiceSchema);

export default Invoice;