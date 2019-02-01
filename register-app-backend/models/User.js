import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

var userSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true
    }
});

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "ANNEKE"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

export default mongoose.model('User', userSchema);
