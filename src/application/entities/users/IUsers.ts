/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

export interface IUsers extends mongoose.Document {
  // eslint-disable-next-line no-unused-vars
  firstName: string;
  lastName: string;
  username: string;
  permalink: string;
  region: {
    name: string;
    code: string;
  };
  locations: {
    city: string;
    state: string;
  };
  zipCode: string;
  email: string;
  emailValidated: boolean | undefined;
  codeEmailCheck: string | undefined;
  password: string | undefined;
  profileVisibility: 'hidden' | 'searchable' | 'open';
  rol: string;
  geoLocation: [number];
  profile: string;
  video: string;
  thumbnail: string;
  updated: Date;
  created: Date;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  isActive: boolean | undefined;
  salt: string | undefined;
  hashPassword(password: string): string;
  authenticate(password: string): boolean;
}
