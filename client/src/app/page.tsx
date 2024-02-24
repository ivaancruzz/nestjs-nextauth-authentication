"use client"

import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <br />
        <a href="/api/auth/signout">Sign out</a>
      </>
    )
  }

  return (
    <>
      <p>Not authenticated</p>
      <br />
      <a href="/api/auth/signin">Sign in</a>
    </>
  )
}
