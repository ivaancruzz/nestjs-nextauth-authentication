export interface ILogin {
  accessToken: string
  refreshToken: string
}

export interface ILoginTokenSilent extends ILogin {
  profile: ISession
}

export interface ISession {
  email: string
  picture: string
  exp: number
  iat: number
}
