import options from "@/app/auth/options";
import { issueSchema } from "@/app/zod-schemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export  async function PATCH( request:NextRequest , { params }:{ params:{ id:string}} ){

    const session =  await getServerSession(options)

    if( !session ) return NextResponse.json({ error: 'Unauthorized access denied'}, { status:401})
      
    const body = await request.json();
    const validation = issueSchema.safeParse( body );

    if( !validation.success ) return NextResponse.json( validation.error.format() , {status:400 });


    const issue = await prisma.issue.findUnique({ where:{ id:parseInt( params.id )}})

    if( !issue ) return NextResponse.json( 'Issue Not Found' , {status:404 }); 

    const updatedIssue = await prisma.issue.update({
        where:{ id:parseInt( params.id )},
        data:{ title:body.title , description:body.description }
    })

    return NextResponse.json( updatedIssue);

}

export async function GET( request:NextRequest , { params }:{ params:{ id:string}}){
    const issue = await prisma.issue.findUnique({ where:{ id:parseInt( params.id )}})

    if( !issue ) return NextResponse.json( 'Issue Not Found' , {status:404 }); 

    return NextResponse.json( issue );
}

export async function DELETE( request:NextRequest , { params }:{ params:{ id:string}}){

    const session =  await getServerSession(options)

    if( !session ) return NextResponse.json({ error: 'Unauthorized access denied'}, { status:401})

    const issue = await prisma.issue.findUnique({ where:{ id:parseInt( params.id )}})

    if( !issue ) return NextResponse.json( 'Issue Not Found' , {status:404 }); 

    const deletedIssue = await prisma.issue.delete({
        where:{ id: parseInt( params.id)}
    })

    return NextResponse.json( deletedIssue );
}