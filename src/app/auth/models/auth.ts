
export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    expiresIn: string;
}
export interface IRegister {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    profileImage?: string;
    password: string;
    confirmPassword: string;
}
export interface IUserVerify {
    email: string;
    code: string;
}
export interface IPasswordChanged {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export interface IResetPassword {
    email: string;
    password: string;
    confirmPassword: string;
    seed: string;
}
export interface IUsers {
    pageNumber: number;
    pageSize: number;
    data: IUserDetails[]
    totalNumberOfaRecords: number;
    totalNumberOfPages: number;
  }
export interface IUserDetails {
    id: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath: string;
    creationDate: string;
    modificationDate: string;
    group: IUserRole
  }
  export interface IUserRole {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string
  }
  export interface IUserFiltration {
    userName?: string;
    email?: string;
    country?: string;
    groups: number[];
    pageSize: number;
    pageNumber: number;
    [key: string]: any;
  }

  export interface IProfileData {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    profileImage?: string;
    confirmPassword: string;
}