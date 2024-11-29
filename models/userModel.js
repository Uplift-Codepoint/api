import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verification: {
      type: String,
      required: true,
    },
    subscription: [{
      type: {
        type: String,
      },
      amountPaid: {
        type: Number,
      },
      method: {
        type: String,
      },
      expires: {
        type: Date,
      }
    },
    {timestamps: true,}],
    savedJobs: [{
      jobId: {
        type: String,
      },
      position: {
        type: String,
      },
      organisation: {
        type: String,
      }
    }],
    appliedJobs: [{
        jobId: {
          type: String,
        },
        position: {
          type: String,
        },
        organisation: {
          type: String,
        }
      },
      {
        timestamps: true
      }
    ],
    resumeURL: {
      type: String,
    },
    resumeInfo: [{
      profile: {
        type: String,
      },
      skills: [{
        title: {
          type: String
        },
        rating: {
          type: Number 
        }
      }],
      objective: {
        type: String,
      },
      references: [{
        referee: {
          type: String
        },
        company: {
          type: String
        },
        phone: {
          type: Number
        },
      },
      ]
    }],
    log: [
      {
        lastLoginDate: {
          type: Date,
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('users', userSchema);

export default User;