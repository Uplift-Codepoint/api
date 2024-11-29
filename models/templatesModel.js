import mongoose from 'mongoose';

const templatesSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      ref: 'Author'
    },
    authorImg: {
      type: String,
    },
    imgUrl: {
      type: String,
      required: 'true'
    }
},
  {
    timestamps: true,
  }
)

const Template = mongoose.model('templates', templatesSchema);

export default Template;