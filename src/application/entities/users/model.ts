export default class Users {
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

  emailValidated: boolean;

  codeEmailCheck: string;

  password: string;

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

  isActive: boolean;

  salt: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    permalink: string,
    region: {
      name: string;
      code: string;
    },
    locations: {
      city: string;
      state: string;
    },
    zipCode: string,
    email: string,
    emailValidated: boolean,
    codeEmailCheck: string,
    password: string,
    profileVisibility: 'hidden' | 'searchable' | 'open',
    rol: string,
    geoLocation: [number],
    profile: string,
    video: string,
    thumbnail: string,
    updated: Date,
    created: Date,
    resetPasswordToken: string,
    resetPasswordExpires: Date,
    isActive: boolean,
    salt: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.permalink = permalink;
    this.region = region;
    this.locations = locations;
    this.zipCode = zipCode;
    this.email = email;
    this.emailValidated = emailValidated;
    this.codeEmailCheck = codeEmailCheck;
    this.password = password;
    this.profileVisibility = profileVisibility;
    this.rol = rol;
    this.geoLocation = geoLocation;
    this.profile = profile;
    this.video = video;
    this.thumbnail = thumbnail;
    this.updated = updated;
    this.created = created;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpires = resetPasswordExpires;
    this.isActive = isActive;
    this.salt = salt;
  }
}
