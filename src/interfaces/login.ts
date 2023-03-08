export interface iLogin {
  userName: string;
  passWord: string;
}

export interface iLoginResponse {
  userName: string;
  passWord: string;
  success: boolean;
  message: string;
  fullName: string;
}
