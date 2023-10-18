import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../zod-schemas";
import { getServerSession } from "next-auth";
import options from "@/app/auth/options";

export  async function POST( request:NextRequest ){

 const session =  await getServerSession(options)

 if( !session ) return NextResponse.json({ error: 'Unauthorized access denied'}, { status:401})
      
    const body = await request.json();
    const validation = issueSchema.safeParse( body );

    if( !validation.success ) return NextResponse.json( validation.error.errors , {status:400 });

    const newIssue = await prisma.issue.create({
        data:{ title:body.title , description:body.description }
    })

    return NextResponse.json( newIssue , { status:201 });

}

export async function GET( request:NextRequest ){
  const issues = await prisma.issue.findMany();
  return NextResponse.json( issues )
}