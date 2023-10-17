import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session:{
        strategy:'jwt'
    }
})

console.log('Google Client Id', process.env.GOOGLE_CLIENT_ID)

export { handler as GET, handler as POST }