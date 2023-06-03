const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    nickname: {
      type: String,
      unique: true,
      required: true,
      minLength: 2,
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    lastname: {
      type: String,
      required: true,
      minLength: 2,
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
      minLength: 2,
    },
    role: {
      type: String,
      enum: ['admin', 'guest'],
      default: 'guest',
    },
    submisions: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
    versionKey: false,
    
  }
);

UserSchema.method('toJSON', function () {
  const user = this.toObject();
  delete user.password;
  return user;
}); 

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.encrypt = async function (password) {
  const salt = await bcrypt.genSalt (10);
  this.password = await bcrypt.hash(password, salt);
 };

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', UserSchema);


UserSchema.methods.encrypt = async function (password) {
 const salt = await bcrypt.genSalt (10);
 this.password = await bcrypt.hash(password, salt);

};


