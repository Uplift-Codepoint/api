import mongoose from 'mongoose';

const jobSchema = mongoose.Schema(
  {
    organisationId: {
      type: String,
      required: true,
      ref: 'Organisation',
    },
    organisation: {
        type: String,
        required: true,
    },
    position: {
      type: String,
      required: [true, 'Please add Job Title'],
    },
    category: {
      type: String,
      required: [true, 'Please add Job category']
    },
    contract: {
      type: String,
    },
    location: {
        type: String,
        required: true,
    },
    
    requirements: {
      type: String,
      required: [true, 'Please add required job qualifications']
    },
    applications: [{
      applicantId: {
          type: String,
          required: [true, 'Applicant ID missing']
      },
      firstname: {
        type: String,
        required: [true, 'Firstname missing']
      },
      lastname: {
        type: String,
      },
      sex: {
        type: String,
      },
      phone: {
        type: Number,
      },
      email: {
        type: String
      },
      resumeUrl: {
        type: String,
      },
      state: {
        type: String,
      }
    },
    {
      timestamps: true,
    }
    ],
    views: [{
      daily: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      total: {
        type: Number,
      }
    }]
  },
  {
    timestamps: true,
  }
)

const Job = mongoose.model('jobs', jobSchema);

export default Job;