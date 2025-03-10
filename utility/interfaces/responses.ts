export interface IRegisterAuthenticationErrors {
  errors: {
    email?: string[];
    fullName?: string[];
    password?: string[];
    message?: string;
  };
}

export interface ILoginAuthenticationErrors {
  errors: {
    email?: string[];
    password?: string[];
  };
}

export interface ISuccessfullAuthentication {
  userId: string;
  token: string;
}

export interface IGeneralMessageRes {
  message: string;
}

export interface ILoadUserRes {
  locationRadius: number;
  gender: "male" | "female" | "both";
  ageRange: number[];
}
