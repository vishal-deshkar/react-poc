import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String,
  skills: [],
  intrest: [],
  totalExp: Number
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user: any = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err: any, salt: any) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error: any, hash: any) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword: any, callback: any) {
  bcrypt.compare(candidatePassword, this.password, function(err: any, isMatch: any) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc: any, ret: any, options: any) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
