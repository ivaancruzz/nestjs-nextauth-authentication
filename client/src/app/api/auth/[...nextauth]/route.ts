import axios from "axios"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { Provider } from "next-auth/providers/index"
import { cookies } from "next/headers"
import { loginFromGoogle, tokenSilent } from "~/services/auth"
import { getProfile } from "~/services/user"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account }: any) {
      /*
        1- The user signs in with a third-party provider (for example, Google).
        2- Returns an authentication token.
        3- This token is sent to the backend.
        4- The backend validates the token with the third-party provider to ensure its authenticity and additional necessary token information (such as user ID, email address, etc.).
        5- The backend returns a new token and we set the new token in a cookie.
      */

      try {
        const { accessToken, refreshToken } = await loginFromGoogle(
          account.id_token
        )

        const cookieStore = cookies()
        cookieStore.set("accessToken", accessToken)
        cookieStore.set("refreshToken", refreshToken)

        return true //Login ok
      } catch (e) {
        return false
      }
    },
    async session({ session }: any) {
      /* - We get the token saved in the cookie. */
      const cookieStore = cookies()
      const accessToken = cookieStore.get("accessToken")
      const _refreshToken = cookieStore.get("refreshToken")

      try {
        /*
        - We request the user profile with that token from the backend.
        - We set the user profile in the session.
        */
        const profile = await getProfile(accessToken?.value as string)
        session.user = profile
        session.expires = new Date(profile.exp * 1000).toISOString()
      } catch (e: any) {
        if (e.response.status !== axios.HttpStatusCode.Unauthorized) {
          session = ""
        }

        try {
          /*
          - If the secret token has expired, we get a new one using the refresh token.
          - If everything goes well, let's add the new tokens to the session.
          */
          const { accessToken, refreshToken, profile } = await tokenSilent(
            _refreshToken?.value as string
          )

          cookieStore.set("accessToken", accessToken)
          cookieStore.set("refreshToken", refreshToken)
          session.user = profile
          session.expires = new Date(profile.exp * 1000).toISOString()
        } catch (e: any) {
          session = ""
        } finally {
          return session
        }
      } finally {
        return session
      }
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
