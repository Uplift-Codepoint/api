import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const hrSchema = mongoose.Schema(
  {
    organisation: {
      type: String,
      required: true
    },
    email: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verification: {
      type: String,
      required: true,
    },
    sms: [{
      balance: {
        type: String,
      },
      sent: {
        type: Number,
      }}]
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
hrSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
hrSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Hr = mongoose.model('hr', hrSchema);

export default Hr;