import options from "@/app/auth/options"
import NextAuth from "next-auth"


const handler = NextAuth(options)

console.log('Google Client Id', process.env.GOOGLE_CLIENT_ID)

export { handler as GET, handler as POST }