import axios from "axios"
import { ISession } from "../lib/interfaces"
import api from "./base"

export async function getProfile(accessToken: string): Promise<ISession> {
  try {
    const res = await api.get("/user/profile", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })

    return res.data
  } catch (e) {
    throw e
  }
}
