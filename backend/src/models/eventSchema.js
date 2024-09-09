import  mongoose  from "mongoose";

const eventSchema = new mongoose.Schema({
  "userId": {
    "type": mongoose.Schema.Types.ObjectId,
    "required": true
  },

  "title" : {
    "type": mongoose.Schema.Types.String,
    "required": true,
    "unique": true
  },

  "description": {
    "type": mongoose.Schema.Types.String,
    "required": false
  },

  "createdAt": {
    "type": mongoose.Schema.Types.Date,
    "required": true
  },

  "expireAt": {
    "type": mongoose.Schema.Types.Date,
    "required": true
  },

  "status": {
    "type": mongoose.Schema.Types.Boolean,
    "required": false
  },

  "priority": {
    "type": mongoose.Schema.Types.String,
    "required": true
  }
})

export const Event = mongoose.model('Event', eventSchema);