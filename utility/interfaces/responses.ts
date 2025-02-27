export interface IRegisterAuthenticationErrors {
  errors: {
    email?: string[];
    fullName?: string[];
    password?: string[];
    message?: string;
  };
}

export interface IAuthenticationMessageRes {
  message: string;
}

export interface ISuccessfullRegistration {
  userId: string;
  token: string;
}
