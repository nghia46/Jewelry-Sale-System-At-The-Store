export interface SignInForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInRequest {
  phone: string
  password: string
}

export interface SignInRespone {
  token: string
  expiration: string
}

export interface JWTDecode {
  Id: string
  nameid: string
  sub: string
  email: string
  jti: string
  nbf: number
  exp: number
  iat: number
  iss: string
  aud: string
}

export interface GetUserResponse{
  customerId: string
  userName: string
  fullName: string
  email: string
  phone: string
  gender: string
  address: string
  point: number
}
