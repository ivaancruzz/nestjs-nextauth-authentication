import axios from "axios"
import { ILogin, ILoginTokenSilent } from "../lib/interfaces"
import api from "./base"

export async function loginFromGoogle(token: string): Promise<ILogin> {
  try {
    const res = await api.post("/auth/login/google", {
      token,
    })

    return res.data
  } catch (e) {
    throw e
  }
}

export async function tokenSilent(
  refreshToken: string
): Promise<ILoginTokenSilent> {
  try {
    const res = await api.post("/auth/refresh_token", {
      refreshToken,
    })

    return res.data
  } catch (e) {
    throw e
  }
}
