const { Schema, model } = require('mongoose');
const { User } = require('.');

// Schema to create a course model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\w+@\w+.\{2,3}+/, "Not valid email"]
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Course = model('user', userSchema);

module.exports = User;
