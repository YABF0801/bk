const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
    minLength: 2, 
    maxLength: 10 
  },
  name: {
    type: String,
    required: true,
    minLength: 2, 
    maxLength: 20
  },
  lastname: {
    type: String,
    required: true,
    minLength: 4, 
    maxLength: 50
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    minLength: 4, 
    maxLength: 50
  },
  role: {
    type: String,
    enum: ['admin', 'guest'],
    default: 'guest',
  },
},{
  timestamps: true,
  versionKey: false,
});

UserSchema.pre('save', function(next) {
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

module.exports = mongoose.model('user', UserSchema);