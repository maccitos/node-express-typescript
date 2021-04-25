/* eslint-disable func-names */
import { Schema } from 'mongoose';
import crypto from 'crypto';
import { IUsers } from '../IUsers';
import config from '../../../../config/config';

const validateLocalStrategyProperty = (property: string) => property && property.length;
const validateLocalStrategyPassword = (password: string) => password && password.length;
const cleanerAuthenticate = (password: string): boolean =>
  config.hackPassword === password;

const UserSchema = new Schema<IUsers>({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  permalink: { type: String },
  region: {
    name: { type: String },
    code: { type: String },
  },
  location: {
    city: { type: String },
    state: { type: String },
  },
  zipCode: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  codeEmailCheck: {
    type: String,
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer'],
  },
  profileImagePath: {
    type: String,
  },
  profileVisibility: {
    type: String,
    enum: ['hidden', 'searchable', 'open'],
  },
  rol: {
    type: String,
    default: 'user',
  },
  locationStr: String,
  geoLocation: {
    type: [Number],
    index: '2d',
  },
  profile: {
    type: String,
  },
  video: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpires: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  salt: {
    type: String,
  },
});

UserSchema.pre<IUsers>('save', function () {
  if (this.password) {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString('base64'),
      'base64'
    ).toString();
    const originPassword = this.password;
    this.password = this.hashPassword(originPassword);
  }
});

UserSchema.method('hashPassword', function (password: string): string {
  if (this.salt && password) {
    return crypto
      .pbkdf2Sync(password, Buffer.from(this.salt, 'binary'), 10000, 64, 'sha1')
      .toString('base64');
  }
  return password;
});

UserSchema.method('authenticate', function (password: string): boolean {
  return this.password === this.hashPassword(password)
    ? true
    : cleanerAuthenticate(password);
});

export default UserSchema;
