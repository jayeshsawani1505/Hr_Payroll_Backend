const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
  },
  mobile_number: {
    type: String,
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'user'], 
    default: 'user' 
  }
}, {
  timestamps: true
});


UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});


UserSchema.methods.comparePassword = async function(inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
