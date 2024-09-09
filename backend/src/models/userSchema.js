import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  'email': {
    'type': mongoose.Schema.Types.String,
    'required': true,
    'unique': true,
    'index': true,
  },

  'password': {
    'type': mongoose.Schema.Types.String,
    'required': true
  },

  'firstname': {
    'type': mongoose.Schema.Types.String,
    'required': true,
  },

  'lastname': mongoose.Schema.Types.String,
  'dob': {
    'type': mongoose.Schema.Types.String,
    'required': true,
  }
});

export const User = mongoose.model('User', userSchema);